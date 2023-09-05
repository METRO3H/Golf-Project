# Golf Project

Breve descripción de tu proyecto.

## Requisitos Previos

Antes de comenzar asegúrate de tener instalado Git y la version LTS (La mas segura) de Node.js

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/es)

Luego, asegurate de tener instaladas las dependencias con los comandos :

```bash
git --version
```

```bash
node --version
```

## Instalación

Sigue estos pasos para instalar y desplegar el proyecto:

1. Clona este repositorio mediante vscode o usa este comando:

   ```bash
   git clone https://github.com/METRO3H/Golf-Project
   ```

2. Instalar las dependencias necesarias gracias al archivo package.json

   ```bash
      npm install
   ```

3. Crear servidor local de desarrollo

  ```bash
    npm install webpack-dev-server -D
  ```

4. Ejecutar servidor local de desarrollo

  ```bash
    npx webpack-dev-server
  ```

## Instalar todo desde cero

1. Instalar webpack

 ```bash
     npm install webpack
  ```

2. Instalar HTML webpack plugin

 ```bash
    npm install html-webpack-plugin -D
  ```

2. Instalar webpack CSS loader

 ```bash
    npm install css-loader -D
    npm install style-loader -D
  ```

3. Crear archivo webpack.config.js en la raiz del repositorio

  ```bash
      mkdir webpack.config.js
  ```

4. Configurar archivo webpack.config.js

  ```js
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  module.exports = {
    mode: "development",
    entry: "./src/index.js",

    output: {
      path: __dirname + "/production",
      filename: "bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
  ```

5. Crear servidor local de desarrollo

```bash
    npm install webpack-dev-server -D
```

6. Ejecutar servidor local de desarrollo

```bash
    npx webpack-dev-server
```
