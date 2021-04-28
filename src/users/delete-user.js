var { getConnection } = require('../database');

function deleteUser(req, res, next) {
  var id_user=req.params.id_user;
    getConnection(function (err, connection) {
        if (err) {
          res.send({
            response: 'Error connecting to database. ' + err
          });
          next();
    
        } else {
          var sql = `DELETE FROM users WHERE id_user = '${id_user}'`;
          //console.log(sql);
    
          connection.query(sql, function (err, result) {
            if (err) {
              res.send({
                response: 'Error deleting user. ' + err
              });
            } else {
              res.send({
                result: 'user deleted'
              });
            }
    
            connection.release();
            next();
          });
        }
      });
}

module.exports={
    deleteUser:deleteUser
}