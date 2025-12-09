# 🏅 Sports Training Goals - Fitness Page Integration

## What to Add to `app/fitness/index.tsx`:

### 1. Add State Variables (after line 59):

```typescript
// Sports Training States
const [sportInput, setSportInput] = useState('');
const [loadingSportGoals, setLoadingSportGoals] = useState(false);
const [sportGoals, setSportGoals] = useState<any[]>([]);
const [sportError, setSportError] = useState('');
```

### 2. Add Generate Function (after line 126):

```typescript
const generateSportGoals = async () => {
    if (!sportInput.trim()) {
        setSportError('Please enter a sport name');
        return;
    }

    setLoadingSportGoals(true);
    setSportError('');
    LPHaptics.light();

    try {
        const response = await fetch('http://192.168.1.7:5000/ai-coach/generate-training', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sport: sportInput.trim() }),
        });

        const data = await response.json();

        if (data.success && data.programs && data.programs.length > 0) {
            // Convert first program's exercises to goal format
            const program = data.programs[0]; // Use beginner program
            const goals = program.exercises.map((exercise: string, index: number) => ({
                id: Date.now() + index,
                text: exercise,
                icon: program.icon,
                completed: false
            }));
            
            setSportGoals(goals);
            LPHaptics.success();
        } else {
            setSportError('Failed to generate training goals');
            LPHaptics.error();
        }
    } catch (err) {
        console.error('Sport goals error:', err);
        setSportError('Failed to connect to server');
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
```

### 3. Add UI Section (after line 239, after Daily Wellness Goals section):

```typescript
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
```

### 4. Add Styles (at the end of StyleSheet.create, before closing }):

```typescript
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
```

### 5. Add Import (at top, line 7):

```typescript
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
```

---

## 📍 Where to Insert:

1. **States**: After line 59 (after `setBmiCategory` state)
2. **Functions**: After line 126 (after `handleGoalPress` function)
3. **UI**: After line 239 (after Daily Wellness Goals `</Animated.View>`)
4. **Styles**: Before line 651 (before the closing `});` of StyleSheet)
5. **Import**: Update line 7 to include `ActivityIndicator`

---

## 🎯 How It Works:

1. User enters a sport name (e.g., "Football")
2. Taps "Generate Training Goals"
3. AI generates training program
4. First program's exercises are shown as checkable goals
5. User can check off completed exercises
6. Goals display with sport-specific icons

---

## ✨ Features:

- ✅ Sport input with search icon
- ✅ Generate button with loading state
- ✅ Error handling
- ✅ AI-generated training goals
- ✅ Checkable goals (like daily goals)
- ✅ Sport-specific icons
- ✅ Haptic feedback
- ✅ Smooth animations

---

Would you like me to create the complete updated file, or would you prefer to add these sections manually?
