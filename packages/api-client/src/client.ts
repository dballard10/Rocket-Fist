/**
 * @rocket-fist/api-client
 * Core HTTP client for Rocket Fist backend API
 */

/**
 * Configuration for the API client
 */
export interface ApiClientConfig {
  baseUrl: string;
  defaultGymId?: string;
  headers?: Record<string, string>;
}

/**
 * Default configuration - can be overridden when importing
 */
let config: ApiClientConfig = {
  baseUrl: "http://localhost:4000/api",
  defaultGymId: "00000000-0000-0000-0000-000000000000",
};

/**
 * Configure the API client
 */
export function configureApiClient(newConfig: Partial<ApiClientConfig>): void {
  config = { ...config, ...newConfig };
}

/**
 * Get the current API configuration
 */
export function getApiConfig(): ApiClientConfig {
  return { ...config };
}

/**
 * Core request function
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${config.baseUrl}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(config.headers || {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    // Ignore JSON parse errors for empty responses
  }

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && "error" in data
        ? (data as { error: string }).error
        : `Request failed with status ${response.status}`) as string;
    throw new Error(message);
  }

  return data as T;
}

/**
 * HTTP methods
 */
export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...(options || {}), method: "GET" }),

  post: <T, B = unknown>(path: string, body: B, options?: RequestInit) =>
    request<T>(path, {
      ...(options || {}),
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T, B = unknown>(path: string, body: B, options?: RequestInit) =>
    request<T>(path, {
      ...(options || {}),
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T, B = unknown>(path: string, body: B, options?: RequestInit) =>
    request<T>(path, {
      ...(options || {}),
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...(options || {}), method: "DELETE" }),
} as const;

