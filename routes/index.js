var express = require('express');
var router = express.Router();

var options = {
  // Initialization Options
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);


// return ALL puppies
router.get('/api/puppies', function(req, res, next) {
  db.any('select * from pups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrived ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

// return SINGLE puppy
router.get('/api/puppies/:id', function(req, res, next) {
  var pupID = req.params.id;
  db.one('select * from pups where id=$1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrived ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

// insert puppy
router.post('/api/puppies', function(req, res, next) {
  db.none('insert into pups (name, breed, age, sex) values($1, $2, $3, $4)', [req.body.name, req.body.breed, req.body.age, req.body.sex])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (error) {
      return next(err);
    });
});

// update puppy
router.put('/api/puppies/:id', function(req, res, next) {
  db.none('update pups set $1^=$2 where id=$3', [req.body.column, req.body.value, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (error) {
      return next(err);
    });
});

// remove puppy
router.delete('/api/puppies/:id', function(req, res, next) {
  var pupID = req.params.id;
  db.none('delete from pups where id=$1', pupID)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed puppy'
        });
    })
    .catch(function (error) {
      return next(err);
    });
});


module.exports = router;
