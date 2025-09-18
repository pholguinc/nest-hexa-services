import fs from "fs";
import path from "path";

export function crearEstructura(
  basePath: string,
  estructura: Record<string, any>
) {
  for (const nombre in estructura) {
    const ruta = path.join(basePath, nombre);

    if (typeof estructura[nombre] === "object") {
      if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
      crearEstructura(ruta, estructura[nombre]);
    } else {
      fs.writeFileSync(ruta, estructura[nombre]);
    }
  }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function toPascalCase(str: string) {
  return str
    .split("-") 
    .map((s) => capitalize(s)) 
    .join("");
}
