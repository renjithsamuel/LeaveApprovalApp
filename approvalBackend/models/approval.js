const mongoose = require('mongoose');

let approvalSchema = mongoose.Schema({
    approval : {
        type : String,
        required : [true , "send the approval value"],
        default : 'pending'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'approvalUsers'
    },
    reason: {
        type : String
    },
    fromDate : String,
    toDate : String
});

const approval = mongoose.model('approvals',approvalSchema);

module.exports = approval;