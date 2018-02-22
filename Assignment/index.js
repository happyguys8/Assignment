var express = require("express");
var app=express();
var fs = require('fs');
app.use('/', express.static(__dirname + '/'));
var nano = require("nano")("http://127.0.0.1:5984");
var test_db = nano.db.use("assignment");
var gender_db = nano.db.use("input");

	
app.get('/insert', function(req, res){
	
	var data = {
		username:req.param('username'),
		password:req.param('pswd'),
		name:req.param('name'),
		email:req.param('email'),
		tel:req.param('tel'),
		dob:req.param('dob'),
		gender:req.param('gender'),
		age:req.param('age')
	};
	
	test_db.insert(data,null, function(err,body){
		if(!err){
			console.log('Insert completed');
			return res.redirect(req.get('referer'));
		}else{
			console.log(err);
		}
	})
});

// remove the item
app.get('/remove', function(req, res){
	
	test_db.destroy(req.param("id"), req.param("rev"), function(err, body, header){

		if(!err){
			console.log('Delete completed', req.param("id"));
			res.setHeader('Content-Type', 'application/json');
			res.json({"result":true});
			res.send();
		}else{
			console.log(err);
		}
	})
});

// select the user in database
app.get('/find', function(req, res){

	test_db.view('user', 'user', function(err, body){
		
		if(!err){
			var rows = body.rows;
			console.log(rows);
			res.setHeader('Content-Type', 'application/json');
			return res.send(rows);
		}
			console.log(err);
			return res.send(err);
		}
	);
});

// select the gender default value in database
app.get('/genderDropDown', function(req, res){

	gender_db.view('gender', 'default', function(err, body){
		
		if(!err){
			var rows = body.rows;
			console.log(rows);
			res.setHeader('Content-Type', 'application/json');
			return res.send(rows);
		}
			console.log(err);
			return res.send(err);
		}
	);
});

app.listen(8000);