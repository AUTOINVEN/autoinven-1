exports.editItem = function (req, res, db) {
    var rfid = req.body.editItem_rfid;
    var name = req.body.editItem_name;
    var num = req.body.editItem_num;

    var editSQL = `UPDATE iot SET name='${name}',num='${num}' WHERE rfid='${rfid}'`
    var check = db.query(editSQL);
    if (!check) {
        console.log("error ocurred", error);
        res.redirect('Warehousing');
    } else {
        res.redirect('Warehousing');
    }
}
