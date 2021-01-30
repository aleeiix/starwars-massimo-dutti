# StarwarsMassimoDutti

Proyecto básico listado y detalle de naves espaciales de Star Wars, obtención de datos a través de llamadas http a la API swapi.dev, la parte de autentificación es local usando IndexedDB.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Estructura del proyecto

Se ha seguido una estructura de módulos por ruta y un módulo shared para elementos reutilizables, los módulos se han separado en carpetas vistas que son los componentes stateful con un servicio para poder extraer su lógica y una carpeta componentes que son stateless.

Para el rendimiento se ha optado por una carga de los módulos usando lazy loading y los componentes una estrategia de detección de cambios On Push.

##Diseño
Diseño inspirado en la página web https://www.massimodutti.com/

Realizado usando la filosofía Mobile first, ya que actualmente las vistas a páginas web tienen mucho más porcentaje en dispositivos móviles que de escritorio.

Se ha usado la librería Angular Material con theme personalizado, ficheros scss con archivos de variables para los colores.

##Autentificación
Se ha realizado un sistema de autentificación local, sacándole partido al navegador usando la api de indexedDB.

Una vez logeado guardamos el usuario en un servicio y en localstorage codificado en base64

Cuando se abre la aplicación lo primero que comprueba es si existe usuario en localstorage, esto gracias a APP_INITIALIZER

##Sistema de Caché
Se ha implementado un sistema de caché en cualquier llamada de naves espaciales, películas y personas. El sistema se ha centralizado en su propio servicio.

##Rutas
| Ruta | Guards | Funcionalidad |
|:----:|:------:|:-------------:|
| /login | NoAuthGuard | Inicio de sesión |
| /register | NoAuthGuard | Dar de alta a usuario |
| /starships | AuthGuard | Listado de naves espaciales con scroll infinito |
| /starship/:id | AuthGuard | Detalle de la nave recogiendo información de pilotos y películas |
| /extra | AuthGuard | Página sencilla para dar más navegación a la página |
| /admin | AuthGuard, AdminGuard | Página sencilla para dar más navegación a la página con un control de Admin |
| /error | | Página de 404 |

##Guards

- **AuthGuard:** Solo deja acceder a la ruta si tienes sesión abierta
- **NoAuthGuard:** Solo deja acceder a la ruta si NO tienes sesión abierta
- **AdminGuard:** Solo deja acceder a la ruta si tienes el rol ADMIN

##Testing
Sistema de testing basado en Unit Testing con un porcentaje de cobertura superior al 90%

Unit testing
`npm run test`

Generar informe de cobertura
`npm run coverage`

##Lint + Prettier
El proyecto contiene reglas de lint y prettier. Puedes lanzarlos con los siguientes comandos:

Lint
`npm run lint`

Prettier
`npm run prettier`

##Hooks
Se ha instalado la librería husky para realizar comando en los hooks de git, en concreto en el pre-commit se lanza `npm run prettier && npm run lint`

##Deploy continuo
Se ha realizado un deploy continuo creando un workflow de github actions que además de preparar el despliegue también ejecuta el linter y los test.

Url del deploy: https://starwars-massimo-dutti.web.app/

##Lanzar servidor local
Para ejecutar el servidor en local hay que hacer los siguientes pasos:

1. Instalar dependencias
   `npm install`

2. Lanzar el servidor
   `npm run start`

Url de desarrollo: http://localhost:4200/

##Compilacion
Para compilar el proyecto para un despliegue se deberia ejecutar el siguiente comando:
`npm run build`

Si queremos compilar usando los environments de produccion es el siguiente comando:
`npm run build:prod`

Las compilaciones guardaran en la carpeta **dist/**
