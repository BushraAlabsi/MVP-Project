var express = require('express');
var parser = require('body-parser');
var db = require('../DB/db.js');
var app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.post('/',function(req,res){
	console.log(req.body)
	console.log(req.body.question)
	var route = req.body.route
	var question = req.body.question;
	var choice1 = req.body.choice1;
	var choice2 = req.body.choice2;
	var choice3 = req.body.choice3;

var question = new db.Question({
	route  : route,
	question : question,
	choice1 : {name: choice1, hits: 0},
	choice2 : {name: choice2, hits: 0},
	choice3 : {name: choice3, hits: 0}
})

question.save(function(err, data){console.log("saved")
res.send("your poll has been generated!, your route is: "+data.route)})

})
app.get('/*',function(req,res){
	
	db.Question.find({route : req.url},function(err,question){
		res.send("<h1 style='font-size: 45px'>"+question[0].question+"</h1><br><form \
					action="+question[0].route+" method='post'><label style='font-size: 25px' for='choice1'>"+question[0].choice1.name+"</label>\
		      <input type='submit' id='choice1' style= 'width:3% ;font-size: 30px; height:10%;' value='vote' name='choice1'><p style='font-size: 20px'>"+question[0].choice1.hits+"</p></form>"+
		      "<form action="+question[0].route+" method='post'><label style='font-size: 25px'' for='choice2'>"+question[0].choice2.name+"</label>\
		      <input type='submit' id='choice2' style= 'width:3%; font-size: 30px; height:10%;' value='vote' name='choice2'><p style='font-size: 20px'>"+question[0].choice2.hits+"</p></form>"+
		      "<form action="+question[0].route+" method='post'><label style='font-size: 25px' for='choice3'>"+question[0].choice3.name+"</label>\
		      <input type='submit' id='choice3' style= 'width:3%; font-size: 30px; height:10%;' value='vote' name='choice3'><p style='font-size: 20px'>"+question[0].choice3.hits+"</p></form></body>")
	})

})

app.post('/*',function(req,res){
	console.log(req.url) 
if(req.body.choice1){db.Question.update({route : req.url}, { $inc: {'choice1.hits': 1 } }, function(){});}
if(req.body.choice2){db.Question.update({route : req.url}, { $inc: {'choice2.hits': 1 }}, function(){});}
if(req.body.choice3){db.Question.update({route : req.url}, { $inc: {'choice3.hits': 1 }}, function(){});}

	
	res.redirect(req.url);
})
var port =3000;
app.listen(port,function(){
	console.log("listeninig to port",port)
});




