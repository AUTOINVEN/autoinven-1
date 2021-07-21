exports.init = function(req, res, db) {
	var id = req.session['memberID'];
	var wid = req.session['warehouseID'];
	var row = db.query(`SELECT memberID FROM Provider WHERE warehouseID=?;`, [wid]);
	console.log(row[0].memberID + ", " + id);
	if (!row) console.log('err: check user');
	else if (row[0].memberID == id) {		
		var query = db.query("SELECT * FROM iot WHERE warehouseID=?;", [wid]);
		if (!query) console.log('err: warehousing init');
		else {
			var items = '';
			for (var i = 0; i < query.length; i++) {
				query[i].received = query[i].received ? '입고완료' : '미입고';
				items += `
				<tr>
					<td>${query[i].rfid}</td>
					<td>${query[i].name}</td>
					<td>${query[i].num}</td>
					<td>${query[i].received}</td>
					<td><button class="checkBtn" onclick="location.href='${query[i].picture}'">확인</button></td>
					<td><button class="btn btn-primary" id="editBtn" onclick="location.href='/iot/editItem'">수정</button></td>
					<td><button class="btn btn-primary" onclick="deleteItem(${query[i].rfid})">삭제</button></td>
				</tr>
			  `;
			}
			res.render('Iot/warehousing', {table_data: items});
		}
	} else {
		var query = db.query("SELECT * FROM iot WHERE id=? and warehouseID=?;", [id, wid]);
		if (!query) console.log('err: warehousing init');
		else {
			var items = '';
			for (var i = 0; i < query.length; i++) {
				query[i].received = query[i].received ? '입고완료' : '미입고';
				items += `
				<tr>
					<td>${query[i].rfid}</td>
					<td>${query[i].name}</td>
					<td>${query[i].num}</td>
					<td>${query[i].received}</td>
					<td><button class="checkBtn" onclick="location.href='${query[i].picture}'">확인</button></td>
				</tr>
			`;
			}
			res.render('Iot/warehousing', {table_data: items});
		}
	}
}

exports.registerItem = function(req, res, db) {
	var rfid = req.body.rfid.toUpperCase();
	var name = req.body.name;
	var num = req.body.num;
	var received = 0;
	var picture = `./${rfid}.jpg`;
	var id = req.session['memberID'];
	var wid = req.session['warehouseID'];

	var row = db.query(`INSERT INTO iot VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}',${wid});`);
	if (!row) console.log('err: registerItem');
	else res.redirect('warehousing');
}

exports.editItem = function(req, res, db) {
	//var rfid = req.body.rfid.toUpperCase();
	//var rfid = req.body.rfid.toUpperCase();
	
	var name = req.body.name;
	var num = req.body.num;

	var editSQL=`UPDATE iot SET name=?,num=? WHERE rfid='${req.body.rfid}'`
	var row = db.query(editSQL,[name, num]);
	if (!row) console.log('err: registerItem');
	else res.redirect('warehousing');
}

exports.randomTest = function(req, res, db) {
	var types = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg'];
	var rfid = Math.random().toString(16).substr(2,8).toUpperCase();
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