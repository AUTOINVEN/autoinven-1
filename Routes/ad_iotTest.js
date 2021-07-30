exports.init = function (req, res, app, db) {
    var wid = req.params.wid;
    var rows = db.query(`SELECT * FROM Warehouse WHERE warehouseID=${wid}`);
    if (!rows.length) res.render('Alert/cannotAccess');
    else res.render('User/Admin/ad_iotTest', {'app': app, 'session': req.session, 'wid': wid});
}
