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
// var questionSchema =  Schema ({
// 	question : String,
// 	choice1 : {name:String , hits: Number},
// 	choice2 : {name:String , hits: Number},
// 	choice3 : {name:String , hits: Number}
// })var questionSchema =  Schema ({
// 	question : String,
// 	choice1 : {name:String , hits: Number},
// 	choice2 : {name:String , hits: Number},
// 	choice3 : {name:String , hits: Number}
// })
var Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;