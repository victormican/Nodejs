const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientes');

// Multer (Subida de imágenes de los clientes)
const multer = require('multer');
var img;
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    const img_nombre = file.originalname;
    // Reemplazamos los espacios en blanco del nombre de la imagen con guiones
    const img_nuevo_nombre = img_nombre.replace(/\s+/g, '-');

    // Para evitar que los achivos se reemplazen entre si, le asignamos al nombre de la
    // imagen, la hora, tiempo, etc., actual
    const img = Date.now() + '-' + img_nuevo_nombre;

    callback(null, img);
  },
});
var upload = multer({ storage: storage });

// Ruta para listar todos los clientes
router.get('/', clienteController.findAll);

// Ruta para crear un nuevo cliente
router.post('/', upload.single('img'), clienteController.create);

// Ruta para leer un cliente por su ID
router.get('/:id', clienteController.findById);

// Ruta para actualizar un cliente por su ID
router.post('/:id', upload.single('img'), clienteController.update);

// Ruta para eliminar un cliente por su ID
router.post('/eliminar/:id', clienteController.delete);

module.exports = router;
