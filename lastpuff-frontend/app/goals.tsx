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

// compulsory 5 goals always shown
const compulsoryGoalsList = [
  { icon: "ban-outline", text: "Avoid 5 cigarettes today" },
  { icon: "water-outline", text: "Drink 3 glasses of water" },
  { icon: "flash-outline", text: "10 min breathing exercise" },
  { icon: "wallet-outline", text: "Save ₹100 today" },
  { icon: "walk-outline", text: "Walk 10 minutes" },
];

// Suggested goals that appear in modal
const suggestedGoalsList = [
  { icon: "game-controller-outline", text: "Play 1 focus game" },
  { icon: "bed-outline", text: "Sleep 7 hours" },
  { icon: "heart-outline", text: "Avoid sugar cravings" },
  { icon: "barbell-outline", text: "Exercise 15 minutes" },
];

export default function GoalsScreen() {
  const [customGoals, setCustomGoals] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [customGoal, setCustomGoal] = useState("");

  const deleteGoal = (index: number) => {
    const updated = customGoals.filter((_, i) => i !== index);
    setCustomGoals(updated);
  };

  const addGoal = (goal: any) => {
    setCustomGoals([...customGoals, goal]);
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

      {/* PAGE CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Goals</Text>

          {/* compulsory goals */}
          {compulsoryGoalsList.map((goal, index) => (
            <View key={`comp-${index}`} style={styles.goalItem}>
              <Ionicons name={goal.icon as any} size={22} color="#39FF14" />
              <Text style={styles.goalText}>{goal.text}</Text>
            </View>
          ))}

          {/* custom user added goals */}
          {customGoals.map((goal, index) => (
            <View key={`custom-${index}`} style={styles.goalItem}>
              <Ionicons name={goal.icon as any} size={22} color="#39FF14" />
              <Text style={styles.goalText}>{goal.text}</Text>

              {/* delete custom goal */}
              <TouchableOpacity onPress={() => deleteGoal(index)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          ))}

          {/* ADD GOAL BUTTON */}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>Add Daily Goal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* POPUP BOTTOM SHEET */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Goal</Text>

            {/* suggested goals */}
            {suggestedGoalsList.map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalGoalItem}
                onPress={() => addGoal(goal)}
              >
                <Ionicons name={goal.icon as any} size={22} color="#39FF14" />
                <Text style={styles.modalGoalText}>{goal.text}</Text>
              </TouchableOpacity>
            ))}

            {/* custom goal input */}
            <TextInput
              placeholder="Write your goal..."
              placeholderTextColor="#666"
              style={styles.input}
              value={customGoal}
              onChangeText={setCustomGoal}
            />

            <TouchableOpacity
              style={[styles.addButton, { marginTop: 10 }]}
              onPress={() =>
                customGoal.trim() && addGoal({ icon: "create-outline", text: customGoal })
              }
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {/* CLOSE */}
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

  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  modalContent: {
    backgroundColor: "#121212",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 16 },
  modalGoalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalGoalText: { color: "#fff", fontSize: 16, marginLeft: 10 },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  cancelBtn: { marginTop: 10, alignItems: "center" },
  cancelText: { color: "#ff3b30", fontSize: 16 },
});
