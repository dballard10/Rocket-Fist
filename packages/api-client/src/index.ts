/**
 * @rocket-fist/api-client
 * Shared API client for Rocket Fist frontends
 */

// Core client
export { api, configureApiClient, getApiConfig } from "./client.js";
export type { ApiClientConfig } from "./client.js";

// Endpoints
export * from "./endpoints/gyms.js";
export * from "./endpoints/members.js";
export * from "./endpoints/classes.js";
export * from "./endpoints/schedule.js";

