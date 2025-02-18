export type ColorType = {
  name: string;
  value: string;
};

export type Goal = {
  id: number
  title: string
  description?: string
  type: 'todo' | 'in-progress' | 'done'
  status: string
  color: string
  user_id: string
  created_at?: string
  updated_at?: string
} 