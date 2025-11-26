import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LastPuff</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#fff" style={styles.headerIcon} />
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Top Stats Cards */}
        <View style={styles.topStatsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Cigarettes Avoided Today</Text>
            <Text style={styles.statsValue}>07</Text>
            <Text style={styles.statsSubLabel}>Daily limit: 0/10 cigarettes</Text>
            
            {/* Money Saved - Small rounded tab inside */}
            <View style={styles.moneySavedTab}>
              <Text style={styles.moneySavedTabLabel}>Money Saved Today</Text>
              <Text style={styles.moneySavedTabValue}>₹198</Text>
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
                  {/* Progress Circle */}
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
                <Text style={styles.streakNumber}>12</Text>
              </View>
            </View>
            <View style={styles.streakRight}>
              <Text style={styles.streakLabel}>Streak days</Text>
              <Text style={styles.streakTitle}>Keep going!</Text>
            </View>
          </View>

          {/* Health Impact Section */}
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

        {/* Today's Goals */}
        <View style={styles.goalsSection}>
          <View style={styles.goalsSectionHeader}>
            <Text style={styles.sectionTitle}>Today's Goals</Text>
            <TouchableOpacity style={styles.addGoalButton}>
              <Text style={styles.addGoalText}>Add Goal</Text>
            </TouchableOpacity>
          </View>
          
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
              <Ionicons name="grid" size={24} color="#0E6B8A" />
              <Text style={styles.gameLabel}>2048</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="infinite" size={24} color="#0E6B8A" />
              <Text style={styles.gameLabel}>Subway Mind</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="eye" size={24} color="#0E6B8A" />
              <Text style={styles.gameLabel}>AI Focus</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.gameCard}>
              <Ionicons name="cube" size={24} color="#0E6B8A" />
              <Text style={styles.gameLabel}>Blocks</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* National Impact */}
        <View style={styles.nationalSection}>
          <Text style={styles.sectionTitle}>National Impact</Text>
          <View style={styles.nationalStats}>
            <View style={styles.nationalStatItem}>
              <Text style={styles.nationalLabel}>India avoided</Text>
              <Text style={styles.nationalValue}>1.2M</Text>
              <Text style={styles.nationalUnit}>cigarettes</Text>
            </View>
            
            <View style={styles.nationalStatItem}>
              <Text style={styles.nationalLabel}>CO₂ reduced</Text>
              <Text style={styles.nationalValue}>3.6K</Text>
              <Text style={styles.nationalUnit}>kg</Text>
            </View>
            
            <View style={styles.nationalStatItem}>
              <Text style={styles.nationalLabel}>Collective savings</Text>
              <Text style={styles.nationalValue}>₹42.5M</Text>
            </View>
          </View>
          
          <View style={styles.nationalIconContainer}>
            <Ionicons name="help-circle-outline" size={24} color="#0E6B8A" />
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
  topStatsContainer: {
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  statsLabel: {
    fontSize: 12,
    color: '#C9F7F0',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C9F7F0',
    marginBottom: 4,
    textShadowColor: '#C9F7F0',
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
    backgroundColor: '#BFEFE0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 100,
  },
  moneySavedTabLabel: {
    fontSize: 10,
    color: '#10283B',
    marginBottom: 2,
    textAlign: 'center',
  },
  moneySavedTabValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10283B',
    textAlign: 'center',
  },
  streakHealthCard: {
    backgroundColor: '#0E6B8A',
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
    color: '#fff',
  },
  streakRight: {
    flex: 1,
  },
  streakLabel: {
    fontSize: 14,
    color: '#B8E6E3',
    marginBottom: 4,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
  goalsSection: {
    marginBottom: 24,
    backgroundColor: '#07121A',
    borderRadius: 16,
    padding: 20,
  },
  goalsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addGoalButton: {
    backgroundColor: '#BFEFE0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addGoalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10283B',
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
    borderBottomColor: '#1A2B34',
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
    backgroundColor: '#0E6B8A',
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
    backgroundColor: '#2E7D7A',
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
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  nationalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  nationalStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  nationalLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  nationalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  nationalUnit: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  nationalIconContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});