module.exports = function(mysql) {
	var db = mysql.createPool({
		connectionLimit : 100,
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'app',
		debug    :  false
	});

	db.testConnection = function() {
		var res = {}, req = {};
		
		db.getConnection(function(err, connection){
	        if (err) {
	        	console.log("ERROR: could not connect to database {database.js}");
	          	connection.release();	     
	          	res.json({"code" : 100, "status" : "Error in connection database"});
	          	return false;
	        }   

        	console.log('connected as id ' + connection.threadId);
        
	        connection.query("select * from session", function(err, rows){	        
	            connection.release();	          
	            if(!err) {
	                console.dir(rows);
	            } else {
	            	console.log("Database error:");
	            	console.dir(err);

	            	return false;
	            }   
	        });

	        connection.on('error', function(err) {      
	              res.json({"code" : 100, "status" : "Error in connection database"});
	              return false;     
	        });
	    });
	};

	return db;
};