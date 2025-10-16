function getBase(): string {
  // If your env already includes '/api', leave it. Otherwise this keeps '/api' per spec.
  const base = import.meta.env.VITE_API_PATH || "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function getToken(): string | null {
  // Accept either raw token or JSON stringified token
  const raw = localStorage.getItem("token");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : raw;
  } catch {
    return raw;
  }
}

export async function httpJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${getBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  // some endpoints may return 204 with no body
  if (res.status === 204) return undefined as unknown as T;

  const text = await res.text();
  const json = text ? (JSON.parse(text) as T) : ({} as T);

  if (!res.ok) {
    // let caller inspect the same envelope (has `errors`)
    return json;
  }

  return json;
}

export async function httpJsonAuth<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const token = getToken();
  return httpJson<T>(path, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      "X-API-TOKEN": token ? token : "",
    },
  });
}
