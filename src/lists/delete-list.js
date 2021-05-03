var { getConnection } = require('../database');

function deleteList(req, res, next) {
    var id_user = req.params.id_user;
    var id_list = req.params.id_list;
    getConnection(function (err, connection) {
        if (err) {
            res.send({
                response: 'Error connecting to database. ' + err
            });
            next();

        } else {
            var sql = `DELETE FROM lists WHERE id_user = '${id_user}' and id_list = '${id_list}'`;
            console.log(sql);

            connection.query(sql, function (err, result) {
                if (err) {
                    res.send({
                        response: 'Error deleting list. ' + err
                    });
                } else {
                    res.send({
                        result: 'list deleted'
                    });
                }

                connection.release();
                next();
            });
        }
    });
}

module.exports = {
    deleteList: deleteList
}