var restify = require('restify');
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: 3306,
  database: 'reminder_list'
});

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.post('/users', function (req, res, next) {
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
      var sql = `INSERT INTO users (name, pasword,country,city,email) VALUES ('${req.body.nickname}', '${req.body.password}','${req.body.country}','${req.body.city}','${req.body.email}')`;

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
});
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
