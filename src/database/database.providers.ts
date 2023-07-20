import * as mongoose from 'mongoose';
import configurationConfig from 'src/config/configuration.config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `${configurationConfig().connectionString}/${
          configurationConfig().database
        }`,
      ),
  },
];
