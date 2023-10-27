import { Config, ENV } from '@common/infrastructure/configurations/index.config'
import { Inject, Injectable } from '@nestjs/common'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'

@Injectable()
export class DatabaseConfigService implements MongooseOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.DATABASE_URI
    }
  }
}
