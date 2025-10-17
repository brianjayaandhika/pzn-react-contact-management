import { httpJson, httpJsonAuth } from "../http/client";
import { WebResponse } from "../http/http.types";
import type {
  LoginData,
  LoginRequest,
  RegisterRequest,
  User,
} from "./user.types";

export async function UserRegister(
  request: RegisterRequest
): Promise<WebResponse<"OK">> {
  return httpJson("/api/users", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function UserLogin(
  request: LoginRequest
): Promise<WebResponse<LoginData>> {
  const result: any = httpJson("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  });

  console.log(result);
  return result;
}

export async function GetCurrentUser(): Promise<WebResponse<User>> {
  return httpJsonAuth("/api/users/current", { method: "GET" });
}

export async function UpdateCurrentUser(
  payload: Partial<User> & { password?: string }
): Promise<WebResponse<User>> {
  return httpJsonAuth("/api/users/current", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function UserLogout(): Promise<WebResponse<"OK">> {
  return httpJsonAuth("/api/auth/logout", { method: "DELETE" });
}
