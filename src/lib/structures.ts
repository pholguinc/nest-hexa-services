import { capitalize, toPascalCase } from "./file-utils";
import {
  nestControllerTemplate,
  nestServiceTemplate,
  nestRepositoryTemplate,
  nestModuleTemplate,
  nestUseCaseTemplate,
  nestFactoryTemplate,
  nestServicesHexagonalTemplate,
  nestEntityTemplate,
  nestPortTemplate,
  nestImplementsTemplate,
  nestConfigTemplate,
} from "./templates";

export function getMonolitoStructure(moduleName: string, single: string) {
  const pascalSingle = toPascalCase(single);

  return {
    dtos: {
      requests: {
        [`create-${single}.request.dto.ts`]: `export class Create${pascalSingle}RequestDto {}`,
        [`update-${single}.request.dto.ts`]: `export class Update${pascalSingle}RequestDto {}`,
      },
      responses: {
        [`${single}.response.dto.ts`]: `export class ${pascalSingle}ResponseDto {}`,
      },
    },
    controllers: {
      [`${moduleName}.controller.ts`]: nestControllerTemplate(
        moduleName,
        single,
        "monolito"
      ),
    },
    repositories: {
      [`${moduleName}.repository.ts`]: nestRepositoryTemplate(moduleName),
    },
    services: {
      [`${moduleName}.service.ts`]: nestServiceTemplate(moduleName, single),
    },
    [`${moduleName}.module.ts`]: nestModuleTemplate(moduleName, single),
  };
}


export function getMonolitoHexagonalStructure(
  moduleName: string,
  single: string,
  tipo: "monolito" | "hexagonal" = "hexagonal"
) {
  const pascalSingle = toPascalCase(single);

  return {
    application: {
      dtos: {
        requests: {
          [`create-${single}.request.dto.ts`]: `export class Create${pascalSingle}RequestDto {}`,
          [`update-${single}.request.dto.ts`]: `export class Update${pascalSingle}RequestDto {}`,
        },
        responses: {
          [`${single}.response.dto.ts`]: `export class ${pascalSingle}ResponseDto {}`,
        },
      },
      "use-cases": {
        commands: {
          [`create-${single}.use-case.ts`]: nestUseCaseTemplate(
            moduleName,
            "create"
          ),
          [`update-${single}.use-case.ts`]: nestUseCaseTemplate(
            moduleName,
            "update"
          ),
          [`update-status-${single}.use-case.ts`]: nestUseCaseTemplate(
            moduleName,
            "updateStatus"
          ),
        },
        queries: {
          [`find-all-${single}.use-case.ts`]: nestUseCaseTemplate(
            moduleName,
            "findAll"
          ),
          [`find-list-${single}.use-case.ts`]: nestUseCaseTemplate(
            moduleName,
            "findList"
          ),
          [`find-one-${single}.use-case.ts`]: nestUseCaseTemplate(
            moduleName,
            "findOne"
          ),
        },
      },
    },
    domain: {
      entities: {
        [`${single}.entity.ts`]: nestEntityTemplate(moduleName),
      },
      factories: {
        [`${single}.factory.ts`]: nestFactoryTemplate(single),
      },
      interfaces: {
        [`create-${single}.interface.ts`]: `export interface ICreate${pascalSingle} {}`,
        [`update-${single}.interface.ts`]: `export interface IUpdate${pascalSingle} {}`,
        [`update-status-${single}.interface.ts`]: `export interface IUpdateStatus${pascalSingle} {}`,
        [`find-all-${single}.interface.ts`]: `export interface IFindAll${pascalSingle} {}`,
        [`find-list-${single}.interface.ts`]: `export interface IFindList${pascalSingle} {}`,
        [`find-one-${single}.interface.ts`]: `export interface IFindOne${pascalSingle} {}`,
      },
      services: {
        commands: {
          [`create-${single}.service.ts`]: nestServicesHexagonalTemplate(
            single,
            "create"
          ),
          [`update-${single}.service.ts`]: nestServicesHexagonalTemplate(
            single,
            "update"
          ),
          [`update-status-${single}.service.ts`]: nestServicesHexagonalTemplate(
            single,
            "updateStatus"
          ),
        },
        queries: {
          [`find-all-${single}.service.ts`]: nestServicesHexagonalTemplate(
            single,
            "findAll"
          ),
          [`find-list-${single}.service.ts`]: nestServicesHexagonalTemplate(
            single,
            "findList"
          ),
          [`find-one-${single}.service.ts`]: nestServicesHexagonalTemplate(
            single,
            "findOne"
          ),
        },
      },
    },
    infrastructure: {
      adapters: {
        implements: {
          [`${single}.repository.impl.ts`]: nestImplementsTemplate(single),
        },
        ports: {
          [`${single}.repository.port.ts`]: nestPortTemplate(single),
        },
      },
      config: {
        [`${single}.config.ts`]: nestConfigTemplate(single),
        [`${single}.module.ts`]: nestModuleTemplate(moduleName, single),
      },
      controllers: {
        [`${moduleName}.controller.ts`]: nestControllerTemplate(
          moduleName,
          single,
          tipo
        ),
      },
    },
  };
}

export function getMicroservicioStructure(
  moduleName: string,
  single: string
) {
  return {
    src: {
      [moduleName]: {
        main: {
          [`${moduleName}.controller.ts`]: nestControllerTemplate(
            moduleName,
            single,
            "monolito"
          ),
          [`${moduleName}.service.ts`]: nestServiceTemplate(moduleName, single),
          [`${moduleName}.module.ts`]: nestModuleTemplate(moduleName, single),
        },
        dto: {
          [`create-${single}.dto.ts`]: `export class Create${capitalize(
            single
          )}Dto {}`,
        },
        entities: {
          [`${single}.entity.ts`]: `export class ${capitalize(single)} {}`,
        },
      },
    },
  };
}

