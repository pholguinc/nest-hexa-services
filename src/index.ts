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
    message: "¿Qué tipo de módulo quieres generar?",
    options: [
      { value: "monolito", label: "Monolito" },
      { value: "microservicio", label: "Microservicio" },
    ],
  });

  if (p.isCancel(tipoSelection)) {
    console.log("❌ Operación cancelada");
    process.exit(0);
  }

  const tipo = tipoSelection as string;

  if (tipo === "microservicio") {
    const subTipoSelection = await p.select({
      message: "¿Qué tipo de microservicio quieres generar?",
      options: [
        { value: "microservice", label: "Módulo de microservicio" },
        { value: "api-gateway", label: "API Gateway" },
      ],
    });

    if (p.isCancel(subTipoSelection)) {
      console.log("❌ Operación cancelada");
      process.exit(0);
    }

    const subTipo = subTipoSelection as string;

    if (subTipo === "api-gateway") {
      console.log("🚀 Has seleccionado API Gateway");
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
        message: "Selecciona el tipo de transporte:",
        options: [
          { value: "NATS", label: "NATS" },
          { value: "TCP", label: "TCP" },
        ],
      });

      if (p.isCancel(transportSelection)) {
        console.log("❌ Operación cancelada");
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
      message: "¿Qué tipo de arquitectura quieres generar?",
      options: [
        { value: "capas", label: "Arquitectura por Capas" },
        { value: "hexagonal", label: "Arquitectura Hexagonal" },
      ],
    });

    if (p.isCancel(typeStructureSelection)) {
      console.log("❌ Operación cancelada");
      process.exit(0);
    }

    const typeStructure = typeStructureSelection as string;
    await createMonolith(moduleDir, typeStructure, targetPath);
  }
}

main();
