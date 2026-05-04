import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useDias } from '@/src/dias';
import * as servicioClima from '@/src/servicios/servicioClima';
import * as useUbicacionModule from '@/src/ubicacion/hooks/useUbicacion';
import { ClimaDia } from '@/src/tipos/clima';

jest.mock('@/src/ubicacion/hooks/useUbicacion');
jest.mock('@/src/servicios/servicioClima');

const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('useDias', () => {
  const mockCiudad = 'Villa Lugano, Buenos Aires';
  const mockDiasCon2: ClimaDia[] = [
    { fecha: '03/05', condicion: 'Soleado', codigoCondicion: 1000, icono: '//icon', temp: 25, min: 20, max: 30, humedad: 60, presion: 1013, viento: 15, chanceLluvia: 10 },
    { fecha: '03/05', condicion: 'Lluvia', codigoCondicion: 1183, icono: '//icon', temp: 22, min: 18, max: 25, humedad: 80, presion: 1010, viento: 20, chanceLluvia: 70 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
    
    (useUbicacionModule.useUbicacion as jest.Mock).mockReturnValue({
      ciudad: mockCiudad,
      loading: false,
      error: null,
      refrescarUbicacion: jest.fn(),
    });

    (servicioClima.ServicioObtenerClimaPorCiudad as jest.Mock).mockResolvedValue({
      dias: mockDiasCon2,
    });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('debería inicializar correctamente', () => {
    const { result } = renderHook(() => useDias());
    expect(result.current.loading).toBe(true);
    expect(result.current.diaActual).toBe(1);
    expect(result.current.ciudad).toBe(mockCiudad);
  });

  it('debería navegar al día anterior', async () => {
    const { result } = renderHook(() => useDias());

    await act(async () => {
      await result.current.refrescar();
    });

    act(() => {
      result.current.navegarAnterior();
    });

    expect(result.current.diaActual).toBe(0);
  });

  it('debería navegar al día siguiente', async () => {
    const { result } = renderHook(() => useDias());

    await act(async () => {
      await result.current.refrescar();
    });

    act(() => {
      result.current.navegarSiguiente();
    });

    expect(result.current.diaActual).toBe(1);
  });

  it('debería respetar límites de navegación', async () => {
    const { result } = renderHook(() => useDias());

    await act(async () => {
      await result.current.refrescar();
    });

    act(() => result.current.navegarAnterior());
    expect(result.current.diaActual).toBe(0);
    
    act(() => result.current.navegarAnterior());
    expect(result.current.diaActual).toBe(0);

    act(() => result.current.navegarSiguiente());
    expect(result.current.diaActual).toBe(1);
    
    act(() => result.current.navegarSiguiente());
    expect(result.current.diaActual).toBe(1);
  });
});