exports.init = function (req, res, db) {
    if (req.session['type'] === 'admin') res.render('IoT/iot_Monitoring', {iotServer: req.session['iotServer']});
    else {
        var wid = req.session['warehouseID'];
        var row = db.query("SELECT iotServer FROM Warehouse WHERE warehouseID = ?;", [wid]);
        if (!row) res.render('Alert/cannotAccess');
        else res.render('IoT/iot_Monitoring', {iotServer: row[0].iotServer});
    }
}


exports.sessionCheck = function (req, res, db) {
    if (req.session['type'] === 'admin') {
        var wid = req.body.wid;
        req.session['warehouseID'] = wid;
        req.session['iotServer'] = req.body.iotServer;
        res.redirect('/IoT');
    }
    else {
        var wid = req.body.wid;
        var id = req.session['memberID'];
        var row = db.query(`select count(*) as num from (select memberID, warehouseID from Provider union select memberID, warehouseID from Buyer) as pb where memberID=? and warehouseID=?;`, [id, wid]);
        if (!row) console.log('err: iot.sessionCheck');
        else if (!row[0].num) res.render('Alert/cannotAccess');  // 창고 provider/buyer가 아님
        else {
            row = db.query(`select iotServer from Warehouse where warehouseID=?;`, [wid]);
            if (!row) console.log('err: iot.sessionCheck2');
            else {
                req.session['warehouseID'] = wid;
                req.session['iotServer'] = row[0].iotServer;
                res.redirect('IoT/Monitoring');
            }
        }
    }
}
