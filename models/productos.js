'use strict';
var conexion = require('../config/db');
 
// Campos del producto (Objeto) 
var Producto = function(producto){
  this.nombre     = producto.nombre;
  this.precio     = producto.precio;
  this.stock      = producto.stock;
  this.img        = producto.img;
  this.updated_at = new Date();
};
 
// Crear un Producto 
Producto.create = function (newEmp, result) {
  conexion.query("INSERT INTO productos set ?", newEmp, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
 
// Leer un Producto por su ID 
Producto.findById = function (id, result) {
  conexion.query("Select * from productos where id = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};
 
// Listar todos los productos en la Vista Principal 
Producto.findAll = function (result) {
  conexion.query("Select * from productos", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
}; 
 
// Actualizar un Producto por su ID 
Producto.update = function(id, producto, result){
  conexion.query("UPDATE productos SET nombre=?,precio=?,stock=?,img=?,updated_at=? WHERE id = ?", [producto.nombre,producto.precio,producto.stock,producto.img,producto.updated_at, id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
  });
}; 
 
// Eliminar un Producto por su ID 
Producto.delete = function(id, result){
  conexion.query("DELETE FROM productos WHERE id = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};
module.exports = Producto;