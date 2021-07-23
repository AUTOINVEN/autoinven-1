exports.initWarehouse = function (req, res, db) {
    var items = {};
    var id = req.session['memberID'];
    var wid = req.session['warehouseID'];
    var row = db.query(`SELECT memberID FROM Provider WHERE warehouseID=?;`, [wid]);

    if (!row) console.log('err: check user');
    else if (row[0].memberID == id) {	//Provider인 경우. 이후 admin 처리 할 때 여기에 추가하면 됨
        var results = db.query("SELECT * FROM iot WHERE warehouseID=?;", [wid]);
        if (!results) console.log('err: warehousing init');
        else {
            if (results.length > 0) {
                for (var step = 0; step < results.length; step++) {
                    results[step].received = results[step].received ? '입고완료' : '미입고';
                    items[`item${step}`] = {
                        rfid: results[step].rfid,
                        name: results[step].name,
                        num: results[step].num,
                        received: results[step].received,
                        picture: results[step].picture
                    };
                }
            }
        }
    } else {
        var results = db.query("SELECT * FROM iot WHERE id=? and warehouseID=?;", [id, wid]);
        if (!results) console.log('err: warehousing init');
        else {
            if (results.length > 0) {
                for (var step = 0; step < results.length; step++) {
                    results[step].received = results[step].received ? '입고완료' : '미입고';
                    items[`item${step}`] = {
                        rfid: results[step].rfid,
                        name: results[step].name,
                        num: results[step].num,
                        received: results[step].received,
                        picture: results[step].picture
                    };
                }
            }
        }
    }
    return JSON.stringify(items);
}

exports.delItem = function (req, res, db) {
    var rfid = req.body.itemDel;

    var delSQL = `DELETE FROM iot WHERE rfid='${rfid}';`
    var check = db.query(delSQL);
    if (!check) {
        console.log("error ocurred", error);
        res.redirect('warehousing');
    } else {
        res.redirect('warehousing');
    }
}

exports.randomTest = function (req, res, db) {
    var types = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg'];
    var rfid = Math.random().toString(16).substr(2, 8).toUpperCase();
    var name = types[Math.floor(Math.random() * types.length)];
    var num = Math.floor(Math.random() * 100) + 1;
    var received = Math.floor(Math.random() * 2);
    var picture = `./${rfid}.jpg`;
    var id = req.session['memberID'];
    var wid = req.session['warehouseID'];

    var row = db.query(`INSERT INTO iot VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}', ${wid});`);
    if (!row) console.log('err: randomTest');
    else res.redirect('warehousing');
}
