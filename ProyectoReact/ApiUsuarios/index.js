const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASS,
    database: process.env.DB
  });

app.use(bodyParser.json())

  const PORT = 3000;

  connection.connect(err => {
    if (err) throw err;
    console.log('Conexion exitosa!');
  });

  require('./routes.js')(app, connection)


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});