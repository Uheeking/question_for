const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    name:{
        type : String,
        require: [true, "User must type name"],
    },
    text: {
        type: String
    },
    password: {
        type: String,
        require: [true, "User must type password"],
    }
});
module.exports = mongoose.model('Question', questionSchema);