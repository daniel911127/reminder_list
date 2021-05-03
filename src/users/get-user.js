var { getConnection } = require('../database');

function getUser(req, res, next) {
    getConnection(function (err, connection) {
      if (err) {
        res.send({
          response: 'Error connecting to database. ' + err
        });
        next();
  
      } else {
        var sql = `SELECT * FROM users WHERE id_user='${req.params.id_user}'`;
  
        connection.query(sql, function (err, result) {
          if (err) {
            res.send({
              response: 'Error getting user. ' + err
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
      getUser:getUser
  }