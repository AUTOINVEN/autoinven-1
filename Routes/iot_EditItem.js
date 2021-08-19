exports.editItem = function (req, res, db) {
    var rfid = req.body.RFID;
    var name = req.body.name;
    var num = req.body.num;

    var editSQL = `UPDATE iot SET name='${name}',num='${num}' WHERE rfid='${rfid}'`
    var check = db.query(editSQL);
    if (!check) {
        console.log("error ocurred");        
        res.send("error")
    } else {
        res.send("success")
    }
}
