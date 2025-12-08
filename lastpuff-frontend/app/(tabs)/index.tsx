import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchDashboardSummary();
        setDashboard(res.data);
      } catch (err) {
        console.log("Failed to load dashboard summary", err);
      } finally {
        setLoadingDashboard(false);
      }
    };
    load();
  }, []);

  const { goals, toggleGoalCompletion } = useGoals();
  const handleGoalPress = (goalId: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || goal.completed) return;

    LPHaptics.success();
    toggleGoalCompletion(goalId);
  };

  const cigsToday = 0;
  const moneyToday = 0;
  const goalsToday = 0;
  const streak = 0;
  const puffCoins = 0;

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

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
                <Text style={styles.healthVal}>0%</Text>
                <Text style={styles.healthLabel}>LC Risk</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.healthItem}>
                <Text style={styles.healthVal}>0%</Text>
                <Text style={styles.healthLabel}>Cancer</Text>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: { fontSize: 14, color: LPColors.textGray },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: LPColors.text },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  coinsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  coinsText: { color: '#FFD700', fontWeight: 'bold', marginLeft: 6, fontSize: 14 },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  topStatsContainer: { marginBottom: 20 },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 4 },
  statsValue: { fontSize: 36, fontWeight: 'bold', color: '#FFF' },
  statsSubLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  moneyContainer: { alignItems: 'flex-end', justifyContent: 'center' },
  moneyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moneyLabel: { color: 'rgba(0,0,0,0.5)', fontSize: 10, display: 'none' },
  moneyValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 4 },

  gridContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  gridCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
  },
  streakContent: { flexDirection: 'row', alignItems: 'center' },
  streakCircleContainer: { alignItems: 'center', justifyContent: 'center' },
  streakNum: { position: 'absolute', fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  gridTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  gridSub: { color: LPColors.textGray, fontSize: 12 },
  healthStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  healthItem: { alignItems: 'center', flex: 1 },
  healthVal: { color: LPColors.primary, fontSize: 18, fontWeight: 'bold' },
  healthLabel: { color: LPColors.textGray, fontSize: 10, marginTop: 2 },
  divider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.1)' },

  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sosText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  sectionContainer: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  sectionLink: { fontSize: 12, color: LPColors.primary },

  goalsContainer: { backgroundColor: '#1C1C1E', borderRadius: 16, padding: 4 },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  goalCompleted: { opacity: 0.5 },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: LPColors.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: { backgroundColor: LPColors.primary },
  goalText: { color: '#FFF', fontSize: 15, flex: 1 },
  goalTextCompleted: { textDecorationLine: 'line-through', color: LPColors.textGray },

  gamesRow: { gap: 12 },
  gameCard: {
    width: 100,
    height: 100,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gameIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameName: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  impactCard: { backgroundColor: '#1C1C1E', borderRadius: 16, padding: 20 },
  impactRow: { flexDirection: 'row', justifyContent: 'space-between' },
  impactLabel: { fontSize: 12, color: LPColors.textGray },
  impactValue: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginTop: 4 },
});
