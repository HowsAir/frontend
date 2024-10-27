/**
 * @file apiClient.test.ts
 * @brief Pruebas unitarias para las funciones del cliente API
 * @author Juan Diaz y Mario Luis
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

declare var global: any;
import * as apiClient from "../src/api/apiClient";
import { MeasurementData } from "../src/api/data";
import { LogInFormData, RegisterFormData } from "../src/types/mainTypes";


describe("obtenerMediciones", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal("console", { error: vi.fn() });
  });

  it("debería obtener mediciones correctamente", async () => {
    const mockMediciones: MeasurementData[] = [
      {
        _id: "1",
        fecha: new Date(),
        ppm: 400,
        temperatura: 25,
        latitud: 100.8,
        longitud: 45.1,
      },
      {
        _id: "2",
        fecha: new Date(),
        ppm: 410,
        temperatura: 26,
        latitud: 10.5,
        longitud: 10.7,
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMediciones),
    });

    const result = await apiClient.getMeasurements();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/measurements"),
      expect.any(Object)
    );
    expect(result).toEqual(mockMediciones);
  });

  it("debería manejar respuesta no exitosa", async () => {
    const errorMessage = "Error del servidor";
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage }),
    });

    await expect(apiClient.getMeasurements()).rejects.toThrow(
      apiClient.API_ERRORS.GET_MEASUREMENTS
    );
    expect(console.error).toHaveBeenCalled();
  });

  it("debería manejar errores del fetch", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Error de red"));

    await expect(apiClient.getMeasurements()).rejects.toThrow(
      apiClient.API_ERRORS.GET_MEASUREMENTS
    );
    expect(console.error).toHaveBeenCalled();
  });
});

describe("API Client Tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal("console", { error: vi.fn() });
  });

  // Prueba de la función register
  describe("register", () => {
    it("debería registrar al usuario correctamente", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
      });

      const registerData: RegisterFormData = {
        name: "Mario",
        surnames: "Falso",
        email: "mariofalso@example.com",
        password: "password123",
        confirmPassword: "password123",
        phone: "123456789",
        country: "Spain",
        city: "Valencia",
        address: "Calle Falsa 123",
        postalCode: "46001",
        terms: true
      };

      await expect(apiClient.register(registerData)).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/users"),
        expect.any(Object)
      );
    });

    it("debería manejar respuesta no exitosa en registro", async () => {
      const errorMessage = "Error al registrar usuario";
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      const registerData: RegisterFormData = {
        name: "Mario",
        surnames: "Falso",
        email: "mariofalso@example.com",
        password: "password123",
        confirmPassword: "password123",
        phone: "123456789",
        country: "Spain",
        city: "Valencia",
        address: "Calle Falsa 123",
        postalCode: "46001",
        terms: true
      };

      await expect(apiClient.register(registerData)).rejects.toThrow(
        apiClient.API_ERRORS.REGISTER_USER
      );
      expect(console.error).toHaveBeenCalled();
    });
  });

  // Prueba de la función login
  describe("login", () => {
    it("debería iniciar sesión correctamente", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
      });

      const loginData: LogInFormData = {
        email: "juan@example.com",
        password: "password123",
      };

      await expect(apiClient.login(loginData)).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/login"),
        expect.any(Object)
      );
    });

    it("debería manejar respuesta no exitosa en inicio de sesión", async () => {
      const errorMessage = "Credenciales incorrectas";
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      const loginData: LogInFormData = {
        email: "juan@example.com",
        password: "password123",
      };

      await expect(apiClient.login(loginData)).rejects.toThrow(
        apiClient.API_ERRORS.LOGIN_USER
      );
      expect(console.error).toHaveBeenCalled();
    });
  });

  // Prueba de la función createCheckoutSession
  describe("createCheckoutSession", () => {
    it("debería crear una sesión de pago correctamente", async () => {
      const mockSessionId = "session_id_123";
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: mockSessionId }),
      });

      const amount = 5000;

      const result = await apiClient.createCheckoutSession(amount);
      expect(result).toEqual(mockSessionId);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/checkout"),
        expect.any(Object)
      );
    });

    it("debería manejar respuesta no exitosa en creación de sesión de pago", async () => {
      const errorMessage = "Error en la creación de la sesión de pago";
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      const amount = 5000;

      await expect(apiClient.createCheckoutSession(amount)).rejects.toThrow(
        apiClient.API_ERRORS.CREATE_CHECKOUT_SESSION
      );
      expect(console.error).toHaveBeenCalled();
    });
  });

  // Prueba de la función validateToken
  describe("validateToken", () => {
    it("debería validar el token correctamente", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(),
      });

      await expect(apiClient.validateToken()).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/validate"),
        expect.any(Object)
      );
    });

    it("debería manejar respuesta no exitosa en validación de token", async () => {
      const errorMessage = "Token inválido";
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      await expect(apiClient.validateToken()).rejects.toThrow("Error validating token");
      expect(console.error).toHaveBeenCalled();
    });
  });

  // Prueba de la función logout
  describe("logout", () => {
    it("debería cerrar sesión correctamente", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
      });

      await expect(apiClient.logout()).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/logout"),
        expect.any(Object)
      );
    });

    it("debería manejar respuesta no exitosa en cierre de sesión", async () => {
      const errorMessage = "Error durante el cierre de sesión";
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      await expect(apiClient.logout()).rejects.toThrow("Error loggin out");
      expect(console.error).toHaveBeenCalled();
    });
  });
});
