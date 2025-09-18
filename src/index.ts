#!/usr/bin/env bun
import * as p from "@clack/prompts";
import { crearEstructura } from "./lib/file-utils";
import { getMonolitoHexagonalStructure, getMonolitoStructure } from "./lib/structures";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("❌ Debes pasar el nombre del módulo. Ej: nestmod users");
    process.exit(1);
  }

  const moduleName = (args[0] ?? "").toLowerCase();
  const singular = moduleName.endsWith("s")
    ? moduleName.slice(0, -1)
    : moduleName;

  const typeStructure = await p.select({
    message: "¿Qué tipo de arquitectura quieres generar?",
    options: [
      { value: "capas", label: "Arquitectura por Capas" },
      { value: "hexagonal", label: "Arquitectura Hexagonal" },
    ],
  });

  const tipo = await p.select({
    message: "¿Qué tipo de módulo quieres generar?",
    options: [
      { value: "monolito", label: "Monolito" },
      { value: "microservicio", label: "Microservicio" },
    ],
  });

  if (p.isCancel(tipo)) {
    console.log("❌ Operación cancelada");
    process.exit(0);
  }

  let estructura: Record<string, any> = {};

  if (tipo === "monolito") {
    if (typeStructure === "capas") {
      estructura = getMonolitoStructure(moduleName, singular);
    } else if (typeStructure === "hexagonal") {
      estructura = getMonolitoHexagonalStructure(moduleName, singular);
    }
  } else if (tipo === "microservicio") {
    const subTipo = await p.select({
      message: "¿Qué tipo de microservicio quieres generar?",
      options: [
        { value: "microservice", label: "Microservicio normal" },
        { value: "config", label: "Configuración / Config" },
        { value: "api-gateway", label: "API Gateway" },
      ],
    });

    if (p.isCancel(subTipo)) {
      console.log("❌ Operación cancelada");
      process.exit(0);
    }

    switch (subTipo) {
      case "microservice":
        console.log("🚀 Microservicio normal seleccionado");
        break;
      case "config":
        console.log("⚙️ Config seleccionado");
        break;
      case "api-gateway":
        console.log("🌐 API Gateway seleccionado");
        break;
    }
  }

  crearEstructura(process.cwd(), estructura);

  console.log(
    `✅ Módulo NestJS "${moduleName}" generado como ${tipo} con éxito!`
  );
}

main();
