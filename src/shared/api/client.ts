import { z } from 'zod';
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api';
export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
/** A feature supplies its endpoint and response schema; the starter calls no endpoint by default. */
export async function apiRequest<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  const response = await fetch(baseUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, ''), {
    credentials: 'include',
    ...options,
    headers,
  });
  if (!response.ok) throw new ApiError(response.status, 'Permintaan belum dapat diproses.');
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(502, 'Format respons tidak valid.');
  }
  const result = schema.safeParse(data);
  if (!result.success) throw new ApiError(502, 'Respons tidak sesuai kontrak data.');
  return result.data;
}
