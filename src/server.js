
import express from 'express';
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import { Parent_Folder } from './constants/paths.js';

console.log(Parent_Folder)
const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));
app.get('*', (req, res) => {
  res.sendFile(path.join(Parent_Folder,'production', 'index.html'));
});

app.use(express.static(path.join(Parent_Folder, 'production')));

app.listen(6069, () => {
  console.log('Servidor Express escuchando en http://localhost:6069');
});