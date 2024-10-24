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
  GET_MEASUREMENTS: "Error al obtener las mediciones",
  REGISTER_USER: "Error al registrar al usuario",
  CREATE_CHECKOUT_SESSION: "Error al crear la sesión de pago",
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

/**
 * @brief Initiates a Stripe checkout session with the provided line items
 * @author Juan Diaz
 *
 * @param {number} amount - The total amount for the checkout session
 * @returns {Promise<string>} - A promise that resolves with the id for the Stripe checkout session
 *
 * This function makes a POST request to the API to create a checkout session.
 * It expects the total amount of the purchase
 *
 * @throws Error - If the checkout session creation fails or the response is invalid
 */
export const createCheckoutSession = async (
  amount: number 
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/checkout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message || "Error creating checkout session");
    }

    const { id }: { id: string } = await response.json();
    return id; // Return the id for the Stripe checkout session
  } catch (error) {
    console.error("Error:", error);
    throw new Error(API_ERRORS.CREATE_CHECKOUT_SESSION);
  }
};

/**
 * @brief Validates the authentication token stored in cookies
 * @author Juan Diaz
 *
 * validateToken -> Promise<void>
 *
 * This function makes a GET request to the API to validate the user's authentication token.
 * It expects a valid token to be stored in the cookies, which will be sent along with the request.
 *
 * @throws Error - If the token is invalid or the request fails
 * @returns A promise that resolves when the token is successfully validated
 */
export const validateToken = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate`, {
      method: "GET",
      credentials: "include", // Cookie-based authentication
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message || "Token invalid");
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error validating token");
  }
};

/**
 * @brief Logs out the user by invalidating the current session token
 * @author Juan Diaz
 *
 * logout -> Promise<void>
 *
 * This function makes a POST request to the API to log out the user by invalidating their session.
 * The request uses cookie-based authentication.
 *
 * @throws Error - If the logout process fails or the request is invalid
 * @returns A promise that resolves when the user is successfully logged out
 */
export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include", // Cookie-based authentication
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      throw new Error(message || "Error during Logout");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error loggin out");
  }
};

