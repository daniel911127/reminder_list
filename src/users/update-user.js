var { getConnection } = require('../database');

function updateUser(req, res, next) {
    var name=req.body.name;
    var password=req.body.pasword;
    var country=req.body.country;
    var city=req.body.city;
    var email=req.body.email;
    if (!name || !password || !country || !city || !email) {
      res.send({
        response: 'Body structure is incorrect'
      });
      next();
      return;
    }
    getConnection(function(err, connection) {
        if (err) {
          res.send({
            response: 'Error connecting to database. ' + err
          });
          next();
    
        } else {
          var sql = `UPDATE users  SET (name='${name}', pasword='${password}',country='${country}',city='${city}',email='${email}') WHERE id_user = '${req.params.id_user}'`;
    
          connection.query(sql, function (err, result) {
            if (err) {
              res.send({
                response: 'Error inserting user. ' + err
              });
            } else {
              res.send({
                response: 'User updated'
              });
            }
    
            connection.release();
            next();
          });
        }
      });
};
    module.exports = {
        updateUser : updateUser
      }