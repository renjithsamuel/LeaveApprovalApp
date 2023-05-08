const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const {getApproval, postApproval , putApproval , patchApproval , deleteApproval , deleteApprovalByBody ,loggerFunc, getApprovalByUser, checkAdmin, apiLimiter} = require('./controller/approvalController');
const { postApprovalUser, getApprovalUsers, checkUser } = require('./controller/approvalUsersController');
let port = process.env.PORT || 3000;

// connect with mongoDB
// let mongoDBString = 'mongodb://0.0.0.0:27017/approval';
let mongoDBString = `mongodb+srv://${config.get('DBNAME')}:${config.get('DBPASSWORD')}@cluster0.gp8dend.mongodb.net/Library?retryWrites=true&w=majority`;

mongoose.connect(mongoDBString,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Connected to mongoDB!");})
.catch((err)=>{console.log("Cannot connect to mongoDB!"+err);});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection failed : '));
db.once('open',()=>{
    console.log("connected to mongoDB DB!");
});

app.use(helmet());
app.use(express.json());
app.use(cors());

//routes - approvals
app.get('/api/v1/approval',apiLimiter,checkAdmin,loggerFunc,getApproval);
app.get('/api/v1/approvalByUser/:id',loggerFunc,getApprovalByUser);
app.post('/api/v1/approval',loggerFunc,postApproval);
app.patch('/api/v1/approval/:id',loggerFunc,patchApproval);
app.put('/api/v1/approval/:id',loggerFunc,putApproval);
app.delete('/api/v1/approval/:id',loggerFunc,deleteApproval);
app.delete('/api/v1/approval',loggerFunc,deleteApprovalByBody);

//routes - users
app.get('/api/v1/user',getApprovalUsers);
app.post('/api/v1/user',postApprovalUser);
app.post('/api/v1/checkUser',checkUser);

// health check
app.get('api/v1/health',loggerFunc,(req,res,next)=>{
    return res.status(200).json({
        status : "success",
        message : "Everything works fine!"
    })
})
app.listen(port , ()=>{
    console.log(`Server listening to port : ${port}`);
});
