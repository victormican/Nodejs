const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',     // Cambia esto por la dirección de tu servidor MySQL
  port: 3306,            // Cambia esto por el puerto de tu servidor MySQL si es diferente al valor predeterminado (3306)
  user: 'root',          // Cambia esto por el nombre de usuario de tu base de datos
  password: 'root',      // Cambia esto por la contraseña de tu base de datos
  database: 'tienda_p'   // Cambia esto por el nombre de tu base de datos
});

// Establecer la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

// Exportar la conexión para utilizarla en otros archivos
module.exports = connection;
