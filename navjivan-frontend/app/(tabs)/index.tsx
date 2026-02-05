import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import Shine from '../../components/Shine';
import { LPColors } from '../../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { useGoals } from '../../context/GoalsContext';
import { fetchDashboardSummary } from '../../services/api';
import { LPHaptics } from '../../services/haptics';

const { width } = Dimensions.get('window');

const AnimatedBtn = ({ children, onPress, style, disabled }: any) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    LPHaptics.light();
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} disabled={disabled}>
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function HomeScreen() {
  const auth: any = useContext(AuthContext);
  const router = useRouter();
  const userName = auth?.user?.name || 'Player';

  const [dashboard, setDashboard] = useState<any>(null);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async () => {
    try {
      const res = await fetchDashboardSummary();
      setDashboard(res.data);
    } catch (err) {
      console.log("Failed to load dashboard summary", err);
    } finally {
      setLoadingDashboard(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    LPHaptics.light();
    loadDashboard();
  }, []);

  const { goals, toggleGoalCompletion, streak } = useGoals();
  const handleGoalPress = (goalId: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || goal.completed) return;

    LPHaptics.success();
    toggleGoalCompletion(goalId);
  };

  const cigsToday = 0;
  const moneyToday = 0;
  const goalsToday = 0;
  const puffCoins = 0;

  return (
    <LinearGradient
      colors={[LPColors.bg, '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
    <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
      <StatusBar style="light" />

      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.headerTitle}>{userName}</Text>
        </View>
        <View style={styles.headerIcons}>
          <View style={styles.coinsBadge}>
            <Ionicons name="logo-bitcoin" size={16} color="#FFD700" />
            <Text style={styles.coinsText}>{puffCoins}</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={LPColors.primary}
            colors={[LPColors.primary]}
          />
        }
      >

        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.topStatsContainer}>
          <LinearGradient
            colors={[LPColors.primary, '#004d2c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsCard}
          >
            <View>
              <Text style={styles.statsLabel}>Cigarettes Avoided</Text>
              <Text style={styles.statsValue}>
                {loadingDashboard ? "--" : cigsToday.toString().padStart(2, "0")}
              </Text>
              <Text style={styles.statsSubLabel}>Target: 0 cigarettes today</Text>
            </View>

            <View style={styles.moneyContainer}>
              <View style={styles.moneyIcon}>
                <Ionicons name="wallet" size={20} color={LPColors.primary} />
              </View>
              <View>
                <Text style={styles.moneyLabel}>Saved</Text>
                <Text style={styles.moneyValue}>
                  {loadingDashboard ? "₹--" : `₹${moneyToday}`}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.gridContainer}>
          <View style={[styles.gridCard, { flex: 1.2 }]}>
            <View style={styles.streakContent}>
              <View style={styles.streakCircleContainer}>
                <Svg width="60" height="60">
                  <Circle cx="30" cy="30" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                  <Circle cx="30" cy="30" r="26" stroke={LPColors.primary} strokeWidth="4" fill="none" strokeDasharray={`${(streak / 30) * 163} 163`} strokeLinecap="round" />
                </Svg>
                <Text style={styles.streakNum}>{loadingDashboard ? "-" : streak}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.gridTitle}>Day Streak</Text>
                <Text style={styles.gridSub}>Keep it up!</Text>
              </View>
            </View>
          </View>

          <View style={[styles.gridCard, { flex: 1 }]}>
            <View style={styles.healthStats}>
              <View style={styles.healthItem}>
                <Text style={styles.healthVal}>
                  {dashboard?.healthRisks?.lungRisk !== undefined ? `${dashboard.healthRisks.lungRisk}%` : 'N/A'}
                </Text>
                <Text style={styles.healthLabel}>Lung Risk</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.healthItem}>
                <Text style={styles.healthVal}>
                  {dashboard?.healthRisks?.strokeRisk !== undefined ? `${dashboard.healthRisks.strokeRisk}%` : 'N/A'}
                </Text>
                <Text style={styles.healthLabel}>Stroke Risk</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={{ marginBottom: 24 }}>
          <AnimatedBtn onPress={() => router.push('/sos')}>
            <LinearGradient
              colors={['#FF3B30', '#FF9500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.sosButton}
            >
              <Ionicons name="alert-circle" size={24} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.sosText}>SOS Support</Text>
            </LinearGradient>
          </AnimatedBtn>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.sectionContainer}>
          <Link href="/goals" asChild>
            <TouchableOpacity style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Goals</Text>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.goalsContainer}>
            {goals.map((goal) => (
              <AnimatedBtn
                key={goal.id}
                onPress={() => handleGoalPress(goal.id)}
                disabled={goal.completed}
                style={[styles.goalRow, goal.completed && styles.goalCompleted]}
              >
                <View style={[styles.checkBox, goal.completed && styles.checkBoxChecked]}>
                  {goal.completed && <Ionicons name="checkmark" size={12} color="#000" />}
                </View>
                <Text style={[styles.goalText, goal.completed && styles.goalTextCompleted]}>{goal.text}</Text>
              </AnimatedBtn>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(550).duration(500)} style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => router.push('/sports-training' as any)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="trophy" size={20} color={LPColors.primary} />
              <Text style={styles.sectionTitle}>Sports Training</Text>
            </View>
            <Text style={styles.sectionLink}>Explore</Text>
          </TouchableOpacity>

          <AnimatedBtn onPress={() => router.push('/sports-training' as any)} style={styles.sportsCard}>
            <LinearGradient
              colors={['rgba(57, 255, 20, 0.1)', 'rgba(57, 255, 20, 0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sportsGradient}
            >
              <View style={styles.sportsIcon}>
                <Ionicons name="barbell" size={32} color={LPColors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sportsTitle}>Get AI Training Plans</Text>
                <Text style={styles.sportsSubtitle}>
                  Personalized programs for any sport
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={LPColors.primary} />
            </LinearGradient>
          </AnimatedBtn>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Games</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gamesRow}>
            <AnimatedBtn onPress={() => router.push('/games/breathing')} style={styles.gameCard}>
              <View style={[styles.gameIcon, { backgroundColor: 'rgba(57, 255, 20, 0.1)' }]}>
                <Ionicons name="fitness" size={24} color={LPColors.primary} />
              </View>
              <Text style={styles.gameName}>Breathing</Text>
            </AnimatedBtn>

            <AnimatedBtn onPress={() => router.push('/games/2048')} style={styles.gameCard}>
              <View style={[styles.gameIcon, { backgroundColor: 'rgba(57, 255, 20, 0.1)' }]}>
                <Ionicons name="grid" size={24} color={LPColors.primary} />
              </View>
              <Text style={styles.gameName}>2048</Text>
            </AnimatedBtn>

            <AnimatedBtn onPress={() => router.push('/games/maths-quiz')} style={styles.gameCard}>
              <View style={[styles.gameIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                <Ionicons name="calculator" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.gameName}>Maths</Text>
            </AnimatedBtn>

            <AnimatedBtn onPress={() => router.push('/games/memory-game')} style={styles.gameCard}>
              <View style={[styles.gameIcon, { backgroundColor: 'rgba(236, 72, 153, 0.1)' }]}>
                <Ionicons name="albums" size={24} color="#EC4899" />
              </View>
              <Text style={styles.gameName}>Memory</Text>
            </AnimatedBtn>
          </ScrollView>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(500)} style={[styles.sectionContainer, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Community Impact</Text>
          <Shine style={styles.impactCard}>
            <View style={styles.impactRow}>
              <View>
                <Text style={styles.impactLabel}>Cigarettes Avoided</Text>
                <Text style={styles.impactValue}>0</Text>
              </View>
              <View>
                <Text style={styles.impactLabel}>Money Saved</Text>
                <Text style={styles.impactValue}>₹0</Text>
              </View>
            </View>
          </Shine>
        </Animated.View>


      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LPColors.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
   color: LPColors.textGray,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LPColors.text,
    marginTop: 4,
  },
  coinBadge: {
    backgroundColor: LPColors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  coinText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statsCard: {
    backgroundColor: LPColors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: LPColors.textGray,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LPColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: LPColors.textGray,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    backgroundColor: LPColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: LPColors.text,
    marginBottom: 2,
  },
  gridSub: {
    fontSize: 12,
    color: LPColors.textGray,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakCircleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNum: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: LPColors.primary,
  },
  healthStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  healthItem: {
    alignItems: 'center',
    flex: 1,
  },
  healthVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LPColors.text,
    marginBottom: 4,
  },
  healthLabel: {
    fontSize: 11,
    color: LPColors.textGray,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: LPColors.border,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
  },
  sosText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LPColors.text,
  },
  seeAll: {
    fontSize: 14,
    color: LPColors.primary,
    fontWeight: '600',
  },
  actionCardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: LPColors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: LPColors.text,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 11,
    color: LPColors.textGray,
    marginTop: 4,
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: LPColors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactLabel: {
    fontSize: 12,
    color: LPColors.textGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LPColors.primary,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  coinsBadge: {
    backgroundColor: LPColors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  coinsText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  topStatsContainer: {
    marginBottom: 20,
  },
  statsLabel: {
    fontSize: 12,
    color: LPColors.textGray,
    fontWeight: '500',
  },
  statsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LPColors.primary,
    marginBottom: 4,
  },
  statsSubLabel: {
    fontSize: 10,
    color: LPColors.textGray,
    marginTop: 2,
  },
  moneyContainer: {
    alignItems: 'center',
  },
  moneyIcon: {
    marginBottom: 8,
  },
  moneyLabel: {
    fontSize: 12,
    color: LPColors.textGray,
    fontWeight: '500',
  },
  moneyValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionLink: {
    color: LPColors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  goalsContainer: {
    gap: 12,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LPColors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  goalCompleted: {
    opacity: 0.6,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: LPColors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: {
    backgroundColor: LPColors.primary,
    borderColor: LPColors.primary,
  },
  goalText: {
    flex: 1,
    fontSize: 15,
    color: LPColors.text,
    fontWeight: '500',
  },
  goalTextCompleted: {
    textDecorationLine: 'line-through',
    color: LPColors.textGray,
  },
  sportsCard: {
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
  },
  sportsGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportsIcon: {
    marginRight: 16,
  },
  sportsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  sportsSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  gamesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gameCard: {
    width: '48%',
    backgroundColor: LPColors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  gameIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: LPColors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gameName: {
    fontSize: 13,
    fontWeight: '600',
    color: LPColors.text,
    textAlign: 'center',
  },
});
