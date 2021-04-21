var restify = require('restify');

var { addUser } = require('./users/add-user');
var { getUsers } = require('./users/get-user');

var { addList } = require('./lists/add-list');
var { getLists } = require('./lists/get-list');

var { addItem } = require('./items/add-item');
var { getItems } = require('./items/get-item');


var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.post('/users',getUsers);
server.get('/users',addUser);

server.post('/lists',getLists);
server.get('/lists',addList);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
