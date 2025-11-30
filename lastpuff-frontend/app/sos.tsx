import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SOSScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={28} color="#39FF14" />
      </TouchableOpacity>

      <Text style={styles.title}>Need Support?</Text>
      <Text style={styles.subtitle}>We're here to help you fight cravings.</Text>

      <TouchableOpacity style={styles.card}>
        <Ionicons name="leaf-outline" size={30} color="#39FF14" />
        <Text style={styles.cardText}>1-minute Breathing Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Ionicons name="game-controller-outline" size={30} color="#39FF14" />
        <Text style={styles.cardText}>Play a Quick Distraction Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Ionicons name="call-outline" size={30} color="#39FF14" />
        <Text style={styles.cardText}>Call Emergency Support</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  backBtn: {
    marginBottom: 20,
  },
  title: {
    color: "#39FF14",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 16,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
