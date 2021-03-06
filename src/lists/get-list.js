var { getConnection } = require('../database');

function getList(req, res, next) {
    getConnection(function (err, connection) {
        if (err) {
            res.send({
                response: 'Error connecting to database. ' + err
            });
            next();

        } else {
            var sql = `SELECT * FROM lists WHERE id_user='${req.params.id_user}' AND id_list='${req.params.id_list}'`;

            connection.query(sql, function (err, result) {
                if (err) {
                    res.send({
                        response: 'Error getting list. ' + err
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
    getList: getList
}