const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
module.exports = mongoose.model('Question', userSchema);