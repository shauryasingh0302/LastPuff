# ⚠️ URGENT: Fitness Page Corrupted - Recovery Guide

## Problem:
The `app/fitness/index.tsx` file got corrupted during editing. The `generateSportGoals` function is incomplete and the file structure is broken.

## Quick Fix:

The file needs to be restored. Here are your options:

### Option 1: Restore from Git (Recommended)
```bash
cd lastpuff-frontend
git checkout app/fitness/index.tsx
```

Then manually re-add the sports training feature using the guide below.

### Option 2: Manual Fix

The file is missing the complete `generateSportGoals` function. Here's what needs to be added after line 132 (`handleGoalPress` function):

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
        console.log('[SportGoals] Fetching training for:', sportInput);
        const response = await fetch('http://localhost:5000/ai-coach/generate-training', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sport: sportInput.trim() }),
        });

        console.log('[SportGoals] Response status:', response.status);
        const data = await response.json();
        console.log('[SportGoals] Response data:', data);

        if (data.success && data.programs && data.programs.length > 0) {
            const program = data.programs[0];
            console.log('[SportGoals] Using program:', program.title);
            
            const goals = program.exercises.map((exercise: string, index: number) => ({
                id: Date.now() + index,
                text: exercise,
                icon: program.icon,
                completed: false
            }));
            
            console.log('[SportGoals] Generated', goals.length, 'goals');
            setSportGoals(goals);
            LPHaptics.success();
        } else {
            console.error('[SportGoals] Invalid response:', data);
            setSportError(data.message || 'Failed to generate training goals');
            LPHaptics.error();
        }
    } catch (err: any) {
        console.error('[SportGoals] Error:', err);
        setSportError(`Error: ${err.message || 'Failed to connect to server'}`);
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

Also add `ActivityIndicator` to the imports on line 7:
```typescript
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
```

## What Went Wrong:
- The file replacement tool corrupted the function structure
- Missing function definitions
- JSX got mixed with function code

## Recommendation:
**Restore the file from git and I'll help you add the sports training feature properly in smaller, safer steps.**

Would you like me to help you restore it?
