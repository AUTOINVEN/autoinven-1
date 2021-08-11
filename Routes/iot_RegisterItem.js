exports.registerItem = function (req, res, db) {
    var rfid = req.body.rfid.toUpperCase();
    var name = req.body.name;
    var num = req.body.num;
    var received = 0;
    var picture = `./${rfid}.jpg`;
    var id = req.session['memberID'];
    var wid = req.session['warehouseID'];

    var row = db.query(`INSERT INTO iot VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}',${wid});`);
    if (!row) console.log('err: registerItem');
    else res.redirect('Warehousing');
}
