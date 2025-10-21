import type { Paging } from "@/lib/api/http/http.types";

export enum TaskStatus {
  ACTIVE = "active",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  BLOCKED = "blocked",
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: number;
  priorityLabel: string;
  due: Date;
  createdAt: Date;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: number;
  due: Date;
};

export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: number;
  due?: Date;
};

export type TaskSearchSuccess = {
  data: Task[];
  paging: Paging;
};
