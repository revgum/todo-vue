export interface Todo {
  title: string;
  id: string;
  dueAt: string; // ISO datetime
  createdAt: string; // ISO datetime
  completedAt?: string; // ISO datetime
}
