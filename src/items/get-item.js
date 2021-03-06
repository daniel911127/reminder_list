var { getConnection } = require('../database');

function getItem(req, res, next) {
    getConnection(function (err, connection) {
        if (err) {
            res.send({
                response: 'Error connecting to database. ' + err
            });
            next();

        } else {
            var sql = `SELECT * FROM items WHERE id_list='${req.params.id_list}' AND id_message='${req.params.id_message}' `;

            connection.query(sql, function (err, result) {
                if (err) {
                    res.send({
                        response: 'Error getting item. ' + err
                    });
                } else {
                    //console.log(result);

                    res.send({
                        result
                    });
                }

                connection.release();
                next();
            });
        }
    });
}

module.exports = {
    getItem: getItem
}