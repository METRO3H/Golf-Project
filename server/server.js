import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from "../webpack.config.js";
import path from "path";
import requestRoutes from "./requests/routes/requestRoutes.js";
import { Parent_Folder } from "./constants/paths.js";
import bodyParser from "body-parser"

const app = express();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(bodyParser.json());

app.use("/request", requestRoutes);


app.get("*", (request, response) => {
  response.sendFile(path.join(Parent_Folder, "production", "index.html"));
});

app.use(express.static(path.join(Parent_Folder, "production")));

app.listen(6069, () => {
  console.log("Servidor Express escuchando en http://localhost:6069");
});
