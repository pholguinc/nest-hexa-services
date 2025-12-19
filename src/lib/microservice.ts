import fs from "fs";
import path from "path";
import kleur from "kleur";
import { spawnPromise, ensureNestCli } from "./file-utils";
import { generateConfig } from "./config";

export async function createMicroserviceProject(
  name: string,
  targetPath: string,
  subTipo: string,
  transportType: "NATS" | "TCP" = "NATS"
) {
  const nestCliReady = await ensureNestCli();
  if (!nestCliReady) {
    process.exit(1);
  }

  console.log(`🚀 Creando proyecto NestJS (${subTipo}) en: ${targetPath}`);

  const code = await spawnPromise("nest", ["new", name, "--skip-install"], {
    cwd: process.cwd(),
  });
  if (code !== 0) throw new Error("Error al crear proyecto");

  console.log(kleur.green().bold(`✅ Proyecto creado en ${targetPath}`));

  await spawnPromise(
    "pnpm",
    ["add", "@nestjs/microservices", "joi", "dotenv"],
    { cwd: targetPath }
  );

  const appModulePath = path.join(targetPath, "src", "app.module.ts");
  fs.writeFileSync(
    appModulePath,
    `import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
`,
    "utf-8"
  );

  ["app.controller.ts", "app.service.ts", "app.controller.spec.ts"].forEach(
    (f) => {
      const filePath = path.join(targetPath, "src", f);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  );

  // Crear main.ts según tipo de transport
  const mainPath = path.join(targetPath, "src", "main.ts");
  let transportCode = "";

  if (transportType === "NATS") {
    transportCode = `
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: { servers: envs.natsServers },
  });
`;
  } else if (transportType === "TCP") {
    transportCode = `
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 3001 },
  });
`;
  }

  fs.writeFileSync(
    mainPath,
    `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { envs } from './config/envs';

async function bootstrap() {${transportCode}
  await app.listen();
}
bootstrap();
`,
    "utf-8"
  );

  generateConfig(targetPath, transportType);

  console.log(
    kleur
      .yellow()
      .bold(`🧹 Microservicio con ${transportType} y carpeta config lista.`)
  );
}


export async function createMicroserviceApiGatewayProject(
  name: string,
  targetPath: string,
  subTipo: string,
  transportType: "NATS" | "TCP" = "NATS"
) {
  const nestCliReady = await ensureNestCli();
  if (!nestCliReady) {
    process.exit(1);
  }

  console.log(`🚀 Creando proyecto NestJS (${subTipo}) en: ${targetPath}`);

  const code = await spawnPromise("nest", ["new", name], {
    cwd: process.cwd(),
  });
  if (code !== 0) throw new Error("Error al crear proyecto");

  console.log(kleur.green().bold(`✅ Proyecto creado en ${targetPath}`));

  await spawnPromise("pnpm", ["add", "joi", "dotenv"], { cwd: targetPath });

  generateConfig(targetPath, transportType);

  console.log(
    kleur
      .yellow()
      .bold(`🧹 API Gateway con ${transportType} y carpeta config lista.`)
  );
}
