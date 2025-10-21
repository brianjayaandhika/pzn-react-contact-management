import type { WebResponse } from "@/lib/api/http/http.types";
import type { CreateTaskRequest, Task, UpdateTaskRequest } from "./task.types";
import { httpJsonAuth } from "../http/client";

export async function CreateTask(
  payload: CreateTaskRequest
): Promise<WebResponse<Task>> {
  return httpJsonAuth("/api/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function GetAllTask(
  param: Record<string, string>
): Promise<WebResponse<Task[]>> {
  return httpJsonAuth(
    "/api/tasks",
    {
      method: "GET",
    },
    param
  );
}

export async function GetTask(taskId?: string): Promise<WebResponse<Task>> {
  return httpJsonAuth(`/api/tasks/${taskId}`, {
    method: "GET",
  });
}

export async function UpdateTask(
  taskId: string,
  payload: UpdateTaskRequest
): Promise<WebResponse<Task>> {
  return httpJsonAuth(`/api/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function DeleteTask(
  taskId?: string
): Promise<WebResponse<string>> {
  return httpJsonAuth(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
}
