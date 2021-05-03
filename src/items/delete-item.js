var { getConnection } = require('../database');

function deleteItem(req, res, next) {

    var id_message = req.params.id_message;
    var id_list = req.params.id_list;
    getConnection(function (err, connection) {
        if (err) {
            res.send({
                response: 'Error connecting to database. ' + err
            });
            next();

        } else {
            var sql = `DELETE FROM items WHERE id_list = '${id_list}' AND id_message = '${id_message}'`;
            console.log(sql);

            connection.query(sql, function (err, result) {
                if (err) {
                    res.send({
                        response: 'Error deleting item. ' + err
                    });
                } else {
                    res.send({
                        result: 'item deleted'
                    });
                }

                connection.release();
                next();
            });
        }
    });
}

module.exports = {
    deleteItem: deleteItem
}