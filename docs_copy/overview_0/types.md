# 主要な型定義概要 (overview_0/types.md)

このドキュメントは、AI Driven Todo アプリケーションで使用される主要な型定義の概要を提供します。`frontend/types`以下により詳細な情報が定義されています。

## チェックリスト

*   [x] 主要な型 (User, Todo, KanbanConfig) の定義
*   [x] インターフェースと型エイリアスの使い分けの説明 (必要に応じて)
*   [x] 詳細な型定義ファイルへのリンク

## 主要な型定義

```typescript
// frontend/types/index.d.ts (例)

// ユーザー
export interface User {
  id: number;
  email: string;
  username: string;
  avatar_url: string | null;
}

// Todo
export interface Todo {
  id: number;
  user_id: number;
  title: string;
  status: "todo" | "in_progress" | "done";
  checkboxes: string; // 例: "[{\"label\": \"サブタスク1\", \"checked\": false}, {\"label\": \"サブタスク2\", \"checked\": true}]"
}

// カンバン設定
export interface KanbanConfig {
    id: number;
    user_id: number;
    config: string; // JSON形式で、列の順序や表示設定などを格納
}

// APIレスポンスの型 (例)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}