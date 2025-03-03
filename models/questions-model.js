//Import the mongoose package
//Define the schema:
//question: String
//options: array of objects : [{id:, value}]
// answer : object {id, value}
//export the Schema

const mongoose = require ("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    options : [{id: Number, value: String}],
    answer: {id: Number, value: String},
});

//module.exports = mongoose.model("Question", questionSchema);
// OR 
module.exports = mongoose.models?.Question || mongoose.model("Question", questionSchema);
