import User from "../models/User.js";
import dayjs from "dayjs";

export const getDashboardSummary = async (req, res) => {
  try {
    const user = req.user;

    const today = dayjs().format("YYYY-MM-DD");

    const todayStats = user.dailyStats.find(stat => stat.date === today) || {
      cigarettesAvoided: 0,
      moneySaved: 0,
      goalsCompleted: 0,
    };

    return res.status(200).json({
      success: true,
      name: user.name,
      streak: user.streak,
      puffCoins: user.puffCoins,
      totalRelapses: user.totalRelapses,
      todayStats,
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Server error fetching dashboard summary" });
  }
};


export const updateGoalProgress = async (req, res) => {
  try {
    const user = req.user;
    const { goalsCompletedToday } = req.body;

    const today = dayjs().format("YYYY-MM-DD");

    // Check existing day entry
    const existingDay = user.dailyStats.find(stat => stat.date === today);

    if (existingDay) {
      existingDay.goalsCompleted = goalsCompletedToday;
    } else {
      user.dailyStats.push({
        date: today,
        goalsCompleted: goalsCompletedToday,
        cigarettesAvoided: 0,
        moneySaved: 0,
      });
    }

    if (goalsCompletedToday >= 5) {
      if (user.lastStreakUpdateDate !== today) {
        user.streak += 1;
        user.lastStreakUpdateDate = today;
        user.puffCoins += 2; 
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      streak: user.streak,
      puffCoins: user.puffCoins,
    });

  } catch (err) {
    console.error("Update goals error:", err);
    res.status(500).json({ message: "Server error updating goal progress" });
  }
};
