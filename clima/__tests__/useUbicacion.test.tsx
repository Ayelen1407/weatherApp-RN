import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { useUbicacion } from '@/src/ubicacion/hooks/useUbicacion';

// ✅ Mock expo-location PRIMERO
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
}));

import * as Location from 'expo-location';

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('useUbicacion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería inicializar correctamente', () => {
    const { result } = renderHook(() => useUbicacion());
    expect(result.current.ciudad).toBe('Villa Lugano, Buenos Aires');
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('debería detectar ubicación exitosamente', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: -34.6037,
        longitude: -58.3816,
      },
    });

    // ✅ EXACTO como tu hook espera
    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      {
        city: 'Buenos Aires',
        subregion: 'Ciudad Autónoma de Buenos Aires',
        country: 'Argentina',
      },
    ]);

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    // ✅ Lo que tu hook construye: `${lugar.city || lugar.subregion || 'Ciudad'}, ${lugar.country}`
    expect(result.current.loading).toBe(false);
    expect(result.current.ciudad).toBe('Buenos Aires, Argentina');
    expect(result.current.error).toBeNull();
  });

  it('debería usar fallback si no hay ciudad/subregion', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 0, longitude: 0 },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      {
        // Sin city ni subregion
        country: 'Argentina',
      },
    ]);

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.ciudad).toBe('Ciudad, Argentina');
  });

  it('debería manejar permisos denegados', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.ciudad).toBe('Villa Lugano, Buenos Aires');
    expect(result.current.error).toBe('Permiso de ubicación denegado');
  });

  it('debería manejar error de getCurrentPositionAsync', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    // ✅ Error REAL que lanza expo-location
    (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue({
      message: 'Location request timed out',
    });

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.ciudad).toBe('Villa Lugano, Buenos Aires');
    expect(result.current.error).toContain('Location request timed out');
  });
});

