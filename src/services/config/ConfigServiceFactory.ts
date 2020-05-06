import IConfigService from 'services/config/IConfigService';
import ConfigService from 'services/config/ConfigService';

export const createConfigService = (nodeEnv: string, root?: string): IConfigService =>
  new ConfigService(root || '', nodeEnv);
