import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={24} color="#fff" style={styles.headerIcon} />
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Performance Highlights */}
        <View style={styles.performanceContainer}>
          <Text style={styles.performanceTitle}>Mahima, here's your performance today.</Text>
          
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
          
          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>🏆</Text>
            <Text style={styles.highlightText}>Streak: 14 days (2 days to next badge)</Text>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.weeklySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Progress</Text>
            <Ionicons name="bar-chart-outline" size={20} color="#BFEFE0" />
          </View>
          <View style={styles.chartContainer}>
            {[{label: 'Mon', height: 55}, {label: 'Tue', height: 70}, {label: 'Wed', height: 45}, {label: 'Thu', height: 85}, {label: 'Fri', height: 90}, {label: 'Sat', height: 60}, {label: 'Sun', height: 75}].map((item, index) => (
              <View key={index} style={styles.chartItem}>
                <View style={styles.chartBarContainer}>
                  <View style={[styles.chartBar, { height: item.height }]} />
                </View>
                <Text style={styles.chartLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Insights</Text>
            <Ionicons name="calendar-outline" size={20} color="#0E6B8A" />
          </View>
          <View style={styles.insightsGrid}>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Cigarettes Avoided</Text>
              <Text style={styles.insightValue}>56</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Cravings Handled</Text>
              <Text style={styles.insightValue}>22</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Success %</Text>
              <Text style={styles.insightValue}>78%</Text>
            </View>
          </View>
        </View>

        {/* Finance Section */}
        <View style={styles.financeSection}>
          <View style={styles.financeHeader}>
            <Ionicons name="wallet-outline" size={24} color="#0E6B8A" />
            <View style={styles.financeText}>
              <Text style={styles.financeLabel}>Finance</Text>
              <Text style={styles.financeValue}>₹6,846 Saved This Month</Text>
            </View>
          </View>
        </View>

        {/* Health Improvements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Improvements</Text>
          <View style={styles.healthGrid}>
            <View style={styles.healthCard}>
              <Ionicons name="fitness-outline" size={24} color="#0E6B8A" />
              <Text style={styles.healthLabel}>Lung Capacity</Text>
              <Text style={styles.healthValue}>+12%</Text>
            </View>
            <View style={styles.healthCard}>
              <Ionicons name="heart-outline" size={24} color="#0E6B8A" />
              <Text style={styles.healthLabel}>Cancer Risk</Text>
              <Text style={styles.healthValue}>-4%</Text>
            </View>
            <View style={styles.healthCard}>
              <Ionicons name="pulse-outline" size={24} color="#0E6B8A" />
              <Text style={styles.healthLabel}>Heart Rate</Text>
              <Text style={styles.healthValue}>Normal</Text>
            </View>
          </View>
        </View>

        {/* Rewards Earned */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards Earned</Text>
          <View style={styles.rewardsGrid}>
            <View style={styles.rewardCard}>
              <Ionicons name="medal-outline" size={32} color="#0E6B8A" />
              <Text style={styles.rewardLabel}>Badge</Text>
              <Text style={styles.rewardSubLabel}>7-day streak</Text>
            </View>
            <View style={styles.rewardCard}>
              <Ionicons name="trophy-outline" size={32} color="#0E6B8A" />
              <Text style={styles.rewardLabel}>Team</Text>
              <Text style={styles.rewardSubLabel}>Top 5%</Text>
            </View>
            <View style={styles.rewardCard}>
              <Ionicons name="ribbon-outline" size={32} color="#0E6B8A" />
              <Text style={styles.rewardLabel}>Solo</Text>
              <Text style={styles.rewardSubLabel}>10 wins</Text>
            </View>
          </View>
        </View>

        {/* Achievement Timeline */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievement Timeline</Text>
            <Ionicons name="trophy-outline" size={20} color="#0E6B8A" />
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Day 15</Text>
              <Text style={styles.timelineText}>Completed 2 cravings this week</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Ionicons name="star" size={16} color="#fff" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Day 7</Text>
              <Text style={styles.timelineText}>Earned bronze streak badge</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconDisabled}>
              <Ionicons name="sparkles" size={16} color="#666" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitleDisabled}>Tonight</Text>
              <Text style={styles.timelineTextDisabled}>Evening watch call starting in 18h! Get ready to share wins!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10283B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#10283B',
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  performanceContainer: {
    backgroundColor: '#0E6B8A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  performanceTitle: {
    fontSize: 16,
    color: '#B8E6E3',
    marginBottom: 16,
    fontWeight: '500',
  },
  weeklySection: {
    backgroundColor: '#1A2B34',
    borderRadius: 16,
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
    color: '#fff',
    marginBottom: 16,
  },
  highlightCard: {
    backgroundColor: '#07121A',
    borderRadius: 12,
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
    color: '#fff',
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  badge: {
    backgroundColor: '#0E6B8A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
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
    height: 100,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  chartBar: {
    width: 12,
    backgroundColor: '#BFEFE0',
    borderRadius: 20,
  },
  chartLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  insightsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  insightLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  insightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  financeSection: {
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  financeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  financeText: {
    marginLeft: 12,
    flex: 1,
  },
  financeLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  financeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  healthGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  healthCard: {
    flex: 1,
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E6B8A',
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  rewardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  rewardSubLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0E6B8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineIconDisabled: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A2B34',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  timelineTitleDisabled: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 14,
    color: '#888',
  },
  timelineTextDisabled: {
    fontSize: 14,
    color: '#666',
  },
});