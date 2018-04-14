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

	var question = req.body.question;
	var choice1 = req.body.choice1;
	var choice2 = req.body.choice2;
	var choice3 = req.body.choice3;


var question = new db.Question({
	question : question,
	choice1 : choice1,
	choice2 : choice2,
	choice3 : choice3
})

var question = new db.Question({
	question : question,
	choice1 : {name: choice1, hits: 0},
	choice2 : {name: choice2, hits: 0},
	choice3 : {name: choice3, hits: 0}
})

question.save(function(){console.log("saved")})

})
app.get('/poll',function(req,res){
	db.Question.find({},function(err,questions){
		res.send("<h1>"+questions[3].question+"</h1><br><form \
			action='/poll' method='post'><label for='choice1'>"+questions[4].choice1.name+"</label>\
      <input type='submit' id='choice1' value='vote' name='choice1'><p>"+questions[4].choice3.hits+"</p></form>"+
      "<form action='/poll' method='post'><label for='choice2'>"+questions[4].choice2.name+"</label>\
      <input type='submit' id='choice2' value='vote' name='choice2'><p>"+questions[4].choice2.hits+"</p></form>"+
      "<form action='/poll' method='post'><label for='choice3'>"+questions[4].choice3.name+"</label>\
      <input type='submit' id='choice3' value='vote' name='choice3'><p>"+questions[4].choice3.hits+"</p></form>")
	})

})

app.post('/poll',function(req,res){
	console.log("poll post", req.body)
if(req.body.choice1){db.Question.update({ question: "how do you feel" }, { 'choice1.hits' :'choice1.hits'+1}, function(){});}
if(req.body.choice2){db.Question.update({ question: "how do you feel" }, { 'choice2.hits' :'choice1.hits'+1}, function(){});}
if(req.body.choice3){db.Question.update({ question: "how do you feel" }, { 'choice3.hits' :'choice1.hits'+1}, function(){});}

	
	res.redirect("/poll");
})
var port =3000;
app.listen(port,function(){
	console.log("listeninig to port",port)
});




