import mongoose from "mongoose";

const dailyStatsSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  cigarettesAvoided: { type: Number, default: 0 },
  moneySaved: { type: Number, default: 0 },
  goalsCompleted: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    age: { type: Number },
    heightCm: { type: Number },
    weightKg: { type: Number },

    // For now planType = A; later ML can change this
    plan: { type: String, enum: ["gradual", "aggressive", "A"], default: "A" },

    // Dashboard / progress fields
    streak: { type: Number, default: 0 },                // total "perfect goal" days
    lastStreakUpdateDate: { type: String, default: null }, // last date streak incremented

    puffCoins: { type: Number, default: 0 },             // gamified currency
    totalRelapses: { type: Number, default: 0 },         // for SOS later

    dailyStats: [dailyStatsSchema],                      // per-day stats
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
