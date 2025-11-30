import User from "../models/User.js";
import dayjs from "dayjs";

// GET DASHBOARD SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const user = req.user;

    // Today's date formatted
    const today = dayjs().format("YYYY-MM-DD");

    // Find stats for today
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


// UPDATE GOAL PROGRESS
export const updateGoalProgress = async (req, res) => {
  try {
    const user = req.user;
    const { goalsCompletedToday } = req.body; // number passed from UI (1-5 goal toggles)

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

    // Handle streak logic — streak increases only if 5 goals done today
    if (goalsCompletedToday >= 5) {
      if (user.lastStreakUpdateDate !== today) {
        user.streak += 1;
        user.lastStreakUpdateDate = today;
        user.puffCoins += 2; // add coins
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
