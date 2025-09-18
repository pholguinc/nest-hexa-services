import { camelCase, capitalize, toPascalCase } from "./file-utils";

export function nestControllerTemplate(moduleName: string, singular: string) {
  const className = `${toPascalCase(moduleName)}Controller`;
  const serviceName = `${capitalize(singular)}Service`;
  return `import { Controller } from '@nestjs/common';
import { ${serviceName} } from './${moduleName}.service';

@Controller('${moduleName}')
export class ${className} {
  constructor(private readonly ${camelCase(serviceName)}: ${serviceName}) {}
}
`;
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
  const controllerClassName = `${toPascalCase(moduleName)}Controller`; 
  const serviceClassName = `${capitalize(singular)}Service`;

  return `import { Module } from '@nestjs/common';
import { ${serviceClassName} } from './${moduleName}.service';
import { ${controllerClassName} } from './${moduleName}.controller';

@Module({
  controllers: [${controllerClassName}],
  providers: [${serviceClassName}],
})
export class ${moduleClassName} {}
`;
}


export function nestControllerHexTemplate(
  moduleName: string,
) {
  const className = `${toPascalCase(moduleName)}Controller`;
  return `import { Controller } from '@nestjs/common';

@Controller('${moduleName}')
export class ${className} {
  constructor() {}
}
`;
}