const mysql = require('sync-mysql');

var db_info = {
    host : process.env.MYSQL_HOST_IP, //docker mysql container의 ip주소로 변경해주어야함.
    user : process.env.DB_ID,
    port : process.env.DB_PORT,
    password : process.env.DB_PW,
    database : process.env.DB_DATABASE
};

module.exports = {
    init : function(){
	    var connection = new mysql(db_info);
	    return connection;
    },
	info : db_info
}
