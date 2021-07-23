exports.init = function (req, res, db) {
    var id = req.session['memberID'];
    var row = db.query("SELECT * FROM Member WHERE memberID = ?;", [id]);
    if (!row) console.log('err: mypage');
    else res.render('Iot/mypage', {uname: row[0].name});
}
