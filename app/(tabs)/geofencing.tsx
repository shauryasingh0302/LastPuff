import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function GeofencingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Geofencing</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>
      
      <View style={styles.content}>
        <Ionicons name="map" size={64} color="#0E6B8A" style={styles.icon} />
        <Text style={styles.title}>Location-Based Support</Text>
        <Text style={styles.subtitle}>Set up alerts for high-risk locations to help you avoid triggers</Text>
        
        <View style={styles.featureCard}>
          <Ionicons name="location" size={32} color="#0E6B8A" />
          <Text style={styles.featureTitle}>Trigger Zones</Text>
          <Text style={styles.featureDescription}>Mark locations where you're tempted to smoke</Text>
        </View>
        
        <View style={styles.featureCard}>
          <Ionicons name="notifications" size={32} color="#0E6B8A" />
          <Text style={styles.featureTitle}>Smart Alerts</Text>
          <Text style={styles.featureDescription}>Get notifications when approaching trigger zones</Text>
        </View>
        
        <View style={styles.featureCard}>
          <Ionicons name="shield-checkmark" size={32} color="#BFEFE0" />
          <Text style={styles.featureTitle}>Safe Zones</Text>
          <Text style={styles.featureDescription}>Mark smoke-free areas for positive reinforcement</Text>
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  featureCard: {
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});