
import express from 'express';
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import { Parent_Folder } from './constants/paths.js';

console.log(Parent_Folder)
const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));
app.get('*', (req, response) => {
  response.sendFile(path.join(Parent_Folder,'production', 'index.html'));
});

app.post('/get_player_data', (request, response) => {

  fs.readFile('./src/assets/json/data_test.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).send('Error interno del servidor');
        return;
    }
    
    // Parsea el contenido del archivo a un objeto JSON
    const jsonData = JSON.parse(data);
    response.json(jsonData);
  })
})

app.use(express.static(path.join(Parent_Folder, 'production')));

app.listen(6069, () => {
  console.log('Servidor Express escuchando en http://localhost:6069');
});