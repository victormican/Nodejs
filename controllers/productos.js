'use strict';
const Producto = require('../models/productos');
 
// Listar todos los productos en la vista principal  
exports.findAll = function(req, res) {
  Producto.findAll(function(err, producto) {    
    if (err)
    res.send(err);
    console.log('Datos:', producto);
    res.status(200).send(producto)
  });
};
 
// Crear un producto 
exports.create = function(req, res) { 
  // Mostramos un mensaje cuando los campos esten vacios 
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Por favor proporciona todos los campos requeridos !' });
  }else{
 
    // Creo un objeto para añadir el nombre de la imagen 
    const producto = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
      img: req.file.filename // Nombre de la imagen 
    }; 
  
    const nuevo_producto = new Producto(producto);
    
    Producto.create(nuevo_producto, function(err, producto) {
      if (err)
      res.send(err);
      req.flash('message', 'Producto Creado Correctamente !');
      res.redirect('/');
    });
  }
};
 
// Leer un producto  
exports.findById = function(req, res) {
  Producto.findById(req.params.id, function(err, producto) {
    if (err)
    res.send(err);
    res.json(producto);
  });
}; 
 
// Actualizar un producto 
exports.update = function(req, res) {
 
  if(req.file != null){
    console.log("No esta vacio");
 
    // Creo un objeto para añadir el nuevo nombre de la imagen 
    const producto = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
      img: req.file.filename // Nuevo nombre de la imagen 
    }; 
 
    Producto.update(req.params.id, new Producto(producto), function(err, producto) {      
      req.flash('message', 'Producto Actualizado Correctamente !');
      res.redirect('/');
    });
 
  }else{
 
    console.log("Si esta vacio");
 
    Producto.findById(req.params.id, function(err, producto) {    
      const key = "img";
      const value = producto[0].img;
 
      // Creo un objeto para mantener el nombre actual de la imagen 
      const aproducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        [key]: value, // Nombre actual de la imagen 
      }; 
 
      Producto.update(req.params.id, new Producto(aproducto), function(err, aproducto) {      
        req.flash('message', 'Producto Actualizado Correctamente !');
        res.redirect('/');
      });
 
    });     
 
  }    
  
};
 
// Eliminar un producto 
exports.delete = function(req, res) {
  Producto.delete( req.params.id, function(err, producto) {
    req.flash('message', 'Producto Eliminado Correctamente !');
    res.redirect('/');
  });
};