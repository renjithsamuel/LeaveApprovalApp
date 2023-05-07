const mongoose = require('mongoose');

const approvalUsers =  mongoose.Schema({
    username : {
        type : String,
    },
    password : {
        type : String
    },
    isAdmin :{
        type : Boolean
    }
});

const approvalModel = mongoose.model('approvalUsers',approvalUsers);
module.exports = approvalModel;
