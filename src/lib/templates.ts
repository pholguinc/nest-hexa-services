import { camelCase, capitalize, toKebabCase, toPascalCase } from "./file-utils";
export function nestControllerTemplate(
  moduleName: string,
  single: string,
  tipo: "monolito" | "hexagonal"
) {
  const className = `${toPascalCase(moduleName)}Controller`;

  if (tipo === "hexagonal") {
    return `import { Controller } from '@nestjs/common';

@Controller('${moduleName}')
export class ${className} {
  constructor() {}
}
`;
  } else {
    const serviceName = `${capitalize(single)}Service`;
    return `import { Controller } from '@nestjs/common';
import { ${serviceName} } from './${moduleName}.service';

@Controller('${moduleName}')
export class ${className} {
  constructor(private readonly ${camelCase(serviceName)}: ${serviceName}) {}
}
`;
  }
}

export function nestRepositoryTemplate(moduleName: string) {
  const className = `${toPascalCase(moduleName)}Repository`;
  return `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${className} {
  constructor() {}
}
`;
}

export function nestServiceTemplate(moduleName: string, single: string) {
  const className = `${capitalize(single)}Service`;
  const repositoryClassName = `${capitalize(moduleName)}Repository`;
  const repositoryPropName = `${camelCase(moduleName)}Repository`;

  return `import { Injectable } from '@nestjs/common';
import { ${repositoryClassName} } from '../repositories/${moduleName}.repository';

@Injectable()
export class ${className} {
  constructor(private readonly ${repositoryPropName}: ${repositoryClassName}) {}
}
`;
}

export function nestModuleTemplate(moduleName: string, single: string) {
  const moduleClassName = `${toPascalCase(moduleName)}Module`;

  return `import { Module } from '@nestjs/common';


@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class ${moduleClassName} {}
`;
}



export function nestUseCaseTemplate(
  moduleName: string,
  action: "create" | "update" | "updateStatus" | "findAll" | "findList" | "findOne"
) {
  const pascalModule = toPascalCase(moduleName || "");
  const pascalAction = toPascalCase(action);

  return `import { Injectable } from "@nestjs/common";

@Injectable()
export class ${pascalModule}${pascalAction}UseCase {
  constructor() {}
}
`;
}



export function nestEntityTemplate(single: string) {
  const pascalSingle = toPascalCase(single);

  return `export class ${pascalSingle}Entity {
  constructor() {}
}
`;
}

export function nestPortTemplate(single: string) {
  const pascalSingle = toPascalCase(single);

  return `export abstract class ${pascalSingle}RepositoryPort {
}
`;
}

export function nestImplementsTemplate(single: string) {
  const pascalSingle = toPascalCase(single);
  const interfaceName = `${pascalSingle}RepositoryPort`;
  const fileName = `${single}.repository.port`;
  return `import { Injectable } from '@nestjs/common';
import { ${interfaceName} } from '../ports/${fileName}';

@Injectable()
export class ${interfaceName}Impl implements ${interfaceName} {
  constructor() {}
}
`;
}

export function nestConfigTemplate(single: string) {
  const pascalSingle = toPascalCase(single);

  return `
export class ${pascalSingle}Config {
}
`;
}



export function nestFactoryTemplate(single: string) {
  const pascalSingle = toPascalCase(single);

  return `import { ${pascalSingle}Entity } from "../entities/${single}.entity";

export class ${pascalSingle}Factory {
  static createFromPrisma(data: any): ${pascalSingle}Entity {
    return new ${pascalSingle}Entity(
      // data.id,
      // data.name,
    );
  }
}
`;
}

export function nestServicesHexagonalTemplate(
  single: string,
  type:
    | "create"
    | "update"
    | "updateStatus"
    | "findAll"
    | "findList"
    | "findOne"
) {
  const pascalSingle = toPascalCase(single);
  const action = capitalize(type);
  const className = `${action}${pascalSingle}Service`;
  const interfaceName = `I${action}${pascalSingle}`;
  const fileName = `${toKebabCase(type)}-${single}.interface`;

  return `import { Injectable } from '@nestjs/common';
  import { ${interfaceName} } from '../../interfaces/${fileName}';


@Injectable()
export class ${className} implements ${interfaceName} {
  constructor() {}
}
`;
}
