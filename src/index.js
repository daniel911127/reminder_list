var restify = require('restify');

var { addUser } = require('./users/add-user');
var { getUser } = require('./users/get-user');
var { deleteUser } = require('./users/delete-user');
var { updateUser } = require('./users/update-user')

var { addList } = require('./lists/add-list');
var { getList } = require('./lists/get-list');
var { deleteList } = require('./lists/delete-list');

var { addItem } = require('./items/add-item');
var { getItem } = require('./items/get-item');
var { deleteItem } = require('./items/delete-item');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.post('/users', addUser);
server.get('/users/:id_user', getUser);
server.del('/users/:id_user', deleteUser);
server.put('/users/:id_user', updateUser);

server.post('/users/:id_user/lists', addList);
server.get('/users/:id_user/lists/:id_list', getList);
server.del('/users/:id_user/lists/:id_list', deleteList);

server.get('/users/:id_user/lists/:id_list/items/:id_message', getItem);
server.post('/users/:id_user/lists/:id_list/items', addItem);
server.del('/users/:id_user/lists/:id_list/items/:id_message', deleteItem);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
