import axios from "axios";

// Centralized base URL so it only has to change in one place (e.g. when
// moving from local dev to a deployed backend). Override it with a
// VITE_API_BASE_URL env variable if needed.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// A dedicated axios instance keeps headers/timeouts consistent for every
// request this app makes, and makes it easy to add interceptors later
// (auth tokens, logging, etc.) without touching call sites.
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Sends both names to the backend.
 *
 * @param {{ person1: string, person2: string }} payload
 * @returns {Promise<object>} the backend's response data
 * @throws {Error} a user-friendly error message on failure
 */
export async function submitNames(payload) {
  try {
    const response = await apiClient.post("/api/names", payload);
    return response.data;
  } catch (error) {
    // Normalize different failure shapes (network error, timeout, server
    // error response) into one friendly message the UI can just display.
    if (error.response) {
      // Server responded with a non-2xx status.
      const serverMessage = error.response.data?.message;
      throw new Error(
        serverMessage || `Request failed (status ${error.response.status}).`
      );
    } else if (error.request) {
      // Request was made but no response was received.
      throw new Error(
        "Couldn't reach the server. Please check your connection and try again."
      );
    } else {
      throw new Error("Something went wrong while submitting. Please try again.");
    }
  }
}

export default apiClient;
