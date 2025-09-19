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

export function getMonolitoStructure(moduleName: string, singular: string) {
  const pascalSingular = toPascalCase(singular);

  return {
    src: {
      modules: {
        [moduleName]: {
          dtos: {
            requests: {
              [`create-${singular}.request.dto.ts`]: `export class Create${pascalSingular}RequestDto {}`,
              [`update-${singular}.request.dto.ts`]: `export class Update${pascalSingular}RequestDto {}`,
            },
            responses: {
              [`${singular}.response.dto.ts`]: `export class ${pascalSingular}ResponseDto {}`,
            },
          },
          controllers: {
            [`${moduleName}.controller.ts`]: nestControllerTemplate(
              moduleName,
              singular,
              "monolito"
            ),
          },
          repositories: {
            [`${moduleName}.repository.ts`]: nestRepositoryTemplate(moduleName),
          },
          services: {
            [`${moduleName}.service.ts`]: nestServiceTemplate(
              moduleName,
              singular
            ),
          },

          [`${moduleName}.module.ts`]: nestModuleTemplate(moduleName, singular),
        },
      },
    },
  };
}

export function getMonolitoHexagonalStructure(
  moduleName: string,
  singular: string,
  tipo: "monolito" | "hexagonal" = "hexagonal"
) {
  const pascalSingular = toPascalCase(singular);

  return {
    src: {
      modules: {
        [moduleName]: {
          application: {
            dtos: {
              requests: {
                [`create-${singular}.request.dto.ts`]: `export class Create${pascalSingular}RequestDto {}`,
                [`update-${singular}.request.dto.ts`]: `export class Update${pascalSingular}RequestDto {}`,
              },
              responses: {
                [`${singular}.response.dto.ts`]: `export class ${pascalSingular}ResponseDto {}`,
              },
            },
            "use-cases": {
              commands: {
                [`create-${singular}.use-case.ts`]: nestUseCaseTemplate(
                  moduleName,
                  "create"
                ),
                [`update-${singular}.use-case.ts`]: nestUseCaseTemplate(
                  moduleName,
                  "update"
                ),
                [`update-status-${singular}.use-case.ts`]: nestUseCaseTemplate(
                  moduleName,
                  "updateStatus"
                ),
              },
              queries: {
                [`find-all-${singular}.use-case.ts`]: nestUseCaseTemplate(
                  moduleName,
                  "findAll"
                ),
                [`find-list-${singular}.use-case.ts`]: nestUseCaseTemplate(
                  moduleName,
                  "findList"
                ),
                [`find-one-${singular}.use-case.ts`]: nestUseCaseTemplate(
                  moduleName,
                  "findOne"
                ),
              },
            },
          },
          domain: {
            entities: {
              [`${singular}.entity.ts`]: nestEntityTemplate(moduleName),
            },
            factories: {
              [`${singular}.factory.ts`]: nestFactoryTemplate(singular),
            },
            interfaces: {
              [`create-${singular}.interface.ts`]: `export interface ICreate${pascalSingular} {}`,
              [`update-${singular}.interface.ts`]: `export interface IUpdate${pascalSingular} {}`,
              [`update-status-${singular}.interface.ts`]: `export interface IUpdateStatus${pascalSingular} {}`,
              [`find-all-${singular}.interface.ts`]: `export interface IFindAll${pascalSingular} {}`,
              [`find-list-${singular}.interface.ts`]: `export interface IFindList${pascalSingular} {}`,
              [`find-one-${singular}.interface.ts`]: `export interface IFindOne${pascalSingular} {}`,
            },
            services: {
              commands: {
                [`create-${singular}.service.ts`]:
                  nestServicesHexagonalTemplate(singular, "create"),
                [`update-${singular}.service.ts`]:
                  nestServicesHexagonalTemplate(singular, "update"),
                [`update-status-${singular}.service.ts`]:
                  nestServicesHexagonalTemplate(singular, "updateStatus"),
              },
              queries: {
                [`find-all-${singular}.service.ts`]:
                  nestServicesHexagonalTemplate(singular, "findAll"),
                [`find-list-${singular}.service.ts`]:
                  nestServicesHexagonalTemplate(singular, "findList"),
                [`find-one-${singular}.service.ts`]:
                  nestServicesHexagonalTemplate(singular, "findOne"),
              },
            },
          },
          infrastructure: {
            adapters: {
              implements: {
                [`${singular}.repository.impl.ts`]:
                  nestImplementsTemplate(singular),
              },
              ports: {
                [`${singular}.repository.port.ts`]: nestPortTemplate(singular),
              },
            },
            config: {
              [`${singular}.config.ts`]: nestConfigTemplate(singular),
              [`${singular}.module.ts`]: nestModuleTemplate(moduleName, singular),
            },
            controllers: {
              [`${moduleName}.controller.ts`]: nestControllerTemplate(
                moduleName,
                singular,
                tipo
              ),
            },
          },
        },
      },
    },
  };
}

export function getMicroservicioStructure(
  moduleName: string,
  singular: string
) {
  return {
    src: {
      [moduleName]: {
        main: {
          [`${moduleName}.controller.ts`]: nestControllerTemplate(
            moduleName,
            singular,
            "monolito"
          ),
          [`${moduleName}.service.ts`]: nestServiceTemplate(
            moduleName,
            singular
          ),
          [`${moduleName}.module.ts`]: nestModuleTemplate(moduleName, singular),
        },
        dto: {
          [`create-${singular}.dto.ts`]: `export class Create${capitalize(
            singular
          )}Dto {}`,
        },
        entities: {
          [`${singular}.entity.ts`]: `export class ${capitalize(singular)} {}`,
        },
      },
    },
  };
}

