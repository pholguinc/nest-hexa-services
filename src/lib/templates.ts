import { camelCase, capitalize, toKebabCase, toPascalCase } from "./file-utils";
export function nestControllerTemplate(
  moduleName: string,
  singular: string,
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
    const serviceName = `${capitalize(singular)}Service`;
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

export function nestServiceTemplate(moduleName: string, singular: string) {
  const className = `${capitalize(singular)}Service`;
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

export function nestModuleTemplate(moduleName: string, singular: string) {
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



export function nestEntityTemplate(singular: string) {
  const pascalSingular = toPascalCase(singular);

  return `export class ${pascalSingular}Entity {
  constructor() {}
}
`;
}

export function nestPortTemplate(singular: string) {
  const pascalSingular = toPascalCase(singular);

  return `export abstract class ${pascalSingular}RepositoryPort {
}
`;
}

export function nestImplementsTemplate(singular: string) {
  const pascalSingular = toPascalCase(singular);
  const interfaceName = `${pascalSingular}RepositoryPort`;
  const fileName = `${singular}.repository.port`;
  return `import { Injectable } from '@nestjs/common';
import { ${interfaceName} } from '../ports/${fileName}';

@Injectable()
export class ${interfaceName}Impl implements ${interfaceName} {
  constructor() {}
}
`;
}

export function nestConfigTemplate(singular: string) {
  const pascalSingular = toPascalCase(singular);

  return `
export class ${pascalSingular}Config {
}
`;
}



export function nestFactoryTemplate(singular: string) {
  const pascalSingular = toPascalCase(singular);

  return `import { ${pascalSingular}Entity } from "../entities/${singular}.entity";

export class ${pascalSingular}Factory {
  static createFromPrisma(data: any): ${pascalSingular}Entity {
    return new ${pascalSingular}Entity(
      // data.id,
      // data.name,
    );
  }
}
`;
}

export function nestServicesHexagonalTemplate(
  singular: string,
  type:
    | "create"
    | "update"
    | "updateStatus"
    | "findAll"
    | "findList"
    | "findOne"
) {
  const pascalSingular = toPascalCase(singular);
  const action = capitalize(type);
  const className = `${action}${pascalSingular}Service`;
  const interfaceName = `I${action}${pascalSingular}`;
  const fileName = `${toKebabCase(type)}-${singular}.interface`;

  return `import { Injectable } from '@nestjs/common';
  import { ${interfaceName} } from '../../interfaces/${fileName}';


@Injectable()
export class ${className} implements ${interfaceName} {
  constructor() {}
}
`;
}
