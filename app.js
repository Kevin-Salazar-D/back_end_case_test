const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("combined"));
app.use(express.json());

// Habilitar CORS para cualquier origen
app.use(cors()); // Esto permite TODAS las solicitudes

module.exports = app;
