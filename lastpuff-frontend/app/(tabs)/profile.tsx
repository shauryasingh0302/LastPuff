import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { logout }: any = useContext(AuthContext);

  const settings = [
    { icon: 'person-outline', name: 'Edit Profile' },
    { icon: 'notifications-outline', name: 'Notification Settings' },
    { icon: 'flag-outline', name: 'Manage Goals' },
    { icon: 'lock-closed-outline', name: 'Privacy & Security' },
    { icon: 'people-outline', name: 'Community Preferences' },
    { icon: 'help-circle-outline', name: 'Help & Support' },
    { icon: 'information-circle-outline', name: 'About LastPuff' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=mahimajoshi' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.name}>Mahi</Text>
          <Text style={styles.since}>Quit Journey Member since 2024</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="flame-outline" size={20} color="#39FF14" />
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>14 days</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="leaf-outline" size={20} color="#39FF14" />
            <Text style={styles.statLabel}>Avoided</Text>
            <Text style={styles.statValue}>52 total</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="wallet-outline" size={20} color="#39FF14" />
            <Text style={styles.statLabel}>Saved</Text>
            <Text style={styles.statValue}>₹18,240</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Journey Overview</Text>
          <View style={styles.overviewContainer}>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Weekly completion</Text>
              <Text style={styles.overviewValue}>82%</Text>
            </View>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Cravings handled</Text>
              <Text style={styles.overviewValue}>27</Text>
            </View>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Challenges joined</Text>
              <Text style={styles.overviewValue}>4</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges Earned</Text>
            <Text style={styles.keepGoing}>Keep going</Text>
          </View>
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Ionicons name="sparkles-outline" size={24} color="#fff" />
              <Text style={styles.badgeText}>3-day</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="calendar-outline" size={24} color="#fff" />
              <Text style={styles.badgeText}>7-day</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="infinite-outline" size={24} color="#fff" />
              <Text style={styles.badgeText}>14-day</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="trophy-outline" size={24} color="#fff" />
              <Text style={styles.badgeText}>1-month</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quit Squad</Text>
          <View style={styles.squadCard}>
            <View>
              <Text style={styles.squadName}>Calm Breathers</Text>
              <Text style={styles.squadInfo}>6 members • Role: Member</Text>
            </View>
            <TouchableOpacity style={styles.viewSquadButton}>
              <Text style={styles.viewSquadButtonText}>View Squad</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          {settings.map((item, index) => (
            <TouchableOpacity key={index} style={styles.settingItem}>
              <Ionicons name={item.icon as any} size={22} color="#39FF14" />
              <Text style={styles.settingName}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    margin: 16,
    borderRadius: 16,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#fff', marginBottom: 12 },
  editIcon: { position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 15 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  since: { fontSize: 14, color: '#888', marginTop: 4 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginTop: 16 },
  statBox: { backgroundColor: '#1E1E1E', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', width: '31%' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 2 },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  keepGoing: { fontSize: 14, color: '#39FF14', fontWeight: '600' },
  overviewContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  overviewBox: { backgroundColor: '#39FF14', borderRadius: 12, padding: 16, width: '32%', alignItems: 'center' },
  overviewLabel: { fontSize: 12, color: '#000', textAlign: 'center', marginBottom: 8 },
  overviewValue: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  badgesContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  badge: { backgroundColor: '#39FF14', borderRadius: 12, padding: 16, width: '23%', alignItems: 'center' },
  badgeText: { fontSize: 12, color: '#000', marginTop: 8 },
  squadCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  squadName: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  squadInfo: { fontSize: 14, color: '#888', marginTop: 4 },
  viewSquadButton: { backgroundColor: '#39FF14', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  viewSquadButtonText: { color: '#000', fontWeight: 'bold' },
  settingsContainer: { marginTop: 20, marginHorizontal: 16, backgroundColor: '#1E1E1E', borderRadius: 12, marginBottom: 20 },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#2A3B44' },
  settingName: { fontSize: 16, color: '#fff', marginLeft: 16, flex: 1 },

  // Logout button styles
  logoutButton: {
    backgroundColor: '#ff3b30',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
