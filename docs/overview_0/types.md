—
name: "docs/overview_0/types.md"
title: "主要な型定義概要 (Types)"
description: "AI Todo Management - GoalTypeやBoardTypeなど"
---

# 主要な型定義 (Types)

ここでは、**大目標・中目標・小目標**やカンバン構造を扱うための基本的な型定義を示します。フロントエンド/バックエンド共通の概念として利用可能です。


## 1. GoalType

```ts
export interface GoalType {
  id: number
  title: string
  type: "big" | "medium" | "small"
  boardId: number         // どのカンバン列に属するか (オプション)
  color: ColorType
  isNew?: boolean         // UI上の新規フラグなど
}
```

- id: 目標一意ID
- title: 目標のタイトル
- type: 'big'|'medium'|'small' で階層を示す
- boardId: カンバンの列と関連付ける場合に使用
- color: 目標カードの色
- isNew: UI上での一時フラグ


## 2. BoardType

```ts
export interface BoardType {
  id: number
  title: string
  type: "big" | "medium" | "small"
  color: ColorType
  parentGoalId?: number
}
```
- カンバン上の列やグループを表す想定。
- もし GoalType と同居させたい場合は省略も可能。


## 3. ColorType

```ts
export type ColorType =
  | "red"
  | "yellow"
  | "purple"
  | "blue"
  | "green"
  | "pink"
  | "gray"
```
付箋カラー。UIデザインに合わせて拡張可能。


## 4. 補足

- ユーザー認証に関する型は、Supabase Authや独自JWTかで差があるため、ここでは省略。
- 詳細なDBスキーマは database.md を参照してください。
- さらに詳しい設計は、docs/system_design_2/ 配下のドキュメント(例: sequences.md) をご覧ください。
