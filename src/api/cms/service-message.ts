import { cmsApiGet } from './host';

export const getServiceMessages = (params: Record<string, unknown> = {}) =>
  cmsApiGet('/api/service-messages', params);
