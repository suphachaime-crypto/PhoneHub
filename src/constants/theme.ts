export const COLORS = {
  primary: "#2563EB",
  secondary: "#3B82F6",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",

  background: "#F3F6FA",
  card: "#FFFFFF",

  text: "#111827",
  subText: "#6B7280",
  border: "#E5E7EB",
};

export const SHADOW = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 5,
};

// เพิ่มส่วนนี้
export const Fonts = {
  mono: "monospace",
};

export type ThemeColor = keyof typeof COLORS;