export type ColorType = keyof typeof import("@/lib/constants").COLORS

export interface GoalType {
  id: number
  title: string
  type: "big" | "medium" | "small"
  boardId: number
  color: ColorType
  isNew?: boolean
}

export interface BoardType {
  id: number
  title: string
  type: "big" | "medium" | "small"
  color: ColorType
  parentGoalId?: number
}

