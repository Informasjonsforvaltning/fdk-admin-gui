import axios from 'axios';

import env from '../../env';

const { FDK_CMS_BASE_URI } = env;

interface CmsApiOptions {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, unknown>;
}

export const cmsApi = ({ path, method, params }: CmsApiOptions) =>
  axios({
    url: `${FDK_CMS_BASE_URI}${path}`,
    method,
    params: {
      ...params
    }
  })
    .then(({ data }) => data)
    .catch(() => ({}));

export const cmsApiGet = (path: string, params: Record<string, unknown> = {}) =>
  cmsApi({ path, method: 'GET', params });
