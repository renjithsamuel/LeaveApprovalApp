const config = require('config');
const approvalUsers = require('../models/approvalUser');
var jwt = require('jsonwebtoken');

exports.getApprovalUsers =async (req,res,next) => {
    let id = req.body.id;
    try {
        let ApprovalUsers = await approvalUsers.find({_id : id});
        if(!ApprovalUsers){
            return res.status(400).json({
                message : "something went wrong !",
                status : false
            });
        }
        return res.status(200).json({
            status : true,
            length : ApprovalUsers.length,
            data : ApprovalUsers
        });
    }catch(err){
        return res.status(500).json({
            message : "internal server error!" + err,
            status : false,
        })
    }
};

exports.checkUser = async (req,res,next) => {
    try {
        let user = await approvalUsers.find({
            username: req.body.username,
            password: req.body.password
        });
        if(!user.length){
            return res.status(400).json({
                message : "Invalid User",
                status : false
            });
        }
        const token = jwt.sign({
            userId: user[0]._id,
            isAdmin: user[0].isAdmin
        },`${config.get("Approval_SecretKey")}`)
        res.setHeader("token" , token);
        
        res.setHeader("Access-Control-Expose-Headers","token");
        
        return res.status(200).send({
            status : true,
            length : 1,
            data : user[0]
        });
    }catch(err){
        return res.status(500).json({
            message : "internal server error!" + err,
            status : false,
        })
    }
};

exports.postApprovalUser = async (req,res,next) =>{
    if(!req.body){
        return res.send("Send valid post request!");
    }
    let postabledata = req.body;
    // for temprovary testing purpose
    if(req.body.password === 'admin'){
        req.body.isAdmin = true;
    }
    if(postabledata.username == null || postabledata.password == null){
        return res.status(400).json({
            message : "send appropriate approval value!",
            status : false
        });
    }
    try{
        const postData = await approvalUsers.create(postabledata)
        if(!postData){
            return res.status(400).json({
                message : "Something went wrong!",
                status : false
            });
        }
        const token = jwt.sign({
            userId: postData._id,
            isAdmin: postData.isAdmin
        },`${config.get("Approval_SecretKey")}`)
        res.setHeader("token" , token);
        return res.status(200).json({
            message : "Data posted successfully!",
            status : true,
            data : postData,
        });
    }
    catch(err){
        return res.status(500).json({
            message : "internal server error "+err.message,
            status : false
        });
    }
}