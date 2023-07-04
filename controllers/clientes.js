'use strict';
const Cliente = require('../models/clientes');

// Listar todos los clientes en la vista principal
exports.findAll = function(req, res) {
  Cliente.findAll(function(err, clientes) {
    if (err)
    res.send(err);
    console.log('Datos:', clientes);
    res.status(200).send(clientes);
  });
};

// Crear un cliente
exports.create = function(req, res) {
  // Mostramos un mensaje cuando los campos estén vacíos
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Por favor proporciona todos los campos requeridos !' });
  }else{

    // Creo un objeto para añadir el nombre de la imagen
    const cliente = {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: req.body.direccion
    };

    const nuevo_cliente = new Cliente(cliente);

    Cliente.create(nuevo_cliente, function(err, cliente) {
      if (err)
      res.send(err);
      req.flash('message', 'Cliente Creado Correctamente !');
      res.redirect('/');
    });
  }
};

// Leer un cliente
exports.findById = function(req, res) {
  Cliente.findById(req.params.id, function(err, cliente) {
    if (err)
    res.send(err);
    res.json(cliente);
  });
};

// Actualizar un cliente
exports.update = function(req, res) {

  Cliente.update(req.params.id, new Cliente(req.body), function(err, cliente) {
    req.flash('message', 'Cliente Actualizado Correctamente !');
    res.redirect('/');
  });
};

// Eliminar un cliente
exports.delete = function(req, res) {
  Cliente.delete( req.params.id, function(err, cliente) {
    req.flash('message', 'Cliente Eliminado Correctamente !');
    res.redirect('/');
  });
};
