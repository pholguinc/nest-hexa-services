import fs from "fs";
import path from "path";
import kleur from "kleur";

export function generateConfig(targetPath: string, transport: "NATS" | "TCP") {
  const configPath = path.join(targetPath, "src", "config");
  fs.mkdirSync(configPath, { recursive: true });

  let envsContent = "";
  let envFileContent = "";

  if (transport === "NATS") {
    envsContent = `
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'TU_TOKEN_SECRET',
  NATS_SERVERS: process.env.NATS_SERVERS?.split(',') || ['nats://localhost:4222'],
});

if (error) {
    throw new Error(\`Config validation error: \${error.message}\`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  natsServers: envVars.NATS_SERVERS,
  jwtSecret: envVars.JWT_SECRET,
};
`;
    envFileContent = `PORT=3000
DATABASE_URL=
JWT_SECRET=TU_TOKEN_SECRET
NATS_SERVERS=nats://localhost:4222
`;
  } else {
    envsContent = `
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  TCP_SERVER: string;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    TCP_SERVER: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  TCP_SERVER: process.env.TCP_SERVER || '127.0.0.1:4000',
  JWT_SECRET: process.env.JWT_SECRET || 'TU_TOKEN_SECRET',
});

if (error) {
    throw new Error(\`Config validation error: \${error.message}\`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  tcpServer: envVars.TCP_SERVER,
  jwtSecret: envVars.JWT_SECRET,
};
`;

    envFileContent = `PORT=3000
DATABASE_URL=
JWT_SECRET=TU_TOKEN_SECRET
TCP_SERVER=127.0.0.1:4000
`;
  }

  fs.writeFileSync(path.join(configPath, "envs.ts"), envsContent, "utf-8");

  fs.writeFileSync(
    path.join(configPath, "services.ts"),
    transport === "NATS"
      ? `export const NATS_SERVICE = 'NATS_SERVICE';`
      : `export const TCP_SERVICE = 'TCP_SERVICE';`,
    "utf-8"
  );

  fs.writeFileSync(
    path.join(configPath, "index.ts"),
    `export * from './envs';\nexport * from './services';`,
    "utf-8"
  );

  fs.writeFileSync(path.join(targetPath, ".env"), envFileContent, "utf-8");

  console.log(
    kleur
      .green()
      .bold(
        `✅ Config generada para transporte: ${transport} (incluyendo .env)`
      )
  );
}
