import * as path from "path";
import { createStructure } from "./file-utils";
import { getMonolitoHexagonalStructure, getMonolitoStructure } from './structures';
import fs from 'fs';

export async function createMonolith(
  name: string,
  typeStructure: string,
  targetPath: string
) {
  const single = name.endsWith("s") ? name.slice(0, -1) : name;

  // Carpeta base del módulo: src/modules/<nombre>
  const projectRoot = process.cwd();
  const moduleBasePath = path.join(projectRoot, "src", "modules", name);
  if (!fs.existsSync(moduleBasePath))
    fs.mkdirSync(moduleBasePath, { recursive: true });


  // Obtener la estructura
  let structure: Record<string, any> = {};
  if (typeStructure === "capas") {
    structure = getMonolitoStructure(name, single);
  } else {
    structure = getMonolitoHexagonalStructure(name, single, "hexagonal");
  }

  // Crear la estructura directamente dentro de src/modules/<nombre>
  createStructure(moduleBasePath, structure);

  console.log(`✅ Monolito ${typeStructure} generado en ${moduleBasePath}`);
}

