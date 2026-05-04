import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { useUbicacion } from '@/src/ubicacion/hooks/useUbicacion';
import * as Location from 'expo-location';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
  Accuracy: { High: 'high' },
}));

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(React, 'useEffect').mockImplementation(() => {});


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
      coords: { latitude: -34.6037, longitude: -58.3816 },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      {
        city: 'Buenos Aires',
        country: 'Argentina',
      },
    ]);

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.ciudad).toBe('Buenos Aires, Argentina');
    expect(result.current.error).toBeNull();
  });

  it('debería usar fallback "Ciudad" si no hay city/subregion', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 0, longitude: 0 },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      { country: 'Argentina' },
    ]);

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.loading).toBe(false);
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
    expect(result.current.error).toBe('Permiso de ubicación denegado');
  });

  it('debería manejar error GPS', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue(
      new Error('Error de GPS')
    );

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error de GPS');
  });

  it('debería manejar cuando no hay placemarks', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 0, longitude: 0 },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useUbicacion());

    await act(async () => {
      await result.current.refrescarUbicacion();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('No se pudo detectar la ciudad');
  });
});