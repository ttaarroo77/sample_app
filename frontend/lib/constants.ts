export const COLORS = {
  red: "bg-red-50",
  yellow: "bg-yellow-50",
  purple: "bg-purple-50",
  blue: "bg-blue-50",
  green: "bg-green-50",
  pink: "bg-pink-50",
  gray: "bg-gray-50",
} as const

export const COLOR_PINS = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  pink: "bg-pink-500",
  gray: "bg-gray-500",
} as const

export const COLOR_OPTIONS: Array<keyof typeof COLORS> = ["red", "yellow", "purple", "blue", "green", "pink", "gray"]

export function getRandomColor(): keyof typeof COLORS {
  return COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)]
}

