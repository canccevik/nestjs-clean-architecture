import { port, str } from 'envalid'
import { makeValidators, Static } from 'nestjs-envalid'

const config = {
  PORT: port({ default: 3001 }),
  GLOBAL_PREFIX: str({ default: 'api' }),
  APP_NAME: str(),
  APP_DESCRIPTION: str(),
  API_VERSION: str(),
  DATABASE_URI: str()
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
