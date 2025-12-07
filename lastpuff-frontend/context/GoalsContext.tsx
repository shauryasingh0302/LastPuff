import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Goal {
    id: number;
    text: string;
    completed: boolean;
    icon?: string;
    isCustom?: boolean;
}

export type PlanType = 'cold-turkey' | 'gradual' | null;

interface GoalsContextType {
    goals: Goal[];
    plan: PlanType;
    setPlan: (plan: PlanType) => void;
    addGoal: (goal: Omit<Goal, 'id'>) => void;
    deleteGoal: (id: number) => void;
    toggleGoalCompletion: (id: number) => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const COLD_TURKEY_GOALS: Omit<Goal, 'id'>[] = [
    { text: "Strictly 0 cigarettes today", completed: false, icon: "ban-outline" },
    { text: "Drink 8 glasses of water", completed: false, icon: "water-outline" },
    { text: "Practice 10 min mindfulness", completed: false, icon: "infinite" },
    { text: "Throw away lighters/ashtrays", completed: false, icon: "trash-outline" },
    { text: "Identify 3 triggers avoided", completed: false, icon: "eye" },
];

const GRADUAL_GOALS: Omit<Goal, 'id'>[] = [
    { text: "Smoke 2 fewer cigarettes", completed: false, icon: "trending-down" },
    { text: "Delay first smoke by 60m", completed: false, icon: "time-outline" },
    { text: "Drink water before smoking", completed: false, icon: "water-outline" },
    { text: "Leave lighter at home", completed: false, icon: "key-outline" },
    { text: "Track every cigarette", completed: false, icon: "pencil-outline" },
];

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
    const [plan, setPlanState] = useState<PlanType>(null);
    const [goals, setGoals] = useState<Goal[]>([
        { id: 1, text: "Avoid 10 cigarettes", completed: false, icon: "ban-outline" },
        { id: 2, text: "Save ₹200 today", completed: false, icon: "wallet-outline" },
        { id: 3, text: "Play 1 focus game", completed: false, icon: "game-controller-outline" },
        { id: 4, text: "Walk 10 minutes", completed: false, icon: "walk-outline" },
        { id: 5, text: "Drink 3 glasses of water", completed: false, icon: "water-outline" },
    ]);

    const setPlan = (newPlan: PlanType) => {
        setPlanState(newPlan);
        const defaults = newPlan === 'cold-turkey' ? COLD_TURKEY_GOALS : GRADUAL_GOALS;
        setGoals(defaults.map((g, i) => ({ ...g, id: i + 1 })));
    };

    const addGoal = (newGoal: Omit<Goal, 'id'>) => {
        const id = Math.max(0, ...goals.map(g => g.id)) + 1;
        setGoals([...goals, { ...newGoal, id }]);
    };

    const deleteGoal = (id: number) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const toggleGoalCompletion = (id: number) => {
        setGoals(goals.map(g =>
            g.id === id ? { ...g, completed: true } : g
        ));
    };

    return (
        <GoalsContext.Provider value={{ goals, plan, setPlan, addGoal, deleteGoal, toggleGoalCompletion }}>
            {children}
        </GoalsContext.Provider>
    );
};

export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (!context) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
};
