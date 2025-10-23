import { validateEnv } from './utils/commons';

import { Environment } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    ENV: Environment.DEVELOPMENT,
    OIDC_ISSUER:
      'https://keycloak.staging.fellesdatakatalog.digdir.no/realms/fdk',
    FDK_BASE_URI: 'https://staging.fellesdatakatalog.digdir.no',
    FDK_HARVEST_ADMIN_HOST:
      'https://admin-api.staging.fellesdatakatalog.digdir.no',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ORGANIZATION_CATALOG_URI:
      'https://organization-catalog.staging.fellesdatakatalog.digdir.no',
    FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no',
    USE_DEMO_LOGO: false
  }
);
