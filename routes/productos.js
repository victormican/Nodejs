const express = require('express')
const router = express.Router()
const productoController =   require('../controllers/productos'); 
 
// Multer (Subida de imágenes de los productos)
const multer = require('multer'); 
var img;
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, callback) {
 
    const img_nombre = file.originalname;  
    // Reemplazamos los espacios en blanco del nombre de la imagen con guiones 
    const img_nuevo_nombre = img_nombre.replace(/\s+/g,'-'); 
 
    // Para evitar que los achivos se reemplazen entre si, le asignamos al nombre de la
    // imagen, la hora, tiempo, etc., actual 
    const img = Date.now() + '-' + img_nuevo_nombre;     
 
    callback(null, img);
  }
}); 
var upload = multer({ storage: storage }) 
 
// Ruta para listar todos los productos 
router.get('/', productoController.findAll);
 
// Ruta para crear un nuevo producto 
router.post('/', upload.single('img'), productoController.create);
 
// Ruta para leer un producto por su ID 
router.get('/:id', productoController.findById);
 
// Ruta para actualizar un producto por su ID 
router.post('/:id', upload.single('img'), productoController.update);
 
// Ruta para eliminar un producto por su ID 
router.post('/eliminar/:id', productoController.delete); 
 
module.exports = router