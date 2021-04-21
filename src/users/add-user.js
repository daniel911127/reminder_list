var { getConnection } = require('../database');

function addUser(req, res, next) {
    if (!req.body.name || !req.body.pasword || !req.body.country || !req.body.city || !req.body.email) {
      res.send({
        response: 'Body structure is incorrect'
      });
      next();
      return;
    }
    pool.getConnection(function(err, connection) {
        if (err) {
          res.send({
            response: 'Error connecting to database. ' + err
          });
          next();
    
        } else {
          var sql = `INSERT INTO users (name, pasword,country,city,email) VALUES ('${req.body.name}', '${req.body.password}','${req.body.country}','${req.body.city}','${req.body.email}')`;
    
          connection.query(sql, function (err, result) {
            if (err) {
              res.send({
                response: 'Error inserting user. ' + err
              });
            } else {
              res.send({
                response: 'User inserted'
              });
            }
    
            connection.release();
            next();
          });
        }
      });
};
    module.exports = {
        addUser : addUser
      }