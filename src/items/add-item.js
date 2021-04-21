var { getConnection } = require('../database');

function addItem(req, res, next) {
    if (!req.body.message) {
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
          var sql = `INSERT INTO items (message) VALUES ('${req.body.message}')`;
    
          connection.query(sql, function (err, result) {
            if (err) {
              res.send({
                response: 'Error inserting item. ' + err
              });
            } else {
              res.send({
                response: 'item inserted'
              });
            }
    
            connection.release();
            next();
          });
        }
      });
};
    module.exports = {
        addItem : addItem
      }