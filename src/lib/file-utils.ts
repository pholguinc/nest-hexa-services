import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export function createStructure(
  basePath: string,
  structure: Record<string, any>
) {
  for (const name in structure) {
    const route = path.join(basePath, name);

    if (typeof structure[name] === "object") {
      if (!fs.existsSync(route)) fs.mkdirSync(route, { recursive: true }); 
      createStructure(route, structure[name]);
    } else {
      fs.writeFileSync(route, structure[name]);
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

export function injectModuleIntoApp(moduleName: string, single: string) {
  const appModulePath = path.join(process.cwd(), "src", "app.module.ts");
  let content = fs.readFileSync(appModulePath, "utf-8");

  const pascalModule = `${toPascalCase(moduleName)}Module`;
  const importLine = `import { ${pascalModule} } from './modules/${moduleName}/infrastructure/config/${single}.module';`;

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

export function spawnPromise(
  cmd: string,
  args: string[],
  opts: any = {}
): Promise<number> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts });
    child.on("exit", (code) => resolve(code ?? 1));
  });
}
