export interface PostgreConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface EnvConfig {
  postgre: PostgreConfig;
}

export default (): EnvConfig => ({
  postgre: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_EXTERNAL_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
  },
});
