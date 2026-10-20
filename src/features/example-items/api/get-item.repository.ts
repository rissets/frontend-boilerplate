import { z } from 'zod';
import { appConfig } from '@/shared/config/app';
import { createLocalItemRepository } from './local-item.repository';
import { httpItemRepository } from './http-item.repository';
const source = z.enum(['local', 'http']).parse(import.meta.env.VITE_EXAMPLE_DATA_SOURCE ?? 'local');
const storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
};
export const itemRepository =
  source === 'http'
    ? httpItemRepository
    : createLocalItemRepository(storage, appConfig.appId + ':example-items:v1');
