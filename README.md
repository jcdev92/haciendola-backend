<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Description

**PRODUCTS RESTFULL API**
  - CRUD de productos con autenticacion de usuario.
  - Puedes crear tu usuario, logearte y listar todos los productos, crear , editar, o eliminar un producto.

**INFO:**

  - Desarrollo:
    - En en el archivo ".env.template" se encuentran las respectivas variables de entorno.
    - Recuerda renombrar el ".env.template" por ".env".
    - Recuerda tambien DESCOMENTAR LAS VARIABLES DE ENTORNO.
    - Puedes usar los valores de las variables de entorno que ya estan por defecto, o cambiarlos por los que tu prefieras.
    - Al iniciar la api desde un archivo products.xslx se cargan todos los productos indicados por haciendola en las instrucciones del desafio, a la base de datos.
    - Al iniciar la api se crea por defecto un usuario con el que puedes logearte sin necesidad de crear uno
    - Las credenciales de dicho usuario se encuentran como variables de entorno en el archivo .env.template, puedes usar los que estan comentados, o usar los que tu prefieres colocando los valores de preferencia en dichas variables de entorno.


**REQUISITOS:**
  - En modo desarrollo:
    - Tener docker instalado para correr la base de datos via docker compose up.
    - En su defecto tener instalado postgreSQL en tu computadora. Y la base de datos creada para poder conectarte.
    - Si tienes ambos instalado tanto docker como postgresql, chocaran los puertos 5432 en local, por lo tanto si usas docker para correr la base datos pon en la varibale de entorno DB_LOCAL_PORT el puerto 5433... si no usaras docker el DB_LOCAL_PORT puede ser tranquilamente el 5432.
    - Si usas docker para correr la base datos, puedes usar las variables de entorno que dejo ya por defecto en el env.template, solo de renombrar el archivo a ".env" y ejecutar "docker compose up -d".
    - Obviamente tener node js instalado.
    - De preferencia uso pnpm.




**DOCUMENTACION OPENAPI / RUTAS:**

  **Development:**
  - http://localhost:9000/api




## Installation

```bash
# install dependencies
$ pnpm install
```



## Running the app

- renombrar el archivo ".env.template" a ".env".
- DESCOMENTAR las variables de entorno.

```bash
# start data base
$ docker compose up -d

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jesus Clemente](https://jcdev-portfolio-frontend.vercel.app/)

## License

Nest is [MIT licensed](LICENSE).
