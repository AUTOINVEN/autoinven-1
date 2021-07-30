exports.init = function (req, res, db) {
    var wid = req.session['warehouseID'];
    var row = db.query("SELECT iotServer FROM Warehouse WHERE warehouseID = ?;", [wid]);
    console.log(`ws url: ${row[0]}`);
    if (!row) res.render('Alert/cannotAccess');
    else res.render('Iot/monitoring', {iotServer: row[0]});
}
