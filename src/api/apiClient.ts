/**
 * @file apiClient.ts
 * @brief API client functions for interacting with the backend API
 * @author Juan Diaz
 */

import { MeasurementData } from "./data";
import { RegisterFormData } from "../types/mainTypes";


const NODE_ENV = import.meta.env.VITE_NODE_ENV || "development";
const API_BASE_URL = NODE_ENV === "development" ? "http://localhost:3000" : "";

export const API_ERRORS = {
  GET_MEASUREMENTS: "Failed to get measurements",
  REGISTER_USER: "Failed to register user",
  // Additional error messages for other functions can be added here
} as const;

/**
 * @brief Fetches all stored measurements from the API
 * @author Juan Diaz
 *
 * getMeasurements -> Promise<MeasurementData[]>
 *
 * This function makes a GET request to the API endpoint to retrieve
 * all stored measurements. It uses fetch to make the HTTP request and
 * handles both success and failure responses.
 *
 * @throws Error - If the request fails or the response is invalid
 * @returns A promise resolved with an array of MeasurementData objects
 */
export const getMeasurements = async (): Promise<MeasurementData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/measurements`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message || "Error fetching measurements");
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error(API_ERRORS.GET_MEASUREMENTS);
  }
};

/**
 * @brief Registers a new user with the provided registration data
 * @author Juan Diaz
 *
 * RegisterData: data -> register -> Promise<void>
 *
 * This function makes a POST request to the API to register a new user.
 * It expects the user's registration details such as name, email, and password.
 *
 * @throws Error - If the registration fails or the response is invalid
 * @param {RegisterData} data - The registration details for the user
 * @returns A promise that resolves when the registration is successful
 */
export const register = async (data: RegisterFormData): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message || "Error registering user");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error(API_ERRORS.REGISTER_USER);
  }
};