import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const predefinedGoalsList = [
  { icon: "ban-outline", text: "Avoid 5 cigarettes today" },
  { icon: "water-outline", text: "Drink 3 glasses of water" },
  { icon: "flash-outline", text: "10 min breathing exercise" },
  { icon: "wallet-outline", text: "Save ₹100 today" },
  { icon: "walk-outline", text: "Walk 10 minutes" },
  { icon: "game-controller-outline", text: "Play 1 focus game" },
];

export default function GoalsScreen() {
  const [dailyGoals, setDailyGoals] = useState<any[]>([
    { icon: "ban-outline", text: "Avoid 5 cigarettes today" },
    { icon: "wallet-outline", text: "Save ₹250 today" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [customGoal, setCustomGoal] = useState("");

  const deleteGoal = (index: number) => {
    const updated = dailyGoals.filter((_, i) => i !== index);
    setDailyGoals(updated);
  };

  const addGoal = (goal: any) => {
    setDailyGoals([...dailyGoals, goal]);
    setModalVisible(false);
    setCustomGoal("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SAME STYLE AS SOS */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={28} color="#39FF14" />
      </TouchableOpacity>

      <Text style={styles.title}>Goals</Text>
      <Text style={styles.subtitle}>Daily and Weekly targets to stay on track</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* DAILY GOALS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Goals</Text>

          {dailyGoals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Ionicons name={goal.icon as any} size={22} color="#39FF14" />
              <Text style={styles.goalText}>{goal.text}</Text>
              <TouchableOpacity onPress={() => deleteGoal(index)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>Add Daily Goal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL FOR ADD GOAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Goal</Text>

            <Text style={styles.sectionLabel}>Predefined Goals</Text>
            {predefinedGoalsList.map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalGoalItem}
                onPress={() => addGoal(goal)}
              >
                <Ionicons name={goal.icon as any} size={22} color="#39FF14" />
                <Text style={styles.modalGoalText}>{goal.text}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Custom Goal</Text>
            <TextInput
              placeholder="Write your goal..."
              placeholderTextColor="#666"
              style={styles.input}
              value={customGoal}
              onChangeText={setCustomGoal}
            />

            <TouchableOpacity
              style={[styles.addButton, { marginTop: 10 }]}
              onPress={() => customGoal.trim() && addGoal({ icon: "create-outline", text: customGoal })}
            >
              <Text style={styles.addButtonText}>Add Custom Goal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 20 },
  backBtn: { marginTop: 10, marginBottom: 10, width: 40 },
  title: { color: "#39FF14", fontSize: 32, fontWeight: "bold", marginBottom: 6 },
  subtitle: { color: "#fff", fontSize: 14, marginBottom: 20 },
  scrollContent: { paddingBottom: 80 },
  card: { backgroundColor: "#121212", borderRadius: 16, padding: 16, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 16 },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  goalText: { flex: 1, fontSize: 16, color: "#fff", marginLeft: 12 },
  deleteBtn: { padding: 4 },
  addButton: {
    backgroundColor: "#39FF14",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 16,
    alignItems: "center",
  },
  addButtonText: { color: "#000", fontWeight: "600" },

  // modal
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  modalContent: {
    backgroundColor: "#121212",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 16 },
  sectionLabel: { color: "#39FF14", fontWeight: "bold", marginBottom: 10 },
  modalGoalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalGoalText: { color: "#fff", fontSize: 16, marginLeft: 10 },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 14 },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  cancelBtn: { marginTop: 10, alignItems: "center" },
  cancelText: { color: "#ff3b30", fontSize: 16 },
});
