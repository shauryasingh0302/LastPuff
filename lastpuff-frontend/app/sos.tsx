import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LPColors } from "../constants/theme";

const QUOTES = [
  "The craving will pass whether you smoke or not.",
  "You are stronger than a moment of weakness.",
  "Every resist makes you stronger.",
  "Think of why you started.",
];

export default function SOSScreen() {
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const handleCallSupport = () => {
    Linking.openURL("tel:18007848669"); // Example: National Quitline
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={LPColors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SOS Mode</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="alert-circle" size={48} color="#FF3B30" />
          </View>
          <Text style={styles.title}>Feeling an urge?</Text>
          <Text style={styles.subtitle}>Take a deep breath. You can get through this.</Text>
        </View>

        <View style={styles.actionsGrid}>
          {/* Breathing */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/games/breathing')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(57, 255, 20, 0.1)' }]}>
              <Ionicons name="fitness" size={32} color={LPColors.primary} />
            </View>
            <Text style={styles.actionTitle}>Breathe</Text>
            <Text style={styles.actionDesc}>1 min guided breathing</Text>
            <Ionicons name="arrow-forward" size={20} color={LPColors.textGray} style={styles.arrow} />
          </TouchableOpacity>

          {/* Distraction */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/games/2048')}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
              <Ionicons name="game-controller" size={32} color="#3B82F6" />
            </View>
            <Text style={styles.actionTitle}>Distract</Text>
            <Text style={styles.actionDesc}>Play a quick game</Text>
            <Ionicons name="arrow-forward" size={20} color={LPColors.textGray} style={styles.arrow} />
          </TouchableOpacity>

          {/* Call Support */}
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: '#FF3B30', borderWidth: 1 }]}
            onPress={handleCallSupport}
          >
            <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]}>
              <Ionicons name="call" size={32} color="#FF3B30" />
            </View>
            <Text style={styles.actionTitle}>Call Support</Text>
            <Text style={styles.actionDesc}>Speak to a professional</Text>
            <Ionicons name="arrow-forward" size={20} color={LPColors.textGray} style={styles.arrow} />
          </TouchableOpacity>
        </View>

        {/* Motivation Card */}
        <View style={styles.quoteCard}>
          <Ionicons name="quote" size={24} color={LPColors.primary} style={{ marginBottom: 8 }} />
          <Text style={styles.quoteText}>"{quote}"</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LPColors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LPColors.text,
  },
  content: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LPColors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: LPColors.textGray,
    textAlign: 'center',
  },
  actionsGrid: {
    gap: 16,
    marginBottom: 32,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LPColors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LPColors.text,
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 14,
    color: LPColors.textGray,
  },
  arrow: {
    marginLeft: 'auto',
  },
  quoteCard: {
    backgroundColor: LPColors.surfaceLight,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  quoteText: {
    fontSize: 18,
    color: LPColors.text,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 26,
  },
});
