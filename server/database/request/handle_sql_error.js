import * as db_error from "../../constants/db_error.js";

export default function (error, TYPE_ERROR) {

  if (!error) {
    return;
  }

  var message = ""; 

  switch (TYPE_ERROR) {
    case db_error.create_database:
      message = "Error al crear la base de datos -> ";
      break;
    case db_error.open_database:
      message = "Error al entrar a la base de datos -> ";
      break;
    case db_error.select:
      message = "Error al hacer select -> ";
      break;
    case db_error.close_database:
      message = "Error al cerrar la base de datos -> ";
      break;

    default:
      "Hubo un error desconocido -> ";
      break;
  }

  console.error(message, error.message);
}
