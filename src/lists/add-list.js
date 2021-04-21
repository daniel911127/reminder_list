var { getConnection } = require('../database');

function addList(req, res, next) {
    if (!req.body.namelist) {
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
          var sql = `INSERT INTO lists (name_list) VALUES ('${req.body.namelist}')`;
    
          connection.query(sql, function (err, result) {
            if (err) {
              res.send({
                response: 'Error inserting list. ' + err
              });
            } else {
              res.send({
                response: 'List inserted'
              });
            }
    
            connection.release();
            next();
          });
        }
      });
};
    module.exports = {
        addList: addList
      }