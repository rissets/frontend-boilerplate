import { appConfig } from '@/shared/config/app';
export const itemKeys = {
  all: (source: 'local' | 'http') => [appConfig.appId, 'example-items', source] as const,
};
