var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017';
var dbname = 'MongoDB';
var objectId = require('mongodb').ObjectID;
var db;

mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
  if(!err) {
    console.log("Conexion exitosa.");
    db = client.db(dbname);
  }
});

router.post('/api/v1/factura/create/', function(req, res, next) {
  const factura = {
    serie: req.body.serie,
    numero: req.body.numero,
    fecha: req.body.fecha,
    nit: req.body.nit,
    nombre: req.body.nombre,
    anulada: req.body.anulada
  }
  db.collection('Facturas').insertOne(factura, function(err, result){
    assert.equal(null, err);
    if (err) {
      return console.log(err)
    } else {
      console.log("Factura creada exitosamente.");
      res.status(201).send(result);
    }
  });
});

router.get('/api/v1/factura/read/', function(req, res, next) {
  db.collection('Facturas').find().toArray((err, result) => {
    if (err) {
      return console.log(err)
    } else {
      res.send({facturas: result})
    }
  })
});

router.put('/api/v1/factura/update/:id', function(req, res, next) {
  var currentlyEditing = req.params.id;
  const factura = req.body[currentlyEditing];
  console.log(factura);
  const fac = {
    serie: factura.serie,
    numero: factura.numero,
    fecha: factura.fecha,
    nit: factura.nit,
    nombre: factura.nombre,
    anulada: factura.anulada
  }
  console.log(fac);
  db.collection('Facturas').updateOne({"_id": objectId(factura._id)}, {$set: fac}, function(err, result) {
    assert.equal(null, err);
    if (err) {
      return console.log(err)
    } else {
      console.log('Factura modificada exitosamente.');
      res.status(200).send(result);
    }
  });
});

router.delete('/api/v1/factura/delete/:id', function(req, res, next) {
  var id = req.params.id;
  db.collection('Facturas').deleteOne({"_id": objectId(id)}, function(err, result) {
    assert.equal(null, err);
    if (err) {
      return console.log(err)
    } else {
      console.log('Factura eliminada exitosamente.');
      res.status(200).send(result);
    }
  });
});

module.exports = router;
