const config = require('config');
const approvals = require('../models/approval');
const approvalModel = require('../models/approvalUser');
var jwt = require('jsonwebtoken');
const rateLimit = require("express-rate-limit");

exports.loggerFunc = async (req,res,next) => {
    if(req.method == 'GET' || req.method == 'POST' ||req.method == 'PATCH' ||req.method == 'PUT' || req.method == 'DELETE'){

        console.log(`${req.method} is currently logging!`);
        next();
    }
    else{
        res.status(404).send({
            message : "requested method is not available!",
            success : false
        });
    }
}

exports.checkAdmin = async (req,res,next) => {
    // console.log(req.headers.token);
    if(!req.headers.token) return res.status(404).send("Token not Found")
    
    try{
        const payload = jwt.verify(req.headers.token, `${config.get("Approval_SecretKey")}`);
    
        if(!payload.isAdmin) return res.status(503).send("This Api is Forbidden");
    
        req.body.userId = payload.userId;
        next();
    }
    catch(err){
        res.status(400).send(err.message+"here");
        console.log(err);
    }
}

exports.apiLimiter = rateLimit({
    windowMs: 200, // 200ms
    max: 1, // limit each IP to 1 request per windowMs
    message: "Too Many Requests",
  });


exports.getApproval =async (req,res,next) => {
    try {
        // console.log('getting approval');
        let Approvals = await approvals.find().populate("userId",["username"]);
        if(!Approvals){
            return res.status(400).json({
                message : "something went wrong !",
                status : false
            });
        }
        return res.status(200).json({
            status : true,
            length : Approvals.length,
            data : Approvals
        });
    }catch(err){
        return res.status(500).json({
            message : "internal server error!" + err,
            status : false,
        })
    }
};

exports.getApprovalByUser =async (req,res,next) => {
    // console.log(req.params.id);
    try {
        let Approvals = await approvals.find({
            userId: req.params.id
        })
        // console.log(Approvals + "here!");
        if(!Approvals){
            return res.status(400).json({
                message : "something went wrong !",
                status : false
            });
        }
        return res.status(200).json({
            status : true,
            length : Approvals.length,
            data : Approvals
        });
    }catch(err){
        return res.status(500).json({
            message : "internal server error!" + err,
            status : false,
        })
    }
};

exports.postApproval = async (req,res,next) =>{
    // console.log(req.body);
    if(!req.body){
        return res.send("Send valid post request!");
    }
    let postabledata = req.body;
    try{
        const postData = await approvals.create(postabledata);
        if(!postData){
            return res.status(400).json({
                message : "Something went wrong!",
                status : false
            });
        }
        return res.status(200).json({
            message : "Data posted successfully!",
            status : true,
            data : postData,
        });
    }
    catch(err){
        return res.status(500).json({
            message : "internal server error",
            status : false
        });
    }
}

exports.putApproval = async (req,res,next) =>{
    let id = req.params.id;
    let putableData = req.body; 
    if(putableData.approval == null ){
        return res.status(400).json({
            message: "send required value to update!",
            status : false
        });
    }
    try {
        let putData = await approvals.findOneAndUpdate(id,putableData,{new:true});
        if(!putData){
            return res.status(404).json({
                message : "something went wrong!",
                status : false
            });
        }
        return res.status(200).json({
            message : "updated document successfully!",
            success : true,
            data : putData
        });
    }
    catch(err) {
        return res.status(500).json({
            message : "internal server error",
            status : false,
        });
    }   
}

exports.patchApproval = async (req,res,next) => {
    let id = req.params.id;
    let patchableData = req.body;

    if(patchableData.approval==null && patchableData.userId ==null && patchableData.reason ==null ){
        return res.status(400).json({
            message : "send atleast one value to update!",
            success : false
        });
    }
    // validating user with approval
    // try{
    //     let userXapproval = await approvals.find({_id:id});
    //     if(!userXapproval){
    //         return res.status(404).json({
    //             message : "Approval doesn't exist!",
    //             status : false
    //         });
    //     }
    //     if(userXapproval.userId != patchableData.userId){
    //         return res.status(400).json({
    //             message : "user doesn't match the approval",
    //             status : false
    //         })
    //     }
    // }catch(err){
    //     return res.status(500).json({
    //         message : 'something went wrong while validating!' + err,
    //         status : false
    //     })
    // }
    // patching the data
    try {
        let obj = {
            approval : patchableData.approval,
            reason : patchableData.reason
        };
        let patchData = await approvals.findByIdAndUpdate(id,obj,{new:true}).populate("userId",["username"]);
        if(!patchData){
            return res.status(400).json({
                message : "something went wrong!",
                success : false
            });
        }
        return res.status(200).json({
            message : "data updated successfully",
            success : true , 
            data : patchData
        });
    }catch (err){
        return res.status(500).json({
            message : "internal server error",
            success : false,
        });
    }
}


exports.deleteApproval = async (req,res,next) =>{
    let id = req.params.id;
    let data = await approvals.findById({_id:id});
    if(!data){
        return res.status(404).json({
            error : "cannot find document",
            success : false 
        })
    }
    try{
        let deleteData = await approvals.findByIdAndDelete(id);
        if(!deleteData){
            return res.status(400).json({
                error : "something went wrong!",
                success : false
            });
        }
        return res.status(200).json({
            message : "document deleted successfully!",
            success : true,
            data : deleteData
        });
    }catch(err) {
        return res.status(500).json({
            error : "internal server error",
            success : false,
        });
    }
}


exports.deleteApprovalByBody = async (req,res,next) => {
    let deleteableData = req.body;
    try {
        let deleteData = await approvals.findOneAndDelete(deleteableData);
        return res.status(200).json({
            message : "document deleted successfully!",
            data : deleteData
        });
    }
    catch(err){
        return res.status(500).json({
            error : "Internal server error!",
            success : false
        })
    }
}

// new methods to know

// - findByIdAndUpdate or Delete requires first parameter as id and second parameter as the updatable body and third parameter takes
//  a object option in this you can specify do you need the return data or not by {new  : true}

// examples : 

// const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true
    //   });
    
// const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true // The new: true option is used to return the updated user after the update is complete.
    //   });
        
// - findOneAndUpdate or Delete requires {3 object parameters} :  first parameter as any one or more fields as object like => {name : req.body.name} or => {req.body}
// and second argument as optional data to  update the document  , and third argument as an object : {new : true} to specify that do you require a return data or not 

// examples :

//   const user = await User.findOneAndUpdate(
//     { _id: req.params.id },
//     req.body,
//     { new: true }
//   );

//   const user = await User.findOneAndDelete({ _id: req.params.id });
//   const user = await User.findOneAndDelete({ name: req.body.name });