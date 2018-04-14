var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/polls');

var db = mongoose.connection;
var Schema = mongoose.Schema;

var questionSchema =  Schema ({
	question : String,
	choice1 : String,
	choice2 : String,
	choice3 : String
})

var Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;