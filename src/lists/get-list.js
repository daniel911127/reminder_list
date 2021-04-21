var { getConnection } = require('../database');

function getLists(req, res, next) {
    getConnection(function (err, connection) {
      if (err) {
        res.send({
          response: 'Error connecting to database. ' + err
        });
        next();
  
      } else {
        var sql = `SELECT * FROM lists`;
  
        connection.query(sql, function (err, result) {
          if (err) {
            res.send({
              response: 'Error getting list. ' + err
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
      getLists:getLists
  }