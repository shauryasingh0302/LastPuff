import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LPColors } from '../../constants/theme';
import { useGoals, PlanType } from '../../context/GoalsContext';

const QUESTIONS = [
    {
        id: 1,
        text: "How many cigarettes do you smoke per day?",
        options: ["1-5", "6-10", "11-20", "20+"]
    },
    {
        id: 2,
        text: "How soon after waking do you smoke your first cigarette?",
        options: ["Within 5 mins", "6-30 mins", "31-60 mins", "After 60 mins"]
    },
    {
        id: 3,
        text: "How strong are your cravings?",
        options: ["Weak", "Moderate", "Strong", "Unbearable"]
    },
    {
        id: 4,
        text: "Do you become irritated or restless without smoking?",
        options: ["No", "Slightly", "Very often", "Always"]
    },
    {
        id: 5,
        text: "What triggers your smoking the most?",
        options: ["Stress", "Boredom", "Social / Friends", "Habits (Meals/Coffee)"]
    },
    {
        id: 6,
        text: "Do you smoke more when stressed or emotional?",
        options: ["No", "Sometimes", "Yes", "Always"]
    },
    {
        id: 7,
        text: "Have you tried quitting before?",
        options: ["Never", "Once", "A few times", "Many times"]
    },
    {
        id: 8,
        text: "How motivated are you to quit? (Scale 1–10)",
        options: ["Low (1-3)", "Medium (4-6)", "High (7-8)", "Very High (9-10)"]
    },
    {
        id: 9,
        text: "Do you want to quit immediately or slowly?",
        options: ["Immediately (Cold Turkey)", "Slowly (Gradual)", "Not sure"]
    },
    {
        id: 10,
        text: "Do you experience withdrawal symptoms when reducing cigarettes?",
        options: ["None", "Mild", "Moderate", "Severe"]
    }
];

export default function QuestionnaireScreen() {
    const { setPlan } = useGoals();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    debugger; // Intentional debugger for dev if needed
    const [showPlans, setShowPlans] = useState(false);

    // Calculate progress
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    const handleAnswer = (answer: string) => {
        setAnswers({ ...answers, [QUESTIONS[currentStep].id]: answer });

        if (currentStep < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 250);
        } else {
            setShowPlans(true);
        }
    };

    const handleSelectPlan = (plan: PlanType) => {
        setPlan(plan);
        router.replace('/(tabs)');
    };

    if (showPlans) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.planTitle}>Choose Your Path</Text>
                    <Text style={styles.planSubtitle}>Based on your answers, we recommend starting a structured plan.</Text>

                    {/* Cold Turkey Card */}
                    <View style={styles.planCard}>
                        <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]}>
                            <Ionicons name="flash" size={32} color="#FF3B30" />
                        </View>
                        <Text style={styles.cardTitle}>Cold Turkey</Text>
                        <Text style={styles.cardDesc}>
                            Stop smoking completely right now. Best for highly motivated individuals who want immediate results.
                        </Text>
                        <View style={styles.benefitList}>
                            <Text style={styles.benefitItem}>• Instant health benefits</Text>
                            <Text style={styles.benefitItem}>• Break the addiction faster</Text>
                            <Text style={styles.benefitItem}>• Requires high willpower</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.selectButton, { backgroundColor: '#FF3B30' }]}
                            onPress={() => handleSelectPlan('cold-turkey')}
                        >
                            <Text style={styles.selectButtonText}>Select Cold Turkey</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Gradual Reduction Card */}
                    <View style={styles.planCard}>
                        <View style={[styles.iconCircle, { backgroundColor: 'rgba(57, 255, 20, 0.1)' }]}>
                            <Ionicons name="trending-down" size={32} color={LPColors.primary} />
                        </View>
                        <Text style={styles.cardTitle}>Gradual Reduction</Text>
                        <Text style={styles.cardDesc}>
                            Slowly reduce cigarettes over time. Best for heavy smokers or those who want to minimize withdrawal.
                        </Text>
                        <View style={styles.benefitList}>
                            <Text style={styles.benefitItem}>• Less intense withdrawal</Text>
                            <Text style={styles.benefitItem}>• Build confidence slowly</Text>
                            <Text style={styles.benefitItem}>• Easier to start</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.selectButton, { backgroundColor: LPColors.primary }]}
                            onPress={() => handleSelectPlan('gradual')}
                        >
                            <Text style={[styles.selectButtonText, { color: '#000' }]}>Select Gradual Reduction</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    const currentQuestion = QUESTIONS[currentStep];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header / Progress */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="close" size={24} color={LPColors.textGray} />
                </TouchableOpacity>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{currentStep + 1}/{QUESTIONS.length}</Text>
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{currentQuestion.text}</Text>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => handleAnswer(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                            <Ionicons name="chevron-forward" size={20} color={LPColors.textGray} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LPColors.bg,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10,
    },
    backBtn: {
        padding: 4,
    },
    progressBarBg: {
        flex: 1,
        height: 6,
        backgroundColor: LPColors.surfaceLight,
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: LPColors.primary,
        borderRadius: 3,
    },
    progressText: {
        color: LPColors.textGray,
        fontSize: 12,
        fontWeight: '600',
        width: 30,
        textAlign: 'right',
    },
    questionContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: LPColors.text,
        marginBottom: 40,
        lineHeight: 34,
    },
    optionsContainer: {
        gap: 16,
    },
    optionButton: {
        backgroundColor: LPColors.surface,
        padding: 20,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: LPColors.border,
    },
    optionText: {
        fontSize: 16,
        color: LPColors.text,
        fontWeight: '500',
    },
    // Plan Selection Styles
    planTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: LPColors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    planSubtitle: {
        fontSize: 16,
        color: LPColors.textGray,
        textAlign: 'center',
        marginBottom: 30,
    },
    planCard: {
        backgroundColor: LPColors.surface,
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: LPColors.border,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: LPColors.text,
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 14,
        color: LPColors.textGray,
        marginBottom: 20,
        lineHeight: 20,
    },
    benefitList: {
        marginBottom: 24,
        gap: 8,
    },
    benefitItem: {
        fontSize: 14,
        color: LPColors.text,
        opacity: 0.9,
    },
    selectButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
