# nest-hexa-services

This package is designed to automate the process of creating and configuring architectures for your NestJS backend, based on the [hexa-mod](https://www.npmjs.com/package/hexa-mod) package.


## Changelog 1.0.8

- Added support and validate NestJS CLI


It consists of 2 parts that define whether the project will be Monolithic or Microservice. In turn, it is divided into 2 parts, which are the following:

## Architecture distribution

In this part, two important points are defined, which you can choose whether to use "Architecture under Layers" or "Hexagonal Architecture"

1. Layered Architecture

<img width="376" height="312" alt="image" src="https://i.imgur.com/ABTH672.png" />

The layered architecture is the typical one we have organized by default: Controllers, services, repositories, dtos.

2. Hexagonal Architecture

The hexagonal architecture is a little more specific in that it entails each module having a specific function in their respective folders: Application, Domain and Infrastructure.

<img width="668" height="865" alt="image" src="https://i.imgur.com/tzEJfFJ.png" />


## MicroServices

In this part it allows us to create microservices with nestjs in addition to being able to 2 types of configurations, the microservice itself and the Api Gateway.

<img width="605" height="115" alt="image" src="https://i.imgur.com/WIK31oy.png" />

And finally, you can choose the transport medium in which the microservices will communicate, which are TCP or NATS.

<img width="478" height="82" alt="image" src="https://i.imgur.com/gtFSt6m.png" />

## Usage

To be able to use it we just need to execute the following command.

```bash
nestmod "modulename"
```
