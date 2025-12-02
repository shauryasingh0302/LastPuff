import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import Shine from '../../components/Shine';
import { AuthContext } from '../../context/AuthContext';
import { fetchDashboardSummary } from '../../services/api';
import { router } from "expo-router";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const auth: any = useContext(AuthContext);
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

  const cigsToday = dashboard?.today?.cigarettesAvoided ?? 0;
  const moneyToday = dashboard?.today?.moneySaved ?? 0;
  const goalsToday = dashboard?.today?.goalsCompleted ?? 0;
  const streak = dashboard?.streak ?? 0;
  const puffCoins = dashboard?.puffCoins ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hi, {userName}</Text>
        <View style={styles.headerIcons}>
          <View style={styles.coinsBadge}>
            <Ionicons name="logo-bitcoin" size={16} color="#000000" />
            <Text style={styles.coinsText}>{puffCoins}</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#fff" style={styles.headerIcon} />
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Top Stats Cards */}
        <View style={styles.topStatsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Cigarettes Avoided Today</Text>
            <Text style={styles.statsValue}>
              {loadingDashboard ? "--" : cigsToday.toString().padStart(2, "0")}
            </Text>
            <Text style={styles.statsSubLabel}>Daily limit: 0/10 cigarettes</Text>

            {/* Money Saved - Small rounded tab inside */}
            <View style={styles.moneySavedTab}>
              <Text style={styles.moneySavedTabLabel}>Money Saved Today</Text>
              <Text style={styles.moneySavedTabValue}>
                {loadingDashboard ? "₹--" : `₹${moneyToday}`}
              </Text>
            </View>
          </View>
        </View>

        {/* Streak and Health Impact Combined Card */}
        <View style={styles.streakHealthCard}>
          {/* Streak Section */}
          <View style={styles.streakSection}>
            <View style={styles.streakLeft}>
              <View style={styles.streakCircle}>
                <Svg width="70" height="70" style={styles.streakSvg}>
                  {/* Background Circle */}
                  <Circle
                    cx="35"
                    cy="35"
                    r="30"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* Progress Circle - static visual for now */}
                  <Circle
                    cx="35"
                    cy="35"
                    r="30"
                    stroke="#fff"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${(12 / 30) * 188.4} 188.4`}
                    strokeDashoffset="47.1"
                    strokeLinecap="round"
                  />
                </Svg>
                <Text style={styles.streakNumber}>
                  {loadingDashboard ? "--" : streak}
                </Text>
              </View>
            </View>
            <View style={styles.streakRight}>
              <View>
                <Text style={styles.streakLabel}>Streak days</Text>
                <Text style={styles.streakTitle}>Keep going!</Text>
              </View>
              <Link href="/stats" asChild>
                <TouchableOpacity>
                  <Text style={styles.viewMore}>view more</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Health Impact Section (still static for now) */}
          <View style={styles.healthImpactSection}>
            <View style={styles.healthMainCard}>
              <View style={styles.healthIconContainer}>
                <Ionicons name="heart" size={24} color="#fff" />
              </View>
              <Text style={styles.healthMainLabel}>Your Health</Text>
              <Text style={styles.healthMainLabel}>Impact Today</Text>
            </View>

            <View style={styles.healthStatCard}>
              <Text style={styles.healthStatLabel}>LC</Text>
              <Text style={styles.healthStatLabel}>risk</Text>
              <Text style={styles.healthStatValue}>-3%</Text>
            </View>

            <View style={styles.healthStatCard}>
              <Text style={styles.healthStatLabel}>Cancer</Text>
              <Text style={styles.healthStatLabel}>risk</Text>
              <Text style={styles.healthStatValue}>-2%</Text>
            </View>
          </View>
        </View>

        {/* Goals */}
        <View style={styles.goalsCard}>
          <Link href="/goals" asChild>
            <TouchableOpacity style={styles.goalsHeader}>
              <Text style={styles.goalsTitle}>Goals</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
          </Link>

          <View style={styles.goalsSectionHeader}>
            <Text style={styles.sectionTitle}>Goals</Text>
            <TouchableOpacity style={styles.addGoalButton}>
              <Text style={styles.addGoalText}>Add Goal</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.goalsProgressText}>
            {loadingDashboard
              ? "Loading today's goals..."
              : `Completed ${goalsToday} / 5 today`}
          </Text>

          <View style={styles.goalsList}>
            <TouchableOpacity style={styles.goalItem}>
              <View style={styles.goalLeft}>
                <View style={styles.goalCheckbox} />
                <Text style={styles.goalText}>Avoid 10 cigarettes</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.goalItem}>
              <View style={styles.goalLeft}>
                <View style={styles.goalCheckbox} />
                <Text style={styles.goalText}>Save ₹200 today</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.goalItem}>
              <View style={styles.goalLeft}>
                <View style={styles.goalCheckbox} />
                <Text style={styles.goalText}>Play 1 focus game</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.goalItem}>
              <View style={styles.goalLeft}>
                <View style={styles.goalCheckbox} />
                <Text style={styles.goalText}>Walk 10 minutes</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Games */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionTitle}>Quick Games</Text>
          <View style={styles.gamesGrid}>
            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="grid" size={24} color="#39FF14" />
              <Text style={styles.gameLabel}>2048</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="infinite" size={24} color="#39FF14" />
              <Text style={styles.gameLabel}>Subway Mind</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="eye" size={24} color="#39FF14" />
              <Text style={styles.gameLabel}>AI Focus</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="cube" size={24} color="#39FF14" />
              <Text style={styles.gameLabel}>Blocks</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* SOS Button */}
<View style={{ marginBottom: 24, marginTop: 10 }}>
  <TouchableOpacity
    style={{
      backgroundColor: '#39FF14',
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={() => router.push('/sos')}
  >
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>
      SOS Support
    </Text>
  </TouchableOpacity>
</View>


        {/* National Impact (still static for now) */}
        <View style={styles.nationalSection}>
          <Text style={styles.sectionTitle}>National Impact</Text>
          <View style={styles.nationalCardsContainer}>
            <Shine style={styles.nationalCard}>
              <Text style={styles.nationalLabel}>India avoided</Text>
              <Text style={styles.nationalValue}>1.2M</Text>
              <Text style={styles.nationalUnit}>cigarettes</Text>
            </Shine>
            <Shine style={styles.nationalCard}>
              <Text style={styles.nationalLabel}>CO₂ reduced</Text>
              <Text style={styles.nationalValue}>3.6K</Text>
              <Text style={styles.nationalUnit}>kg</Text>
            </Shine>
            <Shine style={styles.nationalCard}>
              <Text style={styles.nationalLabel}>Collective savings</Text>
              <Text style={styles.nationalValue}>₹42.5M</Text>
            </Shine>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#000000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 15,
  },
  coinsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#39FF14',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  coinsText: {
    color: '#000000',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topStatsContainer: {
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderLeftColor: '#39FF14',
    borderTopColor: '#39FF14',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    position: 'relative',
  },
  statsLabel: {
    fontSize: 12,
    color: '#39FF14',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#39FF14',
    marginBottom: 4,
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  statsSubLabel: {
    fontSize: 12,
    color: '#888',
  },
  moneySavedTab: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#39FF14',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 100,
  },
  moneySavedTabLabel: {
    fontSize: 10,
    color: '#000000',
    marginBottom: 2,
    textAlign: 'center',
  },
  moneySavedTabValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  streakHealthCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  streakSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  streakLeft: {
    marginRight: 16,
  },
  streakCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  streakSvg: {
    position: 'absolute',
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#39FF14',
  },
  streakRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakLabel: {
    fontSize: 14,
    color: '#39FF14',
    marginBottom: 4,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewMore: {
    fontSize: 14,
    color: '#39FF14',
  },
  healthImpactSection: {
    flexDirection: 'row',
    gap: 12,
  },
  healthMainCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  healthIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 8,
    marginBottom: 8,
  },
  healthMainLabel: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  healthStatCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  healthStatLabel: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  healthStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  goalsCard: {
    backgroundColor: '#121212',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 20,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  goalsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  goalsProgressText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  addGoalButton: {
    backgroundColor: '#39FF14',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addGoalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  goalsList: {
    gap: 0,
  },
  goalItem: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#39FF14',
    marginRight: 16,
  },
  goalText: {
    fontSize: 16,
    color: '#fff',
  },
  gamesSection: {
    marginBottom: 24,
  },
  gamesGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  gameCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  gameLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  nationalSection: {
    marginBottom: 80,
  },
  nationalCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  nationalCard: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  nationalLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  nationalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  nationalUnit: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#39FF14',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
