// server/server.js
require('dotenv').config(); // Carga variables de entorno desde .env
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; // Usa el puerto de .env o 5001 por defecto

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite al servidor entender JSON en las peticiones

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

// Aquí añadirás más rutas para usuarios, datos, etc.
// Ejemplo: const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});