import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import { fetchDashboardSummary } from "../../services/api";
import { LPColors } from "../../constants/theme";

export default function ProfileScreen() {
  const { logout, user }: any = useContext(AuthContext);

  const [stats, setStats] = useState({
    streakDays: 0,
    cravingsHandled: 0,
    moneySaved: 0,
    goalsCompleted: 0,
  });

  // Fetch dashboard summary
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchDashboardSummary();
        setStats(res.data as {
          streakDays: number;
          cravingsHandled: number;
          moneySaved: number;
          goalsCompleted: number;
        });
      } catch (err) {
        console.log("Dashboard error:", err);
      }
    };

    loadStats();
  }, []);

  const settings = [
    { icon: "person-outline", name: "Edit Profile" },
    { icon: "notifications-outline", name: "Notification Settings" },
    { icon: "flag-outline", name: "Manage Goals" },
    { icon: "lock-closed-outline", name: "Privacy & Security" },
    { icon: "people-outline", name: "Community Preferences" },
    { icon: "help-circle-outline", name: "Help & Support" },
    { icon: "information-circle-outline", name: "About LastPuff" },
  ];

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "2024";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {/* Avatar */}
          {user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitial}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.since}>
            Quit Journey Member since {memberSince}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="flame-outline" size={20} color={LPColors.neon} />
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>{stats.streakDays} days</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="leaf-outline" size={20} color={LPColors.neon} />
            <Text style={styles.statLabel}>Cravings</Text>
            <Text style={styles.statValue}>{stats.cravingsHandled}</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="wallet-outline" size={20} color={LPColors.neon} />
            <Text style={styles.statLabel}>Saved</Text>
            <Text style={styles.statValue}>₹{stats.moneySaved}</Text>
          </View>
        </View>

        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Journey Overview</Text>

          <View style={styles.overviewContainer}>
            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Goals completed</Text>
              <Text style={styles.overviewValue}>{stats.goalsCompleted}</Text>
            </View>

            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Cravings handled</Text>
              <Text style={styles.overviewValue}>
                {stats.cravingsHandled}
              </Text>
            </View>

            <View style={styles.overviewBox}>
              <Text style={styles.overviewLabel}>Money saved</Text>
              <Text style={styles.overviewValue}>₹{stats.moneySaved}</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
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

        {/* Settings List */}
        <View style={styles.settingsContainer}>
          {settings.map((item, index) => (
            <TouchableOpacity key={index} style={styles.settingItem}>
              <Ionicons name={item.icon as any} size={22} color={LPColors.neon} />
              <Text style={styles.settingName}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
    margin: 16,
    borderRadius: 16,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#39FF14",
    marginBottom: 12,
  },

  avatarFallback: {
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInitial: {
    fontSize: 36,
    color: "#39FF14",
    fontWeight: "700",
  },

  editIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 15,
  },

  name: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  since: { fontSize: 14, color: "#888", marginTop: 4 },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 16,
  },

  statBox: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "31%",
  },

  statLabel: { fontSize: 12, color: "#888", marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#fff", marginTop: 2 },

  section: { marginTop: 20, paddingHorizontal: 16 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  keepGoing: { fontSize: 14, color: LPColors.neon, fontWeight: "600" },

  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  overviewBox: {
    backgroundColor: "#39FF14",
    borderRadius: 12,
    padding: 16,
    width: "32%",
    alignItems: "center",
  },

  overviewLabel: { fontSize: 12, color: "#000", marginBottom: 8 },
  overviewValue: { fontSize: 20, fontWeight: "800", color: "#000" },

  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  badge: {
    backgroundColor: "#39FF14",
    borderRadius: 12,
    padding: 16,
    width: "23%",
    alignItems: "center",
  },

  badgeText: { fontSize: 12, color: "#000", marginTop: 8 },

  settingsContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginBottom: 20,
  },

  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3B44",
  },

  settingName: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 16,
    flex: 1,
  },

  logoutButton: {
    backgroundColor: "#ff3b30",
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
