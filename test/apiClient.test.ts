/**
 * @file apiClient.test.ts
 * @brief Pruebas unitarias para las funciones del cliente API
 * @author Juan Diaz
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import * as apiClient from "../src/api/apiClient";
import { MeasurementData } from "../src/api/data";

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
      expect.stringContaining("/api/v1/mediciones"),
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
