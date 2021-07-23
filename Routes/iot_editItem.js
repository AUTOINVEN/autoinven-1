exports.editItem = function (req, res, db) {
    var rfid = req.body.edititem_rfid;
    var name = req.body.edititem_name;
    var num = req.body.edititem_num;

    var editSQL = `UPDATE iot SET name='${name}',num='${num}' WHERE rfid='${rfid}'`
    var check = db.query(editSQL);
    if (!check) {
        console.log("error ocurred", error);
        res.redirect('warehousing');
    } else {
        res.redirect('warehousing');
    }
}
