import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { LPColors } from '../constants/theme';

export default function FloatingChatButton() {
    const router = useRouter();
    const segments = useSegments();

    // Hide on certain screens
    const shouldHide =
        segments.some(seg => seg === 'ai-coach') || // Don't show on AI coach screen itself
        segments.some(seg => seg === 'auth') || // Don't show on auth screens
        segments.some(seg => seg === 'onboarding'); // Don't show on onboarding

    if (shouldHide) return null;

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/ai-coach');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.7}
                style={styles.buttonContainer}
            >
                <LinearGradient
                    colors={[LPColors.primary, '#004d2c']}
                    style={styles.gradient}
                >
                    <Ionicons name="chatbubbles" size={22} color="#000" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        zIndex: 999,
    },
    buttonContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
