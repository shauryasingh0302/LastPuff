import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LPColors } from '../../constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Performance Highlights */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.performanceContainer}>
          <Text style={styles.performanceTitle}>Performance Summary</Text>

          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>🚭</Text>
            <Text style={styles.highlightText}>You avoided 4 cigarettes</Text>
          </View>

          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>💰</Text>
            <Text style={styles.highlightText}>You saved ₹120 today</Text>
          </View>

          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>💖</Text>
            <Text style={styles.highlightText}>Your cancer risk dropped by 0.6%</Text>
          </View>

          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>🔥</Text>
            <Text style={styles.highlightText}>You handled 3 cravings successfully</Text>
          </View>

          <LinearGradient
            colors={[LPColors.primary, '#004d2c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.highlightGradientCard}
          >
            <Text style={styles.highlightIcon}>🏆</Text>
            <Text style={[styles.highlightText, { color: '#000', fontWeight: 'bold' }]}>Streak: 14 days (2 days to next badge)</Text>
          </LinearGradient>
        </Animated.View>

        {/* Weekly Progress */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.weeklySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Progress</Text>
            <Ionicons name="bar-chart-outline" size={20} color={LPColors.primary} />
          </View>
          <View style={styles.chartContainer}>
            {[{ label: 'Mon', height: 55 }, { label: 'Tue', height: 70 }, { label: 'Wed', height: 45 }, { label: 'Thu', height: 85 }, { label: 'Fri', height: 90 }, { label: 'Sat', height: 60 }, { label: 'Sun', height: 75 }].map((item, index) => (
              <View key={index} style={styles.chartItem}>
                <View style={[styles.chartBarContainer, { height: 100 }]}>
                  <LinearGradient
                    colors={[LPColors.primary, 'rgba(57, 255, 20, 0.3)']}
                    style={[styles.chartBar, { height: item.height }]}
                  />
                </View>
                <Text style={styles.chartLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Monthly Insights */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Insights</Text>
            <Ionicons name="calendar-outline" size={20} color={LPColors.primary} />
          </View>
          <View style={styles.insightsGrid}>
            <LinearGradient colors={[LPColors.surfaceLight, LPColors.surface]} style={styles.insightCard}>
              <Text style={styles.insightLabel}>Cigarettes Avoided</Text>
              <Text style={styles.insightValue}>56</Text>
            </LinearGradient>
            <LinearGradient colors={[LPColors.surfaceLight, LPColors.surface]} style={styles.insightCard}>
              <Text style={styles.insightLabel}>Cravings Handled</Text>
              <Text style={styles.insightValue}>22</Text>
            </LinearGradient>
            <LinearGradient colors={[LPColors.surfaceLight, LPColors.surface]} style={styles.insightCard}>
              <Text style={styles.insightLabel}>Success %</Text>
              <Text style={styles.insightValue}>78%</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Finance Section */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.financeSection}>
          <LinearGradient
            colors={['rgba(57, 255, 20, 0.1)', 'transparent']}
            style={styles.financeGradient}
          >
            <View style={styles.financeHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="wallet" size={24} color={LPColors.primary} />
              </View>
              <View style={styles.financeText}>
                <Text style={styles.financeLabel}>Finance</Text>
                <Text style={styles.financeValue}>₹6,846 Saved This Month</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Health Improvements */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Health Improvements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.healthGrid}>
            <View style={styles.healthCard}>
              <Ionicons name="fitness-outline" size={24} color={LPColors.primary} />
              <Text style={styles.healthLabel}>Lung Capacity</Text>
              <Text style={styles.healthValue}>+12%</Text>
            </View>
            <View style={styles.healthCard}>
              <Ionicons name="heart-outline" size={24} color={LPColors.primary} />
              <Text style={styles.healthLabel}>Cancer Risk</Text>
              <Text style={styles.healthValue}>-4%</Text>
            </View>
            <View style={styles.healthCard}>
              <Ionicons name="pulse-outline" size={24} color={LPColors.primary} />
              <Text style={styles.healthLabel}>Heart Rate</Text>
              <Text style={styles.healthValue}>Normal</Text>
            </View>
          </ScrollView>
        </Animated.View>

        {/* Rewards Earned */}
        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards Earned</Text>
          <View style={styles.rewardsGrid}>
            <View style={styles.rewardCard}>
              <Ionicons name="medal-outline" size={32} color="#FFD700" />
              <Text style={[styles.rewardLabel, { color: '#FFD700' }]}>Badge</Text>
              <Text style={styles.rewardSubLabel}>7-day streak</Text>
            </View>
            <View style={styles.rewardCard}>
              <Ionicons name="trophy-outline" size={32} color="#C0C0C0" />
              <Text style={[styles.rewardLabel, { color: '#C0C0C0' }]}>Team</Text>
              <Text style={styles.rewardSubLabel}>Top 5%</Text>
            </View>
            <View style={styles.rewardCard}>
              <Ionicons name="ribbon-outline" size={32} color="#CD7F32" />
              <Text style={[styles.rewardLabel, { color: '#CD7F32' }]}>Solo</Text>
              <Text style={styles.rewardSubLabel}>10 wins</Text>
            </View>
          </View>
        </Animated.View>

        {/* Achievement Timeline */}
        <Animated.View entering={FadeInDown.delay(700).duration(500)} style={[styles.section, { marginBottom: 100 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievement Timeline</Text>
            <Ionicons name="time-outline" size={20} color={LPColors.primary} />
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineConnect} />
            <View style={styles.timelineIcon}>
              <Ionicons name="checkmark" size={14} color="#000" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Day 15</Text>
              <Text style={styles.timelineText}>Completed 2 cravings this week</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineConnect} />
            <View style={styles.timelineIcon}>
              <Ionicons name="star" size={14} color="#000" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Day 7</Text>
              <Text style={styles.timelineText}>Earned bronze streak badge</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { backgroundColor: LPColors.surfaceLight }]}>
              <Ionicons name="sparkles" size={14} color={LPColors.textGray} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineTitle, { color: LPColors.textGray }]}>Tonight</Text>
              <Text style={styles.timelineText}>Evening watch call starting in 18h!</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LPColors.text,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  performanceContainer: {
    marginBottom: 24,
  },
  performanceTitle: {
    fontSize: 16,
    color: LPColors.primary,
    marginBottom: 16,
    fontWeight: '600',
  },
  weeklySection: {
    backgroundColor: LPColors.surfaceLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LPColors.text,
    marginBottom: 16,
  },
  highlightCard: {
    backgroundColor: LPColors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightGradientCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    color: LPColors.text,
    flex: 1,
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  chartBar: {
    width: '100%',
    borderRadius: 10,
  },
  chartLabel: {
    fontSize: 10,
    color: LPColors.textGray,
    marginTop: 8,
  },
  insightsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  insightLabel: {
    fontSize: 11,
    color: LPColors.textGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LPColors.text,
  },
  financeSection: {
    backgroundColor: LPColors.surfaceLight,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  financeGradient: {
    padding: 20,
  },
  financeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  financeText: {
    marginLeft: 16,
    flex: 1,
  },
  financeLabel: {
    fontSize: 12,
    color: LPColors.textGray,
    marginBottom: 4,
  },
  financeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LPColors.text,
  },
  healthGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  healthCard: {
    width: 110,
    backgroundColor: LPColors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  healthLabel: {
    fontSize: 11,
    color: LPColors.textGray,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LPColors.primary,
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: LPColors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  rewardLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  rewardSubLabel: {
    fontSize: 10,
    color: LPColors.textGray,
    marginTop: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineConnect: {
    position: 'absolute',
    left: 15,
    top: 32,
    bottom: -24,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: LPColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    justifyContent: 'center',
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: LPColors.text,
    marginBottom: 2,
  },
  timelineText: {
    fontSize: 13,
    color: LPColors.textGray,
  },
});