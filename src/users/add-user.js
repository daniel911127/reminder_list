var { getConnection } = require('../database');

function addUser(req, res, next) {
    var name=req.body.name;
    var password=req.body.password;
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
          var sql = `INSERT INTO users (name, pasword,country,city,email) VALUES ('${name}', '${password}','${country}','${city}','${email}')`;
    
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