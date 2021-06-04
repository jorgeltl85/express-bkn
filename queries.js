const Pool = require("pg").Pool;

//datos de heroku
const usuario = 'ovqhilheinomxz';
const host = 'ec2-54-157-100-65.compute-1.amazonaws.com';
const database = 'd5ompe5t5rci0o';
const password = 'eb65c6310bf21c3e21546522fcaa34725c7aa019983a267d09a3d51aa91478ec';

const pool = new Pool({
  user: usuario,
  host: host,
  database: database,
  password: password,
  port: 5432,
});

const getUsuarios = (request, response) => {
  pool.query("SELECT * FROM usuario ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUsuarioById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM usuario WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUsuarioByUsuarioClave = (request, response) => {
  const { usuario, clave } = request.body;
  //const id = parseInt(request.params.id)

  pool.query(
    "SELECT * FROM usuario WHERE usuario = $1 and clave = $2",
    [usuario, clave],
    (error, results) => {
      var banderaValid = false;
      if (error) {
        throw error;
      }
      //console.log("getUsuarioByUsuarioClave--->results", results);
      console.log("getUsuarioByUsuarioClave--->results.rows", results.rows);

      console.log(
        "getUsuarioByUsuarioClave--->results.rowCount",
        results.rowCount
      );

      if (results.rowCount > 0) {
        banderaValid = true;
        response.status(200).json(banderaValid);
      } else {
        response.status(200).json(banderaValid);
      }
    }
  );
};

const crearUsuario = (request, response) => {
  const { usuario, nombre, email, clave } = request.body;

  const objetoAInsertar = [usuario, nombre, email, clave];

  pool.query(
    "INSERT INTO usuario (usuario, nombre, email, clave) VALUES ($1, $2, $3, $4) RETURNING id",
    objetoAInsertar,
    (error, result) => {
      if (error) {
        console.log("error", error);
        response.status(500).send(`Error al insertar el usuario: ${error}`);
        //throw error
      } else {
        //console.log("error",error);
        //onsole.log("crearUsuario--->result",result)
        console.log(
          "crearUsuario--->result.result.rows[0].id",
          result.rows[0].id
        );

        response
          .status(201)
          .send(`Usuario agregado con ID: ${result.rows[0].id}`);
      }
    }
  );
};

/*
const crearUsuario = (request, response) => {
  const { usuario, nombre, email, clave } = request.body;

  var objetoGuardar = {
    usuario: usuario,
    nombre: nombre,
    email: email,
    clave: clave,
  };

  const objetoAInsertar = [usuario, nombre, email, clave];
  const sql =
    "INSERT INTO usuario (usuario, nombre, email, clave) VALUES ($1, $2, $3, $4) RETURNING id";

  pool.query(sql, objetoAInsertar, function (error, result) {
    if (error) {
      throw error;
    }
    console.log("crearUsuario--->result",result);
    console.log("crearUsuario--->result.insertId",result.rows[0].id);
    response.status(201).send(`Usuario agregado con ID: ${result.rows[0].id}`);
  });
};*/

const actualizarUsuario = (request, response) => {
  const id = parseInt(request.params.id);
  const { usuario, nombre, email, clave } = request.body;

  pool.query(
    "UPDATE usuario SET usuario = $1, nombre = $2, email = $3, clave = $4 WHERE id = $5",
    [usuario, nombre, email, clave, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Usuario actualizado con ID: ${id}`);
    }
  );
};

const eliminarUsuario = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM usuario WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Usuario eliminado con ID: ${id}`);
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuarioByUsuarioClave,
};
