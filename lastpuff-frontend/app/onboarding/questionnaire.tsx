import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LPColors } from '../../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { PlanType, useGoals } from '../../context/GoalsContext';
import API from '../../services/api';

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

interface SignupResponse {
    user: any;
    token: string;
}

export default function QuestionnaireScreen() {
    const { setPlan } = useGoals();
    const auth: any = useContext(AuthContext);
    const params = useLocalSearchParams();

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showPlans, setShowPlans] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [signupData, setSignupData] = useState<any>(null);

    // Parse signup data on mount
    useEffect(() => {
        console.log('[Questionnaire] Raw params:', JSON.stringify(params));
        if (params.signupData) {
            try {
                const parsed = JSON.parse(params.signupData as string);
                console.log('[Questionnaire] Parsed signupData:', parsed.email);
                setSignupData(parsed);
            } catch (e) {
                console.error('[Questionnaire] Failed to parse signupData:', e);
            }
        } else {
            console.log('[Questionnaire] No signupData in params');
        }
    }, [params.signupData]);

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

    const handleSelectPlan = async (plan: PlanType) => {
        console.log('[Questionnaire] handleSelectPlan called, plan:', plan, 'signupData:', signupData ? 'YES' : 'NO');

        // If we have signup data, create the account now
        if (signupData) {
            setIsCreatingAccount(true);
            try {
                console.log('[Questionnaire] Creating account for:', signupData.email);
                // Create the user account
                const res = await API.post<SignupResponse>("/auth/signup", signupData);
                const { user, token } = res.data;
                console.log('[Questionnaire] Account created successfully');

                // Log the user in
                await auth.loginUser(user, token);

                // Set the plan
                setPlan(plan);

                // Navigate to main app
                router.replace('/(tabs)');
            } catch (err: any) {
                console.error('[Questionnaire] Signup error:', err.response?.data || err.message);
                setIsCreatingAccount(false);
                Alert.alert(
                    "Signup Failed",
                    err.response?.data?.message || "Could not create your account. Please try again.",
                    [
                        { text: "Try Again", style: "cancel" },
                        { text: "Go Back", onPress: () => router.replace('/auth/signup') }
                    ]
                );
            }
        } else {
            // Existing user just updating plan
            console.log('[Questionnaire] No signup data, just setting plan');
            setPlan(plan);
            router.replace('/(tabs)');
        }
    };

    const handleCancel = () => {
        console.log('[Questionnaire] handleCancel called, signupData:', signupData ? 'YES' : 'NO');

        // Always show confirmation and go to login screen
        // This ensures signup process is completely cancelled
        Alert.alert(
            "Cancel Signup?",
            "Your account will not be created. You'll be taken back to the login screen.",
            [
                { text: "Continue Signup", style: "cancel" },
                {
                    text: "Cancel",
                    style: "destructive",
                    onPress: () => {
                        console.log('[Questionnaire] User confirmed cancel, going to login');
                        // Go to login screen - this ensures no redirect to home
                        router.replace('/auth/login');
                    }
                }
            ]
        );
    };

    // Plan selection screen
    if (showPlans) {
        return (
            <SafeAreaView style={styles.container}>
                {/* Loading Overlay */}
                {isCreatingAccount && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={LPColors.primary} />
                        <Text style={styles.loadingText}>Creating your account...</Text>
                    </View>
                )}
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.planTitle}>Choose Your Path</Text>
                    <Text style={styles.planSubtitle}>
                        {signupData
                            ? "Select a plan to complete your signup!"
                            : "Select your quit smoking approach."}
                    </Text>

                    {/* Cold Turkey Card */}
                    <View style={styles.planCard}>
                        <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]}>
                            <Ionicons name="flash" size={32} color="#FF3B30" />
                        </View>
                        <Text style={styles.cardTitle}>Cold Turkey</Text>
                        <Text style={styles.cardDesc}>
                            Stop smoking completely right now. Best for highly motivated individuals.
                        </Text>
                        <View style={styles.benefitList}>
                            <Text style={styles.benefitItem}>• Instant health benefits</Text>
                            <Text style={styles.benefitItem}>• Break the addiction faster</Text>
                            <Text style={styles.benefitItem}>• Requires high willpower</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.selectButton, { backgroundColor: '#FF3B30' }, isCreatingAccount && styles.buttonDisabled]}
                            onPress={() => handleSelectPlan('cold-turkey')}
                            disabled={isCreatingAccount}
                        >
                            <Text style={styles.selectButtonText}>
                                {isCreatingAccount ? 'Creating Account...' : 'Select Cold Turkey'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Gradual Reduction Card */}
                    <View style={styles.planCard}>
                        <View style={[styles.iconCircle, { backgroundColor: 'rgba(57, 255, 20, 0.1)' }]}>
                            <Ionicons name="trending-down" size={32} color={LPColors.primary} />
                        </View>
                        <Text style={styles.cardTitle}>Gradual Reduction</Text>
                        <Text style={styles.cardDesc}>
                            Slowly reduce cigarettes over time. Best for heavy smokers.
                        </Text>
                        <View style={styles.benefitList}>
                            <Text style={styles.benefitItem}>• Less intense withdrawal</Text>
                            <Text style={styles.benefitItem}>• Build confidence slowly</Text>
                            <Text style={styles.benefitItem}>• Easier to start</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.selectButton, { backgroundColor: LPColors.primary }, isCreatingAccount && styles.buttonDisabled]}
                            onPress={() => handleSelectPlan('gradual')}
                            disabled={isCreatingAccount}
                        >
                            <Text style={[styles.selectButtonText, { color: '#000' }]}>
                                {isCreatingAccount ? 'Creating Account...' : 'Select Gradual'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Cancel button */}
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                        disabled={isCreatingAccount}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Questions screen
    const currentQuestion = QUESTIONS[currentStep];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header / Progress */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel} style={styles.backBtn}>
                    <Ionicons name="close" size={28} color={LPColors.text} />
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    backBtn: {
        padding: 8,
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
        minWidth: 35,
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
    buttonDisabled: {
        opacity: 0.5,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: LPColors.text,
        fontSize: 16,
        marginTop: 16,
        fontWeight: '500',
    },
    cancelButton: {
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        color: LPColors.textGray,
        fontSize: 16,
        fontWeight: '500',
    },
});
