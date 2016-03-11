var promise = require('bluebird');
var express = require('express');
var router = express.Router();

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);


// return ALL puppies
router.get('/api/puppies', function(req, res, next) {
  db.any('select * from pups')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrived ALL puppies'
        });
    })
    .catch(function(err) {
      return next(err);
    });
});

// return SINGLE puppy
router.get('/api/puppies/:id', function(req, res, next) {
  var pupID = req.params.id;
  db.one('select * from pups where id = $1', pupID)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrived ONE puppy'
        });
    })
    .catch(function(err) {
      return next(err);
    });
});

// insert puppy
router.post('/api/puppies', function(req, res, next) {
  db.none('insert into pups(name, breed, age, sex) values(${name}, ${breed}, ${age}, ${sex})', req.body)
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function(err) {
      return next(err);
    });
});

// update puppy
router.put('/api/puppies/:id', function(req, res, next) {
  db.none('update pups set $1~=$2 where id=$3', [req.body.column, req.body.value, req.params.id])
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function(err) {
      return next(err);
    });
});

// remove puppy
router.delete('/api/puppies/:id', function(req, res, next) {
  var pupID = req.params.id;
  db.result('delete from pups where id = $1', pupID)
    .then(function(result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      return next(err);
    });
});


module.exports = router;