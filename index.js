const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = process.env.PORT || 9000;
//const port = 9999;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  //console.log("request",request)
  console.log("**************************Inicio**********************");
  //console.log("response",response)
  response.json({ info: "Node.js, Express, and Postgres API-->" });
});

try {
  app.get("/api/obtenerUsuarios", db.getUsuarios);
  app.get("/api/obtenerUsuario/:id", db.getUsuarioById);
  app.post("/api/crearUsuario", db.crearUsuario);
  app.put("/api/actualizarUsuario/:id", db.actualizarUsuario);
  app.delete("/api/eliminarUsuario/:id", db.eliminarUsuario);
  app.post("/api/validarUsuario", db.getUsuarioByUsuarioClave);
} catch (e) {
  console.log("Error capturado en index--->e", e);
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
