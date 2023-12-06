import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from "../webpack.config.js";
import path from "path";
import bodyParser from "body-parser";
import requestRoutes from "./requests/routes/requestRoutes.js";
import logger from "morgan";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Parent_Folder } from "./constants/paths.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const server = createServer(app);
const io = new Server(server);

// Objeto para mapear nombres de usuario a sockets
const connectedUsers = {};
let games = {};

io.on("connection", function (socket) {
  // Verifica la validez del token
  const token = socket.handshake.query.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    connectedUsers[decoded.username] = socket;

    console.log("Se ha conectado el usuario -> ", decoded.username);

    socket.on("disconnect", function () {
      // Eliminar el usuario desconectado del mapeo
      const disconnectedUser = Object.keys(connectedUsers).find(
        (key) => connectedUsers[key] === socket
      );
      if (disconnectedUser) {
        delete connectedUsers[disconnectedUser];
        console.log("Se ha desconectado el usuario -> ", disconnectedUser);
      }
    });

    socket.on("send_game_invitation", function (receiver_username) {
      // Enviar un mensaje privado al usuario específico
      const sender_username = decoded.username;
      const toSocket = connectedUsers[receiver_username];
      if (toSocket) {
        toSocket.emit("receive_game_invitation", sender_username);
      } else {
        console.log(`User ${receiver_username} is not connected`);
      }
    });

    socket.on("receive_game_invitation", function (sender_username) {
      const receiver_username = decoded.username;
    });

    socket.on("join_game", function (game_id, username) {
      socket.join(game_id);

      // Verificar si el usuario es el primero en unirse a la sala
      if (!games[game_id]) {
        // Si es el primero, asignarle un rol específico y guardar la información
        games[game_id] = { primer_usuario: username, rol: "Líder" };
        socket.role = "admin";
        console.log(username + " es ahora el Líder de la sala " + game_id);
        
      } else {
        // Si no es el primero, asignarle un rol predeterminado
        socket.role = "invited";
        console.log(username + " es solo un invitado ");
        
      }
      io.in(game_id).emit("user_connected", {connected_user: username, admin : games[game_id].primer_usuario});
      
    });
  } catch (error) {
    console.error("Token inválido -> ", error);
    socket.disconnect();
  }
});

const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(logger("dev"));

app.use(bodyParser.json());

app.use("/request", requestRoutes);

app.get("*", (request, response) => {
  response.sendFile(path.join(Parent_Folder, "production", "index.html"));
});

app.use(express.static(path.join(Parent_Folder, "production")));

server.listen(6069, () => {
  console.log("Servidor Express escuchando en http://localhost:6069");
});
