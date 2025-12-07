/**
 * Global Theme System (Light + Dark)
 * + LastPuff Custom Theme Colors
 */

import { Platform, Appearance } from "react-native";

const tintColorLight = "#39FF14";
const tintColorDark = "#39FF14";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#ffffff",
    tint: tintColorLight,
    icon: "#687076",
    card: "#f4f4f4",
  },
  dark: {
    text: "#ECEDEE",
    background: "#000000",
    tint: tintColorDark,
    icon: "#9BA1A6",
    card: "#111111",
  },
};

/**
 * LASTPUFF GLOBAL COLOR PALETTE
 * Always available — ignores system theme.
 */
export const LPColors = {
  // Core Interface
  bg: "#040B07",        // Very deep dark green (almost black)
  surface: "#0D1F16",   // Dark green for cards
  surfaceLight: "#162E23", // Lighter green for elevated surfaces

  // Accents
  primary: "#39FF14",   // High-vis neon green
  secondary: "#00CF85", // Teal/Mint accent

  // Text
  text: "#FFFFFF",
  textGray: "#A0AEC0",
  textMuted: "#6B7280",

  // States
  border: "#1F382A",
  success: "#39FF14",
  error: "#FF453A",
  warning: "#FFD60A",

  // Legacy mappings for backward compatibility
  neon: "#39FF14",
  card: "#0D1F16",
  gray: "#A0AEC0",
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
