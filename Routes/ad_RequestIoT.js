exports.RequestForIoT = function (req, res, app, db) {
    var items = {};
    let results = db.query("SELECT * from Warehouse, Provider, Member WHERE Warehouse.warehouseID=Provider.warehouseID and Provider.memberID=Member.memberID and Warehouse.iotStat='W';");
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            results[step].price = results[step].price * results[step].area;
            items[`item${step}`] = {
                warehouseID: results[step].warehouseID,
                memberID: results[step].memberID,
                national: results[step].national,
                address: results[step].address,
                name: results[step].name
            };
        }
    }
    return JSON.stringify(items);
}

exports.withAnswer = function (req, res, app, db) {
    var warehouseID = req.session['warehouseID'];
    var answer = req.body.answer;
    var iotServer = req.body.iotServer;
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    if (answer == "Approve") {
        connection.query(`UPDATE Warehouse SET iotStat='Y', iotServer='${iotServer}' WHERE warehouseID=${warehouseID}`, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(false);
                connection.end();
            } else {
                res.send(true);
                connection.end();
            }
        });
    } else if (answer == "Reject") {
        connection.query(`UPDATE Warehouse SET iotStat='N' WHERE warehouseID=${warehouseID}`, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(false);
                connection.end();
            } else {
                res.send(true);
                connection.end();
            }
        });
    }
}
