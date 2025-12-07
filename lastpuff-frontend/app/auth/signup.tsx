import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import API from "../../services/api";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { LPColors } from "../../constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AuthResponse {
  token: string;
  user: any;
}

export default function SignupScreen() {
  const router = useRouter();
  const auth: any = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    plan: "gradual",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        age: form.age ? Number(form.age) : undefined,
        height: form.height ? Number(form.height) : undefined,
        weight: form.weight ? Number(form.weight) : undefined,
      };

      const res = await API.post<AuthResponse>("/auth/signup", payload);
      await auth.loginUser(res.data.user, res.data.token);

      // 🚀 Redirect to onboarding for new users to set up their plan
      router.replace("/onboarding/questionnaire");
    } catch (err: any) {
      console.log("FULL SIGNUP ERROR:", JSON.stringify(err, null, 2));
      setError(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add-outline" size={40} color={LPColors.primary} />
          </View>
          <Text style={styles.title}>Join LastPuff</Text>
          <Text style={styles.subtitle}>Start your smoke-free journey today</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={LPColors.textGray} style={styles.inputIcon} />
          <TextInput
            placeholder="Name"
            placeholderTextColor={LPColors.textGray}
            style={styles.input}
            onChangeText={(v) => handleChange("name", v)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={LPColors.textGray} style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={LPColors.textGray}
            style={styles.input}
            onChangeText={(v) => handleChange("email", v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={LPColors.textGray} style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={LPColors.textGray}
            secureTextEntry
            style={styles.input}
            onChangeText={(v) => handleChange("password", v)}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <TextInput
              placeholder="Age"
              placeholderTextColor={LPColors.textGray}
              keyboardType="numeric"
              style={styles.inputCentered}
              onChangeText={(v) => handleChange("age", v)}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <TextInput
              placeholder="H (cm)"
              placeholderTextColor={LPColors.textGray}
              keyboardType="numeric"
              style={styles.inputCentered}
              onChangeText={(v) => handleChange("height", v)}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TextInput
              placeholder="W (kg)"
              placeholderTextColor={LPColors.textGray}
              keyboardType="numeric"
              style={styles.inputCentered}
              onChangeText={(v) => handleChange("weight", v)}
            />
          </View>
        </View>


        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity onPress={onSignup} disabled={loading}>
          <LinearGradient
            colors={[LPColors.primary, '#004d2c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{loading ? "Creating Account..." : "Sign Up"}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.switchText}>Already have an account? <Text style={{ fontWeight: 'bold', color: LPColors.primary }}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  scrollContent: { padding: 24, justifyContent: 'center', minHeight: '100%' },
  headerContainer: { alignItems: 'center', marginBottom: 32 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: LPColors.primary,
  },
  title: { color: LPColors.text, fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { color: LPColors.textGray, fontSize: 16, textAlign: "center" },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LPColors.surfaceLight,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputIcon: { marginLeft: 16, marginRight: 8 },
  input: { flex: 1, padding: 16, color: LPColors.text, fontSize: 16 },
  inputCentered: { flex: 1, padding: 16, color: LPColors.text, fontSize: 16, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },

  button: { padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },

  switchText: { color: LPColors.textGray, marginTop: 24, textAlign: "center", fontSize: 14 },
  error: { color: "#FF3B30", textAlign: "center", marginBottom: 16 },
});
