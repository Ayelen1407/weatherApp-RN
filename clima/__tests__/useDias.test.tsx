import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useDias } from '@/src/dias';
import * as servicioClima from '@/src/servicios/servicioClima';
import * as useUbicacionModule from '@/src/ubicacion/hooks/useUbicacion';

jest.mock('@/src/ubicacion/hooks/useUbicacion');
jest.mock('@/src/servicios/servicioClima');

jest.useFakeTimers();

describe('useDias', () => {
  const mockCiudad = 'Villa Lugano, Buenos Aires';

  const mockDias = [
    { fecha: '02/05', condicion: 'Nublado', codigoCondicion: 1003, icono: '', temp: 20, min: 18, max: 22, humedad: 70, presion: 1012, viento: 10, chanceLluvia: 20 },
    { fecha: '03/05', condicion: 'Soleado', codigoCondicion: 1000, icono: '', temp: 25, min: 20, max: 30, humedad: 60, presion: 1013, viento: 15, chanceLluvia: 10 },
    { fecha: '04/05', condicion: 'Lluvia', codigoCondicion: 1183, icono: '', temp: 22, min: 18, max: 25, humedad: 80, presion: 1010, viento: 20, chanceLluvia: 70 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useUbicacionModule.useUbicacion as jest.Mock).mockReturnValue({
      ciudad: mockCiudad,
    });

    (servicioClima.ServicioObtenerClimaPorCiudad as jest.Mock).mockResolvedValue({
      dias: mockDias,
    });
  });

  it('debería inicializar correctamente', () => {
    const { result } = renderHook(() => useDias());

    expect(result.current.loading).toBe(true);
    expect(result.current.diaActual).toBe(1);
    expect(result.current.ciudad).toBe(mockCiudad);
  });

  it('debería cargar clima correctamente', async () => {
    const { result } = renderHook(() => useDias());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.climaDia).toEqual(mockDias[1]);
  });

  it('debería navegar al día anterior', async () => {
    const { result } = renderHook(() => useDias());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.navegarAnterior();
    });

    expect(result.current.diaActual).toBe(0);
  });

  it('debería navegar al día siguiente', async () => {
    const { result } = renderHook(() => useDias());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.navegarSiguiente();
    });

    expect(result.current.diaActual).toBe(2);
  });

  it('debería respetar límites de navegación', async () => {
    const { result } = renderHook(() => useDias());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.navegarAnterior());
    act(() => result.current.navegarAnterior());

    expect(result.current.diaActual).toBe(0);

    act(() => result.current.navegarSiguiente());
    act(() => result.current.navegarSiguiente());
    act(() => result.current.navegarSiguiente());

    expect(result.current.diaActual).toBe(2);
  });

  it('debería mapear métricas correctamente', async () => {
    const { result } = renderHook(() => useDias());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.metricas.humedad).toBe(mockDias[1].humedad);
    expect(result.current.metricas.presion).toBe(mockDias[1].presion);
  });

  it('debería manejar error del servicio', async () => {
    (servicioClima.ServicioObtenerClimaPorCiudad as jest.Mock)
      .mockRejectedValue(new Error('Error API'));

    const { result } = renderHook(() => useDias());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});