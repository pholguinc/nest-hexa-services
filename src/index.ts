#!/usr/bin/env bun
import * as p from "@clack/prompts";
import path from "path";
import { createMicroserviceProject } from "./lib/microservice";
import { createMonolith } from "./lib/monolith";

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error(
      "❌ Debes pasar el nombre del módulo/directorio. Ej: nestmod users"
    );
    process.exit(1);
  }

  const moduleDir = args[0].toLowerCase();
  const targetPath = path.join(process.cwd(), moduleDir);

  const tipoSelection = await p.select({
    message: "What type of module do you want to generate?",
    options: [
      { value: "monolito", label: "Monolith" },
      { value: "microservicio", label: "Microservice" },
    ],
  });

  if (p.isCancel(tipoSelection)) {
    console.log("❌ Operation cancelled");
    process.exit(0);
  }

  const tipo = tipoSelection as string;

  if (tipo === "microservicio") {
    const subTipoSelection = await p.select({
      message: "What type of microservice do you want to build?",
      options: [
        { value: "microservice", label: "Microservice Module" },
        { value: "api-gateway", label: "API Gateway" },
      ],
    });

    if (p.isCancel(subTipoSelection)) {
      console.log("❌ Operation cancelled");
      process.exit(0);
    }

    const subTipo = subTipoSelection as string;

    if (subTipo === "api-gateway") {
      await createMicroserviceProject(
        moduleDir,
        targetPath,
        subTipo,
      );
      return;
    }

    let transportType: "NATS" | "TCP" = "NATS";
    if (subTipo === "microservice") {
      const transportSelection = await p.select({
        message: "Select the type of transport:",
        options: [
          { value: "NATS", label: "NATS" },
          { value: "TCP", label: "TCP" },
        ],
      });

      if (p.isCancel(transportSelection)) {
        console.log("❌ Operation cancelled");
        process.exit(0);
      }

      transportType = transportSelection as "NATS" | "TCP";
      await createMicroserviceProject(
        moduleDir,
        targetPath,
        subTipo,
        transportType
      );
    }

   
  } else {
    const typeStructureSelection = await p.select({
      message: "What type of architecture do you want to generate?",
      options: [
        { value: "capas", label: "Layered Architecture" },
        { value: "hexagonal", label: "Hexagonal Architecture" },
      ],
    });

    if (p.isCancel(typeStructureSelection)) {
      console.log("❌ Operation cancelled");
      process.exit(0);
    }

    const typeStructure = typeStructureSelection as string;
    await createMonolith(moduleDir, typeStructure, targetPath);
  }
}

main();
