import type { Paging } from "@/lib/api/http/http.types";
import { Dayjs } from "dayjs";

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

export enum TaskPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due: Dayjs;
  createdAt: Date;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due: Dayjs;
};

export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due?: Dayjs;
};

export type TaskSearchSuccess = {
  data: Task[];
  paging: Paging;
};
