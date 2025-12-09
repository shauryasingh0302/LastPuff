import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { LPColors } from '../../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { useGoals } from '../../context/GoalsContext';
import { useSteps } from '../../context/StepsContext';
import { LPHaptics } from '../../services/haptics';

const { width } = Dimensions.get('window');

const AnimatedBtn = ({ children, onPress, style, disabled }: any) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        if (disabled) return;
        LPHaptics.light();
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        if (disabled) return;
        scale.value = withSpring(1);
    };

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} disabled={disabled}>
            <Animated.View style={[style, animatedStyle]}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

export default function FitnessHomeScreen() {
    const auth: any = useContext(AuthContext);
    const router = useRouter();
    const userName = auth?.user?.name || 'Athlete';
    const { goals = [], toggleGoalCompletion, fitnessLevel = 'beginner', waterIntake = 5, streak = 1 } = useGoals() || {};
    const { currentSteps = 0, caloriesBurnt = 0, distanceTraveled = 0, isTracking = false } = useSteps() || {};


    const [showBMIModal, setShowBMIModal] = useState(false);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState('');

    // Sports Training States
    const [sportInput, setSportInput] = useState('');
    const [loadingSportGoals, setLoadingSportGoals] = useState(false);
    const [sportGoals, setSportGoals] = useState<any[]>([]);
    const [sportError, setSportError] = useState('');


    useEffect(() => {
        const loadBMI = async () => {
            try {
                const savedBMI = await AsyncStorage.getItem('@saved_bmi');
                const savedHeight = await AsyncStorage.getItem('@saved_height');
                const savedWeight = await AsyncStorage.getItem('@saved_weight');
                if (savedBMI) setBmi(parseFloat(savedBMI));
                if (savedHeight) setHeight(savedHeight);
                if (savedWeight) setWeight(savedWeight);
                if (savedBMI) {
                    const bmiVal = parseFloat(savedBMI);
                    setBmiCategory(getBMICategory(bmiVal));
                }
            } catch (error) {
                console.error('Failed to load BMI', error);
            }
        };
        loadBMI();
    }, []);

    const getBMICategory = (bmiValue: number): string => {
        if (bmiValue < 18.5) return 'Underweight';
        if (bmiValue < 25) return 'Normal';
        if (bmiValue < 30) return 'Overweight';
        return 'Obese';
    };

    const getBMIColor = (bmiValue: number | null): string => {
        if (!bmiValue) return LPColors.textGray;
        if (bmiValue < 18.5) return '#3B82F6';
        if (bmiValue < 25) return LPColors.primary;
        if (bmiValue < 30) return '#F59E0B';
        return '#EF4444';
    };

    const calculateBMI = async () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (!h || !w || h <= 0 || w <= 0) return;


        const heightInMeters = h / 100;
        const calculatedBMI = w / (heightInMeters * heightInMeters);
        const roundedBMI = Math.round(calculatedBMI * 10) / 10;

        setBmi(roundedBMI);
        setBmiCategory(getBMICategory(roundedBMI));


        await AsyncStorage.setItem('@saved_bmi', roundedBMI.toString());
        await AsyncStorage.setItem('@saved_height', height);
        await AsyncStorage.setItem('@saved_weight', weight);

        LPHaptics.success();
        setShowBMIModal(false);
    };

    const handleGoalPress = (goalId: number) => {
        const goal = goals.find((g) => g.id === goalId);
        if (!goal || goal.completed) return;

        LPHaptics.success();
        toggleGoalCompletion(goalId);
    };

    const generateSportGoals = async () => {
        if (!sportInput.trim()) {
            setSportError('Please enter a sport name');
            return;
        }

        setLoadingSportGoals(true);
        setSportError('');
        LPHaptics.light();

        try {
            console.log('[SportGoals] Fetching training for:', sportInput);
            // Import the BASE_URL from services/api.ts or construct it dynamically
            const LOCAL_IP = "192.168.22.157";
            const BASE_URL = Platform.OS === "android" ? `http://${LOCAL_IP}:5000` : "http://localhost:5000";
            
            const response = await fetch(`${BASE_URL}/ai-coach/generate-training`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sport: sportInput.trim() }),
            });

            console.log('[SportGoals] Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('[SportGoals] HTTP Error:', response.status, errorText);
                setSportError(`Server error: ${response.status}`);
                LPHaptics.error();
                return;
            }
            
            const data = await response.json();
            console.log('[SportGoals] Response data:', JSON.stringify(data, null, 2));

            if (data.success && data.programs && data.programs.length > 0) {
                const program = data.programs[0];
                console.log('[SportGoals] Using program:', program.title);
                console.log('[SportGoals] Program exercises:', program.exercises);
                
                const goals = program.exercises.map((exercise: string, index: number) => ({
                    id: Date.now() + index,
                    text: exercise,
                    icon: program.icon,
                    completed: false
                }));
                
                console.log('[SportGoals] Generated goals:', JSON.stringify(goals, null, 2));
                setSportGoals(goals);
                setSportInput(''); // Clear input after success
                LPHaptics.success();
            } else {
                console.error('[SportGoals] Invalid response structure:', data);
                setSportError(data.message || 'Failed to generate training goals. Please try again.');
                LPHaptics.error();
            }
        } catch (err: any) {
            console.error('[SportGoals] Error:', err);
            console.error('[SportGoals] Error details:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            
            if (err.message.includes('Network request failed')) {
                setSportError('Cannot connect to server. Make sure backend is running.');
            } else if (err.message.includes('timeout')) {
                setSportError('Request timed out. Please try again.');
            } else {
                setSportError(`Error: ${err.message || 'Failed to connect to server'}`);
            }
            LPHaptics.error();
        } finally {
            setLoadingSportGoals(false);
        }
    };

    const handleSportGoalPress = (goalId: number) => {
        setSportGoals(prev => prev.map(g => 
            g.id === goalId ? { ...g, completed: !g.completed } : g
        ));
        LPHaptics.success();
    };


    const puffCoins = 0;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" />

            <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Let's get moving,</Text>
                    <Text style={styles.headerTitle}>{userName}</Text>
                </View>
                <View style={styles.headerIcons}>
                    <View style={styles.coinsBadge}>
                        <Ionicons name="logo-bitcoin" size={16} color="#FFD700" />
                        <Text style={styles.coinsText}>{puffCoins}</Text>
                    </View>
                </View>
            </Animated.View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.topStatsContainer}>
                    <LinearGradient
                        colors={[LPColors.primary, '#004d2c']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.statsCard}
                    >
                        <View>
                            <Text style={styles.statsLabel}>Steps Today</Text>
                            <Text style={styles.statsValue}>
                                {currentSteps.toLocaleString()}
                            </Text>
                            <Text style={styles.statsSubLabel}>Target: 10,000 steps</Text>
                        </View>

                        <View style={styles.moneyContainer}>
                            <View style={styles.moneyIcon}>
                                <Ionicons name="flame" size={20} color={LPColors.primary} />
                            </View>
                            <View>
                                <Text style={styles.moneyLabel}>Burned</Text>
                                <Text style={styles.moneyValue}>
                                    {caloriesBurnt} kcal
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.gridContainer}>
                    <View style={[styles.gridCard, styles.streakCard]}>
                        <View style={styles.streakContent}>
                            <View style={styles.streakCircleContainer}>
                                <Svg width="60" height="60">
                                    <Circle cx="30" cy="30" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                                    <Circle cx="30" cy="30" r="26" stroke={LPColors.primary} strokeWidth="4" fill="none" strokeDasharray={`${(streak / 30) * 163} 163`} strokeLinecap="round" />
                                </Svg>
                                <Text style={styles.streakNum}>{streak}</Text>
                            </View>
                            <View style={styles.streakTextContainer}>
                                <View style={styles.streakTitleRow}>
                                    <Text style={styles.gridTitle}>Day Streak</Text>
                                    <Ionicons name="flame" size={18} color={LPColors.primary} />
                                </View>
                                <Text style={styles.gridSub}>Consistency is key!</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.gridCard, { flex: 1 }]}>
                        <View style={styles.healthStats}>
                            <View style={styles.healthItem}>
                                <Text style={styles.healthVal}>{waterIntake}</Text>
                                <Text style={styles.healthLabel}>Water (gls)</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.healthItem}>
                                <Ionicons name={fitnessLevel === 'advanced' ? "barbell" : fitnessLevel === 'intermediate' ? "fitness" : "walk"} size={20} color={LPColors.primary} />
                                <Text style={styles.healthLabel}>{fitnessLevel ? fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1) : 'Beginner'}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.sectionContainer}>
                    <Link href="/goals" asChild>
                        <TouchableOpacity style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Daily Wellness Goals</Text>
                            <Text style={styles.sectionLink}>View All</Text>
                        </TouchableOpacity>
                    </Link>

                    <View style={styles.goalsContainer}>
                        {goals.map((goal) => (
                            <AnimatedBtn
                                key={goal.id}
                                onPress={() => handleGoalPress(goal.id)}
                                disabled={goal.completed}
                                style={[styles.goalRow, goal.completed && styles.goalCompleted]}
                            >
                                <View style={[styles.checkBox, goal.completed && styles.checkBoxChecked]}>
                                    {goal.completed && <Ionicons name="checkmark" size={12} color="#000" />}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.goalText, goal.completed && styles.goalTextCompleted]}>{goal.text}</Text>
                                </View>
                                {goal.icon && (
                                    <Ionicons name={goal.icon as any} size={16} color={goal.completed ? LPColors.textGray : LPColors.primary} style={{ marginLeft: 8 }} />
                                )}
                            </AnimatedBtn>
                        ))}
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(550).duration(500)} style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Ionicons name="trophy" size={20} color={LPColors.primary} />
                            <Text style={styles.sectionTitle}>Sports Training Goals</Text>
                        </View>
                    </View>

                    <View style={styles.sportInputCard}>
                        <Text style={styles.sportInputLabel}>Enter Your Sport</Text>
                        <View style={styles.sportInputContainer}>
                            <Ionicons name="search" size={20} color={LPColors.textGray} style={{ marginRight: 12 }} />
                            <TextInput
                                style={styles.sportInput}
                                placeholder="e.g., Football, Basketball, Tennis..."
                                placeholderTextColor={LPColors.textGray}
                                value={sportInput}
                                onChangeText={setSportInput}
                                onSubmitEditing={generateSportGoals}
                                returnKeyType="search"
                            />
                        </View>

                        <AnimatedBtn
                            onPress={generateSportGoals}
                            disabled={loadingSportGoals}
                            style={styles.generateSportBtn}
                        >
                            <LinearGradient
                                colors={[LPColors.primary, '#004d2c']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.generateSportBtnGradient}
                            >
                                {loadingSportGoals ? (
                                    <ActivityIndicator color="#000" size="small" />
                                ) : (
                                    <>
                                        <Ionicons name="sparkles" size={18} color="#000" style={{ marginRight: 8 }} />
                                        <Text style={styles.generateSportBtnText}>Generate Training Goals</Text>
                                    </>
                                )}
                            </LinearGradient>
                        </AnimatedBtn>

                        {sportError ? (
                            <View style={styles.sportErrorContainer}>
                                <Ionicons name="alert-circle" size={16} color="#FF3B30" />
                                <Text style={styles.sportErrorText}>{sportError}</Text>
                            </View>
                        ) : null}
                    </View>

                    {sportGoals.length > 0 && (
                        <View style={styles.goalsContainer}>
                            {sportGoals.map((goal) => (
                                <AnimatedBtn
                                    key={goal.id}
                                    onPress={() => handleSportGoalPress(goal.id)}
                                    disabled={goal.completed}
                                    style={[styles.goalRow, goal.completed && styles.goalCompleted]}
                                >
                                    <View style={[styles.checkBox, goal.completed && styles.checkBoxChecked]}>
                                        {goal.completed && <Ionicons name="checkmark" size={12} color="#000" />}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.goalText, goal.completed && styles.goalTextCompleted]}>{goal.text}</Text>
                                    </View>
                                    {goal.icon && (
                                        <Ionicons name={goal.icon as any} size={16} color={goal.completed ? LPColors.textGray : LPColors.primary} style={{ marginLeft: 8 }} />
                                    )}
                                </AnimatedBtn>
                            ))}
                        </View>
                    )}
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Mind & Body</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gamesRow}>
                        <AnimatedBtn onPress={() => router.push('/games/breathing')} style={styles.gameCard}>
                            <View style={[styles.gameIcon, { backgroundColor: 'rgba(57, 255, 20, 0.1)' }]}>
                                <Ionicons name="fitness" size={24} color={LPColors.primary} />
                            </View>
                            <Text style={styles.gameName}>Breathing</Text>
                        </AnimatedBtn>

                        <AnimatedBtn onPress={() => router.push('/games/memory-game')} style={styles.gameCard}>
                            <View style={[styles.gameIcon, { backgroundColor: 'rgba(236, 72, 153, 0.1)' }]}>
                                <Ionicons name="albums" size={24} color="#EC4899" />
                            </View>
                            <Text style={styles.gameName}>Memory</Text>
                        </AnimatedBtn>

                        <AnimatedBtn onPress={() => { }} style={styles.gameCard}>
                            <View style={[styles.gameIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                                <Ionicons name="musical-notes" size={24} color="#3B82F6" />
                            </View>
                            <Text style={styles.gameName}>Meditation</Text>
                        </AnimatedBtn>
                    </ScrollView>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(700).duration(500)} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>BMI Calculator</Text>
                    <TouchableOpacity onPress={() => setShowBMIModal(true)} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#1E3A5F', '#2563EB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.bmiCard}
                        >
                            <View style={styles.bmiHeader}>
                                <View>
                                    <Text style={styles.bmiTitle}>Check your BMI</Text>
                                    <Text style={styles.bmiSubtitle}>Track your body mass index</Text>
                                </View>
                                <View style={styles.bmiIconContainer}>
                                    <Ionicons name="body" size={24} color="#FFF" />
                                </View>
                            </View>

                            {bmi ? (
                                <View style={styles.bmiResultContainer}>
                                    <View>
                                        <Text style={styles.bmiLabel}>Your BMI</Text>
                                        <Text style={styles.bmiValue}>{bmi}</Text>
                                    </View>
                                    <View style={[styles.bmiBadge, { backgroundColor: getBMIColor(bmi) }]}>
                                        <Text style={styles.bmiBadgeText}>{bmiCategory}</Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.calculateButton}>
                                    <Text style={styles.calculateButtonText}>Calculate Now</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#FFF" />
                                </View>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showBMIModal}
                onRequestClose={() => setShowBMIModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>BMI Calculator</Text>
                            <TouchableOpacity onPress={() => setShowBMIModal(false)}>
                                <Ionicons name="close" size={24} color={LPColors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Height (cm)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="175"
                                placeholderTextColor={LPColors.textGray}
                                keyboardType="numeric"
                                value={height}
                                onChangeText={setHeight}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Weight (kg)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="70"
                                placeholderTextColor={LPColors.textGray}
                                keyboardType="numeric"
                                value={weight}
                                onChangeText={setWeight}
                            />
                        </View>

                        <AnimatedBtn onPress={calculateBMI} style={styles.calculateActionBtn}>
                            <LinearGradient
                                colors={[LPColors.primary, '#004d2c']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.calculateActionGradient}
                            >
                                <Text style={styles.calculateActionText}>Calculate BMI</Text>
                            </LinearGradient>
                        </AnimatedBtn>

                        <View style={styles.bmiInfo}>
                            <Text style={styles.bmiInfoTitle}>BMI Categories:</Text>
                            <View style={styles.bmiLegend}>
                                <View style={styles.bmiLegendItem}>
                                    <View style={[styles.bmiColorDot, { backgroundColor: '#3B82F6' }]} />
                                    <Text style={styles.bmiRangeText}>Underweight (&lt; 18.5)</Text>
                                </View>
                                <View style={styles.bmiLegendItem}>
                                    <View style={[styles.bmiColorDot, { backgroundColor: LPColors.primary }]} />
                                    <Text style={styles.bmiRangeText}>Normal (18.5 - 24.9)</Text>
                                </View>
                                <View style={styles.bmiLegendItem}>
                                    <View style={[styles.bmiColorDot, { backgroundColor: '#F59E0B' }]} />
                                    <Text style={styles.bmiRangeText}>Overweight (25 - 29.9)</Text>
                                </View>
                                <View style={styles.bmiLegendItem}>
                                    <View style={[styles.bmiColorDot, { backgroundColor: '#EF4444' }]} />
                                    <Text style={styles.bmiRangeText}>Obese (&ge; 30)</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    greeting: {
        fontSize: 14,
        color: LPColors.textGray,
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: LPColors.text,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    coinsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)',
        gap: 6,
    },
    coinsText: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 14,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    topStatsContainer: {
        marginBottom: 20,
    },
    statsCard: {
        padding: 20,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 4,
    },
    statsValue: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statsSubLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
    },
    moneyContainer: {
        alignItems: 'flex-end',
        gap: 8,
    },
    moneyIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        textAlign: 'right',
    },
    moneyValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
        height: 100,
    },
    gridCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 16,
        height: 100,
    },
    streakCard: {
        flex: 1.2,
        justifyContent: 'center',
    },
    streakContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakCircleContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    streakNum: {
        position: 'absolute',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    streakTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    streakTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    gridTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    gridSub: {
        color: LPColors.textGray,
        fontSize: 12,
    },
    healthStats: {
        flex: 1,
        justifyContent: 'space-around',
    },
    healthItem: {
        alignItems: 'center',
    },
    healthVal: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    healthLabel: {
        color: LPColors.textGray,
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#2C2C2E',
        marginVertical: 8,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionLink: {
        color: LPColors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    goalsContainer: {
        gap: 12,
    },
    goalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    goalCompleted: {
        borderColor: 'rgba(127, 255, 0, 0.1)',
        backgroundColor: 'rgba(127, 255, 0, 0.05)',
    },
    checkBox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#3A3A3C',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBoxChecked: {
        backgroundColor: LPColors.primary,
        borderColor: LPColors.primary,
    },
    goalText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '500',
    },
    goalTextCompleted: {
        color: LPColors.textGray,
        textDecorationLine: 'line-through',
    },
    gamesRow: {
        gap: 12,
    },
    gameCard: {
        backgroundColor: '#1C1C1E',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        width: 100,
    },
    gameIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    gameName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    bmiCard: {
        padding: 20,
        borderRadius: 20,
    },
    bmiHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    bmiTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    bmiSubtitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
    },
    bmiIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calculateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
    },
    calculateButtonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14,
    },
    bmiResultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    bmiLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginBottom: 2,
    },
    bmiValue: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    bmiBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    bmiBadgeText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#1C1C1E',
        borderRadius: 24,
        padding: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        color: LPColors.textGray,
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#2C2C2E',
        borderRadius: 12,
        padding: 16,
        color: '#FFF',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#3A3A3C',
    },
    calculateActionBtn: {
        marginTop: 8,
        marginBottom: 24,
    },
    calculateActionGradient: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    calculateActionText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bmiInfo: {
        borderTopWidth: 1,
        borderTopColor: '#2C2C2E',
        paddingTop: 20,
    },
    bmiInfoTitle: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    bmiLegend: {
        gap: 10,
    },
    bmiLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bmiColorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    bmiRangeText: {
        fontSize: 13,
        color: LPColors.textGray,
    },

    sportInputCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    sportInputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: LPColors.text,
        marginBottom: 12,
    },
    sportInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C2C2E',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    sportInput: {
        flex: 1,
        color: LPColors.text,
        fontSize: 15,
    },
    generateSportBtn: {
        marginBottom: 12,
    },
    generateSportBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    generateSportBtnText: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    sportErrorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    sportErrorText: {
        color: '#FF3B30',
        fontSize: 12,
    },
});
