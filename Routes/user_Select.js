// ȸ������ �ڵ鷯
exports.register = function (req, res, app, db) {
    var mysql = require('mysql');

    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    var user = {
        type: req.body.type
    }

    connection.query('INSERT INTO Member SET ?', user, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send(false);
        } else {
            req.session['type'] = user.type;
            res.send(true);
        }
        connection.end()
    });
}
