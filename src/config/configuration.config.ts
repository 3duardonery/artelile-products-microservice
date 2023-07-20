import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  port: parseInt(process.env.PORT) || 3000,
  connectionString: process.env.CONNECTION,
}));
