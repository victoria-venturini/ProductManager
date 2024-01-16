const express = require('express');
const app = express();

// Define una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Escucha en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});