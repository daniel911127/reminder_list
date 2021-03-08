var mysql = require('mysql');
var restify=require('restify');

var con = mysql.createConnection({
  host: "localhost",
  user: "daniel",
  password: "12345678",
  database: "test",
  port: "3306"
});


/*function respond(req, res, next){
    res.send('hello' + req.params.name);
    next();
}*/

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
/*server.use(restify.plugins.bodyParser({mapParams: true}))*/
/*server.post('/users', function(req, res, next){
  if(fail){
    res.statusCode = XXXX;
    res.send('error creando usuario.');
  }else{
    res.statusCode = YYYY;
    res.send('usuario creado con exito.');
  }
  next();
});*/

//GET ALL USERS
server.get('/users',function(req, res, next){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      next();
    });
  });
  /*res.send('leyendo usuario');
  next();*/
});
//GET ALL POSTS
server.get('/posts',function(req, res, next){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM posts", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      next();
    });
  });
  /*res.send('leyendo usuario');
  next();*/
});
//GET ONE USERS
server.get('/users/:apodo',function(req, res, next){
  var id = req.params.apodo;
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT * FROM users WHERE nickname = "${id}"` , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      next();
    });
  });
  /*res.send('leyendo usuario');
  next();*/
});
//GET ONE POST
server.get('/posts/:apodo',function(req, res, next){
  var id = req.params.apodo;
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT * FROM posts WHERE nickname = "${id}"` , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      next();
    });
  });
  /*res.send('leyendo usuario');
  next();*/
});
//CREATE USER
server.post('/users',function(req, res, next){
  con.connect(function(err){
    var sql = `INSERT INTO users (nickname, name, age, country, profesion)
          VALUES('${req.body.nickname}','${req.body.name}', ${req.body.age},'${req.body.country}', '${req.body.profesion}')`;
          con.query(sql, function(err,result){
            if (err) throw err;
            console.log( "1 record inserted" );
            res.send({response:"ok"});
            res.next();
          });
      });



  /*if (req.body.message && req.body.user) {
        var text = req.body.message;
        var user = req.body.user;
        console.log(user + ": " + text);

        res.send({ response: "OK" });
    } else {
        res.send(400, { response: "Incorrect JSON structure" });
    }
    return next();-----
    console.log(message);
    res.send('usuario recibido');
    next();*/
});

server.listen(8080, function(){
  console.log('%s listening at %s', server.name, server.url);
});


/*
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
*/
//curl -X POST http://localhost:8080/users --data '{"nickname": "chuspi", "name": "Patricia Contreras", "age": 63,"country":"COL", "profesion":"ama de casa"}'
