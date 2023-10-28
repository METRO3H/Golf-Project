import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export function Verify_Token(request, response, next){

    const bearer_header = request.headers.authorization;

    if (!bearer_header) {
        console.error('Token no proporcionado')
      return response.status(403).json({ error: 'Token no proporcionado' });
    }

    const token = bearer_header.split(' ')[1]; // Separar el esquema "Bearer" del token

  
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error('Token inválido -> ', error)
        return response.status(401).send({ message: 'Token inválido' });
      }
      console.log("token valido")
      request.data = decoded;
      next();
    });
}