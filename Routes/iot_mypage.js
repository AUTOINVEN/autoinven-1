exports.init = function(req, res, db) {
    var id = req.session['memberID'];
    var wid = req.session['warehouseID'];
	if(!id) res.redirect('/User/Login');
	else if (!wid) res.status(401).send('잘못된 접근입니다.');
	else {
		var row = db.query("SELECT * FROM Member WHERE memberID=?;", [id]);
		if (!row) console.log('err: mypage');
		else res.render('Iot/mypage', {uname: row[0].name});
    }
}


exports.sessionCheck = function (req, res, db) {
	var id = req.session['memberID'];
	var wid = req.body.wid;
	if(!id) res.redirect('/User/Login');
	else {
		var row = db.query(`select count(*) as num from (select memberID, warehouseID from Provider union select memberID, warehouseID from Buyer) as pb where memberID=? and warehouseID=?;`, [id, wid]);
		if (!row) console.log('err: iot.sessionCheck');
		else if (!row[0].num) res.status(401).send('잘못된 접근입니다.');
		else {
			req.session['warehouseID'] = wid;
			res.redirect('/iot');
		}
	}
}
