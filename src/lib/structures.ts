import { capitalize, toPascalCase } from "./file-utils";
import {
  nestControllerTemplate,
  nestServiceTemplate,
  nestRepositoryTemplate,
  nestModuleTemplate,
  nestControllerHexTemplate,
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
              singular
            ),
          },
          repositories: {
            [`${moduleName}.repository.ts`]: nestRepositoryTemplate(
              moduleName,
            ),
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

export function getMonolitoHexagonalStructure(moduleName: string, singular: string) {
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
            useCases: {
              commands: {},
              queries: {},
            },
          },
          domain: {
            entities: {},
            factories: {},
            interfaces: {},
            services: {},
          },
          infrastructure: {
            adapters: {
              implements: {},
              ports: {},
            },
            config: {},
            controllers: {
              [`${moduleName}.controller.ts`]: nestControllerHexTemplate(
                moduleName,
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
            singular
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
