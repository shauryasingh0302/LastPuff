import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dailyGoalsData = [
  { icon: 'ban-outline', text: 'Avoid 5 cigarettes today', checked: false },
  { icon: 'wallet-outline', text: 'Save ₹250 today', checked: true },
  { icon: 'flash-outline', text: '5 min breathing exercise', checked: false },
  { icon: 'game-controller-outline', text: 'Play 1 distraction game', checked: true },
  { icon: 'water-outline', text: 'Drink 3 glasses of water', checked: false },
];

export default function GoalsScreen() {
  const [dailyGoals, setDailyGoals] = useState(dailyGoalsData);

  const toggleCheckbox = (index: number) => {
    const newGoals = [...dailyGoals];
    newGoals[index].checked = !newGoals[index].checked;
    setDailyGoals(newGoals);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goals</Text>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?u=mahimajoshi' }}
          style={styles.headerAvatar}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Goals</Text>
          <Text style={styles.subtitle}>Daily and Weekly targets to help you stay on track.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Goals</Text>
          {dailyGoals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Ionicons name={goal.icon as any} size={22} color="#39FF14" />
              <Text style={styles.goalText}>{goal.text}</Text>
              <TouchableOpacity onPress={() => toggleCheckbox(index)} style={styles.checkbox}>
                {goal.checked && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Daily Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Daily Goal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.weeklyGoalsContainer}>
          <View style={styles.weeklyGoalCard}>
            <View style={styles.weeklyGoalIcon}>
              <Ionicons name="walk-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.weeklyGoalTitle}>Weekly Goal #1</Text>
            <Text style={styles.weeklyGoalSubtitle}>Avoid 15 cigarettes</Text>
          </View>
          <View style={styles.weeklyGoalCard}>
            <View style={styles.weeklyGoalIcon}>
              <Ionicons name="book-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.weeklyGoalTitle}>Weekly Goal #2</Text>
            <Text style={styles.weeklyGoalSubtitle}>Journal 3 times</Text>
          </View>
          <View style={styles.weeklyGoalCard}>
            <View style={styles.weeklyGoalIcon}>
              <Ionicons name="barbell-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.weeklyGoalTitle}>Weekly Goal #3</Text>
            <Text style={styles.weeklyGoalSubtitle}>Exercise 2 times</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>You're 65% towards your weekly target</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Weekly</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>70%</Text>
            <Text style={styles.summaryLabel}>DAILY</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>60%</Text>
            <Text style={styles.summaryLabel}>WEEKLY</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>12</Text>
            <Text style={styles.summaryLabel}>DAY STREAK</Text>
          </View>
        </View>

        <View style={styles.suggestedGoals}>
          <Text style={styles.suggestedTitle}>Suggested Goals</Text>
          <View style={styles.suggestedButtons}>
            <TouchableOpacity style={styles.suggestedButton}>
              <Text style={styles.suggestedButtonText}>Take a 5-min walk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestedButton}>
              <Text style={styles.suggestedButtonText}>Avoid smoking after meals</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>Tip of the day: People who set small goals improve success rate by 45%.</Text>
          <View style={styles.tipCircle} />
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  scrollContent: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#39FF14',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#39FF14',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontWeight: '600',
  },
  weeklyGoalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weeklyGoalCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '32%',
  },
  weeklyGoalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#39FF14',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  weeklyGoalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  weeklyGoalSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  progressInfo: {
    marginBottom: 16,
  },
  progressText: {
    color: '#fff',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    width: '65%',
    backgroundColor: '#39FF14',
    borderRadius: 4,
  },
  summaryCard: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  suggestedGoals: {
    marginBottom: 20,
  },
  suggestedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  suggestedButtons: {
    flexDirection: 'row',
  },
  suggestedButton: {
    backgroundColor: '#39FF14',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestedButtonText: {
    color: '#000000',
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  tipCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#39FF14',
    position: 'absolute',
    bottom: -20,
    right: 20,
    backgroundColor: '#000000',
  },
});