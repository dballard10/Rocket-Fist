/**
 * API client configuration and re-exports for the web app
 */

import { configureApiClient, getApiConfig, api } from "@rocket-fist/api-client";

// Configure API client with environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

const DEFAULT_GYM_ID =
  import.meta.env.VITE_DEFAULT_GYM_ID ?? "00000000-0000-0000-0000-000000000000";

// Initialize the API client with web app configuration
configureApiClient({
  baseUrl: API_BASE_URL,
  defaultGymId: DEFAULT_GYM_ID,
});

// Re-export everything from api-client for backwards compatibility
export { api, API_BASE_URL, DEFAULT_GYM_ID };

// Re-export all endpoints
export * from "@rocket-fist/api-client";
