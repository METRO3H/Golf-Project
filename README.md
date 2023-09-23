# Golf Project

Breve descripción de tu proyecto.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Git y la versión LTS (La más segura) de Node.js

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/es)

Luego, asegúrate de tener instaladas las dependencias con los comandos:

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

## Levantar servidor
1. El siguiente comando levanta un servidor de express de forma local en el puerto 6069 con el código Frontend de producción generado por webpack.
   
   ```bash
   npm run start:server
   ```
2. El siguiente comando actualiza de forma automática el código de producción cada vez que cambiamos algo en el código de desarrollo.
   
   ```bash
   npm run start:watcher
   ```    
>Estos 2 comandos deben ejecutarse en terminales separadas y dejarlas andando.  
>Si quieren saber exactamente que es lo que ejecuta cada comando deben ir al archivo package.js en el apartado "scripts" que esta al final.
## Instalar todo desde cero

1. Instalar webpack

   ```bash
     npm install webpack
   ```

2. Instalar HTML webpack plugin
 
   ```bash
    npm install html-webpack-plugin -D
   ```

3. Instalar webpack loaders

   ```bash
    npm install css-loader -D
    npm install style-loader -D
    npm install html-loader -D 
   ```

4. Crear archivo webpack.config.js en la raíz del repositorio

   ```bash
      mkdir webpack.config.js
   ```

5. Configurar archivo webpack.config.js

   ```js
   const HtmlWebpackPlugin = require("html-webpack-plugin")
   module.exports = {


   
       mode: 'development',
       entry: './src/index.js',
       
       output:{


           path: __dirname + '/production',
           filename: 'bundle.js'
       },
       plugins : [


           new HtmlWebpackPlugin({


               template:'./public/index.html'
           })
       ],
       module: {


           rules: [


             {


               test: /\.css$/i,
               use: ["style-loader", "css-loader"],
             },
           ],
         },
   }
   ```

6. Crear servidor local de desarrollo

   ```bash
    npm install webpack-dev-server -D
   ```

7. Ejecutar servidor local de desarrollo

   ```bash
    npx webpack-dev-server
   ```
## Usar Bootstrap
Para instalar la libreria Bootstrap corre el siguiente comando:
```bash
npm i bootstrap@5.3.1 -D
```
Luego, si quieres usar la librería, debes importarla en el archivo Javascript que quieres usar:
```js
import "bootstrap/dist/css/bootstrap.min.css"
```
