import User from "../models/User.js";
import dayjs from "dayjs";

// ===================== DASHBOARD SUMMARY =====================
export const getDashboardSummary = async (req, res) => {
  try {
    // req.user only contains: { id: userId }
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = dayjs().format("YYYY-MM-DD");

    const todayStats =
      user.dailyStats?.find((stat) => stat.date === today) || {
        cigarettesAvoided: 0,
        moneySaved: 0,
        goalsCompleted: 0,
      };

    return res.status(200).json({
      success: true,
      name: user.name,
      streak: user.streak || 0,
      puffCoins: user.puffCoins || 0,
      totalRelapses: user.totalRelapses || 0,
      todayStats,
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Server error fetching dashboard summary" });
  }
};

// ===================== GOAL PROGRESS UPDATE =====================
export const updateGoalProgress = async (req, res) => {
  try {
    const { goalsCompletedToday } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = dayjs().format("YYYY-MM-DD");

    const existingDay = user.dailyStats.find((stat) => stat.date === today);

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

    // streak update
    if (goalsCompletedToday >= 5) {
      if (user.lastStreakUpdateDate !== today) {
        user.streak = (user.streak || 0) + 1;
        user.lastStreakUpdateDate = today;
        user.puffCoins = (user.puffCoins || 0) + 2;
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
