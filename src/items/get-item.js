var { getConnection } = require('../database');

function getItems(req, res, next) {
    getConnection(function (err, connection) {
      if (err) {
        res.send({
          response: 'Error connecting to database. ' + err
        });
        next();
  
      } else {
        var sql = `SELECT * FROM items`;
  
        connection.query(sql, function (err, result) {
          if (err) {
            res.send({
              response: 'Error getting item. ' + err
            });
          } else {
            //console.log(result);
  
            res.send({
              result
            });
          }
  
          connection.release();
          next();
        });
      }
    });
  }
  
  module.exports={
      getItems : getItems
  }