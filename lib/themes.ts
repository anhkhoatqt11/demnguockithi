// ==================================================
// THEME & ACCENT COLOR CONFIGURATION
// ==================================================

export interface ThemeOption {
  id: string
  name: string
  gradient: string
  mode: "light" | "dark"
}

export interface BackgroundSettings {
  imageUrl: string
  size: "cover" | "contain" | "auto"
  position: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  repeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y"
}

// Accent color definitions with mode-aware shades
export interface AccentColor {
  id: string
  name: string
  main: string
  dark: { text: string; bg: string; border: string; solid: string; solidHover: string }
  light: { text: string; bg: string; border: string; solid: string; solidHover: string }
}

export const accentColors: AccentColor[] = [
  {
    id: "amber",
    name: "Hổ Phách",
    main: "#f59e0b",
    dark: { text: "#fbbf24", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.25)", solid: "#f59e0b", solidHover: "#d97706" },
    light: { text: "#b45309", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", solid: "#f59e0b", solidHover: "#d97706" },
  },
  {
    id: "blue",
    name: "Xanh Dương",
    main: "#3b82f6",
    dark: { text: "#60a5fa", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.25)", solid: "#3b82f6", solidHover: "#2563eb" },
    light: { text: "#1d4ed8", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)", solid: "#3b82f6", solidHover: "#2563eb" },
  },
  {
    id: "emerald",
    name: "Xanh Ngọc",
    main: "#10b981",
    dark: { text: "#34d399", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.25)", solid: "#10b981", solidHover: "#059669" },
    light: { text: "#047857", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", solid: "#10b981", solidHover: "#059669" },
  },
  {
    id: "rose",
    name: "Hồng",
    main: "#f43f5e",
    dark: { text: "#fb7185", bg: "rgba(244,63,94,0.15)", border: "rgba(244,63,94,0.25)", solid: "#f43f5e", solidHover: "#e11d48" },
    light: { text: "#be123c", bg: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.2)", solid: "#f43f5e", solidHover: "#e11d48" },
  },
  {
    id: "violet",
    name: "Tím",
    main: "#8b5cf6",
    dark: { text: "#a78bfa", bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.25)", solid: "#8b5cf6", solidHover: "#7c3aed" },
    light: { text: "#6d28d9", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)", solid: "#8b5cf6", solidHover: "#7c3aed" },
  },
  {
    id: "orange",
    name: "Cam",
    main: "#f97316",
    dark: { text: "#fb923c", bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.25)", solid: "#f97316", solidHover: "#ea580c" },
    light: { text: "#c2410c", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)", solid: "#f97316", solidHover: "#ea580c" },
  },
]

// Theme options: light themes first (user prefers light)
export const themeOptions: ThemeOption[] = [
  // --- LIGHT THEMES ---
  { id: "light-warm", name: "Ban Mai Ấm Áp", gradient: "linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fefce8 100%)", mode: "light" },
  { id: "light-sky", name: "Trời Trong Xanh", gradient: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #ecfeff 100%)", mode: "light" },
  { id: "light-sage", name: "Lá Xanh Nhẹ", gradient: "linear-gradient(135deg, #d1fae5 0%, #ecfdf5 50%, #f0fdf4 100%)", mode: "light" },
  { id: "light-lavender", name: "Oải Hương Nhẹ", gradient: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 50%, #faf5ff 100%)", mode: "light" },
  { id: "light-peach", name: "Đào Phấn", gradient: "linear-gradient(135deg, #ffe4e6 0%, #fff1f2 50%, #fef2f2 100%)", mode: "light" },
  { id: "light-clean", name: "Trắng Tinh Khiết", gradient: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #ffffff 100%)", mode: "light" },
  // --- DARK THEMES ---
  { id: "midnight-calm", name: "Đêm Tĩnh Lặng", gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%)", mode: "dark" },
  { id: "ocean-deep", name: "Đại Dương Sâu", gradient: "linear-gradient(135deg, #0c1222 0%, #1a2744 50%, #0f3460 100%)", mode: "dark" },
  { id: "forest-night", name: "Rừng Đêm", gradient: "linear-gradient(135deg, #0a1612 0%, #1a2f23 50%, #132e1e 100%)", mode: "dark" },
  { id: "warm-ember", name: "Than Hồng Ấm", gradient: "linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1c1412 100%)", mode: "dark" },
]

export const DEFAULT_THEME = "light-warm"
export const DEFAULT_ACCENT = "amber"

// Map old theme IDs to new ones for returning users
export const themeIdMigration: Record<string, string> = {
  "elegant-green": "midnight-calm",
  "ocean-blue": "ocean-deep",
  "sunset-orange": "warm-ember",
  "purple-dream": "midnight-calm",
  "forest-green": "forest-night",
  "night-sky": "ocean-deep",
}

// Helper: get accent shades for current mode
export function getAccentShades(accentId: string, mode: "light" | "dark") {
  const accent = accentColors.find(a => a.id === accentId) || accentColors[0]
  return mode === "dark" ? accent.dark : accent.light
}

// Helper: get theme by ID
export function getThemeById(id: string): ThemeOption {
  return themeOptions.find(t => t.id === id) || themeOptions[0]
}

// Helper: detect if an image is light or dark (returns promise)
export function detectImageBrightness(imageUrl: string): Promise<"light" | "dark"> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) { resolve("dark"); return }

      const sampleSize = 50
      canvas.width = sampleSize
      canvas.height = sampleSize
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize)

      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize)
      const data = imageData.data
      let totalBrightness = 0
      const pixelCount = data.length / 4

      for (let i = 0; i < data.length; i += 4) {
        totalBrightness += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114)
      }

      const avgBrightness = totalBrightness / pixelCount
      resolve(avgBrightness > 140 ? "light" : "dark")
    }
    img.onerror = () => resolve("dark")
    img.src = imageUrl
  })
}
