# Aplicación del Clima

Una aplicación del clima simple y elegante construida con Next.js, React y TypeScript. Permite a los usuarios buscar la información meteorológica actual de cualquier ciudad del mundo, con soporte para inglés y español.

## Características

- **Datos del Clima Actual:** Obtén información del clima en tiempo real, incluyendo temperatura, sensación térmica, humedad y condiciones actuales.
- **Búsqueda por Ciudad:** Busca fácilmente información del clima para cualquier ciudad del mundo.
- **Soporte Multi-idioma:** La interfaz de usuario y las descripciones del clima están disponibles en inglés y español.
- **Diseño Responsivo:** Una interfaz de usuario limpia, moderna y responsiva que proporciona una gran experiencia de usuario tanto en computadoras de escritorio como en dispositivos móviles.
- **Manejo de Errores:** Se proporciona retroalimentación clara para búsquedas no válidas o problemas de red.

## Tutorial de Instalación


Sigue estas instrucciones para obtener una copia del proyecto y ponerla en marcha en tu máquina local para desarrollo y pruebas.

### Pre-Requisitos

Asegúrate de tener lo siguiente instalado en tu sistema:

- [Node.js](https://nodejs.org/) (se recomienda v20.x o posterior)
- [npm](https://www.npmjs.com/) (viene con Node.js)

### Instalación

1.  **Clona el repositorio:**

    ```sh
    git clone https://github.com/tu-usuario/weather-app.git
    cd weather-app
    ```

2.  **Instala las dependencias:**

    Ejecuta el siguiente comando para instalar todas las dependencias necesarias del proyecto:

    ```sh
    npm install
    ```

3.  **Configura las variables de entorno:**

    Este proyecto requiere una clave de API de [OpenWeatherMap](https://openweathermap.org/api) para obtener los datos del clima.

    Crea un archivo llamado `.env.local` en la raíz de tu proyecto y agrégale tu clave de API:

    ```
    OPENWEATHERMAP_API_KEY=tu_clave_de_api_aqui
    ```

    Reemplaza `tu_clave_de_api_aqui` con tu clave de API real de OpenWeatherMap.

## Ejecutando la Aplicación

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```sh
npm run dev
```
La aplicacion estara disponible en el siguiente enlace:
http://localhost:3000

## Running Tests
Este proyecto usa Jest y React Testing Library para las pruebas unitarias.

Para correr las pruebas ejecute:

```sh
npm test
```
Para correr las pruebas en modo interactivo:

```sh
npm run test:watch
```