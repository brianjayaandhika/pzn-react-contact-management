import type { WebResponse } from "@/lib/api/http/http.types";
import type { CreateTaskRequest, Task } from "./task.types";
import { httpJsonAuth } from "../http/client";

export async function CreateTask(
  payload: CreateTaskRequest
): Promise<WebResponse<Task>> {
  return httpJsonAuth("/api/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function GetAllTask(): Promise<WebResponse<Task[]>> {
  return httpJsonAuth("/api/tasks", {
    method: "GET",
  });
}

export async function GetTask(taskId?: string): Promise<WebResponse<Task>> {
  return httpJsonAuth(`/api/tasks/${taskId}`, {
    method: "GET",
  });
}
