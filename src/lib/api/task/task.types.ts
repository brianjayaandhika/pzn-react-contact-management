import type { Paging } from "@/lib/api/http/http.types";

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

export enum TaskPriority {
  High = 1,
  Medium = 2,
  Low = 3,
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  priorityLabel: "High" | "Medium" | "Low";
  due: Date;
  createdAt: Date;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due: Date;
};

export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due?: Date;
};

export type TaskSearchSuccess = {
  data: Task[];
  paging: Paging;
};
