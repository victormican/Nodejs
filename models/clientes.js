'use strict';
var conexion = require('../config/db');

// Campos del cliente (Objeto)
var Cliente = function(cliente){
  this.ced_cliente      = cliente.ced_cliente;
  this.direccion_cliente = cliente.direccion_cliente;
  this.email_c          = cliente.email_c;
  this.nom_cliente      = cliente.nom_cliente;
  this.tel_cliente      = cliente.tel_cliente;
};

// Crear un Cliente
Cliente.create = function (newCliente, result) {
  conexion.query("INSERT INTO clientes SET ?", newCliente, function (err, res) {
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

// Leer un Cliente por su cédula
Cliente.findByCedula = function (cedula, result) {
  conexion.query("SELECT * FROM clientes WHERE ced_cliente = ?", cedula, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
  });
};

// Listar todos los clientes en la Vista Principal
Cliente.findAll = function (result) {
  conexion.query("SELECT * FROM clientes", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

// Actualizar un Cliente por su cédula
Cliente.update = function(cedula, cliente, result){
  conexion.query("UPDATE clientes SET direccion_cliente=?, email_c=?, nom_cliente=?, tel_cliente=?, updated_at=? WHERE ced_cliente = ?", [cliente.direccion_cliente, cliente.email_c, cliente.nom_cliente, cliente.tel_cliente, cliente.updated_at, cedula], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
  });
};

// Eliminar un Cliente por su cédula
Cliente.delete = function(cedula, result){
  conexion.query("DELETE FROM clientes WHERE ced_cliente = ?", [cedula], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};

module.exports = Cliente;
