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


question.save(function(){console.log("saved")})

})
app.get('/poll',function(req,res){
	db.Question.find({},function(err,questions){
		res.send(questions)
	})
	
})
var port =3000;
app.listen(port,function(){
	console.log("listeninig to port",port)
});




