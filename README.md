# nest-hexa-services

This package is designed to automate the process of creating and configuring architectures for your NestJS backend.

It consists of 2 parts that define whether the project will be Monolithic or Microservice. In turn, it is divided into 2 parts, which are the following:

## Architecture distribution

In this part, two important points are defined, which you can choose whether to use "Architecture under Layers" or "Hexagonal Architecture"

1. Layered Architecture

<img width="376" height="312" alt="image" src="https://github.com/user-attachments/assets/33791c3f-b1b7-4acd-bdf2-4ad43743cfa5" />

The layered architecture is the typical one we have organized by default: Controllers, services, repositories, dtos.

2. Hexagonal Architecture

The hexagonal architecture is a little more specific in that it entails each module having a specific function in their respective folders: Application, Domain and Infrastructure.

<img width="668" height="865" alt="image" src="https://github.com/user-attachments/assets/ec866588-4572-4736-8c62-6926caa90d25" />


## MicroServicios

In this part it allows us to create microservices with nestjs in addition to being able to 2 types of configurations, the microservice itself and the Api Gateway.

<img width="605" height="115" alt="image" src="https://github.com/user-attachments/assets/5ad62246-a7c1-4bb2-8f83-076b83e82e29" />

And finally, you can choose the transport medium in which the microservices will communicate, which are TCP or NATS.

<img width="478" height="82" alt="image" src="https://github.com/user-attachments/assets/9ec02cb8-6e5f-4e16-adce-d51f70472fc1" />

## Usage

To be able to use it we just need to execute the following command.

```bash
nestmod "modulename"
```
