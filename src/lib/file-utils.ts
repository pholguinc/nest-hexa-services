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

export function toPascalCase(str?: string): string {
  if (!str) return "";
  return (
    str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[-_]/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("")
  );
}


export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-") 
    .toLowerCase();
}

export function injectModuleIntoApp(moduleName: string, singular: string) {
  const appModulePath = path.join(process.cwd(), "src", "app.module.ts");
  let content = fs.readFileSync(appModulePath, "utf-8");

  const pascalModule = `${toPascalCase(moduleName)}Module`;
  const importLine = `import { ${pascalModule} } from './modules/${moduleName}/infrastructure/config/${singular}.module';`;

  if (!content.includes(importLine)) {
    content = importLine + "\n" + content;
  }

  content = content.replace(/imports:\s*\[([\s\S]*?)\]/, (match, inner) => {
    if (inner.includes(pascalModule)) return match;
    const updated =
      inner.trim().length > 0
        ? `${inner.trim()}, ${pascalModule}`
        : pascalModule;
    return `imports: [${updated}]`;
  });

  fs.writeFileSync(appModulePath, content, "utf-8");
}
