import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    age: { type: Number },
    heightCm: { type: Number },
    weightKg: { type: Number },

    plan: { type: String, enum: ["gradual", "aggressive"], default: "gradual" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
