exports.registerItem = function (req, res, db) {
    var RFID = req.body.RFID.toUpperCase();
    var name = req.body.name;
    var num = req.body.num;
    var received = 0;
    var picture = `./${RFID}.jpg`;
    var id = req.session['memberID'];
    var wid = req.session['warehouseID'];

    var row = db.query(`INSERT INTO iot VALUES('${RFID}', '${id}', '${name}', ${num}, ${received}, '${picture}',${wid});`);
    if (!row) console.log('err: registerItem');
    else res.redirect('Warehousing');
}
