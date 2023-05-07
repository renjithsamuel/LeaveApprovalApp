import { useEffect, useRef, useState } from "react"
import LoginPage from "./pages/LoginPage";
import ApprovalPage from "./pages/ApprovalPage";
import 'typeface-poppins';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [inValidText, setInValidText] = useState("");
  const [isLogin, setIsLogin] = useState(1);
  const [approvals,setApprovals] = useState([]);

  const username = useRef();
  const password = useRef();
  
  //
  const sendHTTPRequest = (url,method,data) => {

      let promise = new Promise(async (resolve,reject)=>{
        await fetch(url,{method:method,body:JSON.stringify(data),headers:{"Content-Type": "application/json",}})
            .then((res)=> {
              if('http://localhost:3000/api/v1/checkUser' === url){
                localStorage.setItem("token", res.headers.get('token'));

            }
              return res.json()
            })
            .then((result) => {
              resolve(result)})

        .catch((err)=>{reject(err)})
    })
    
    return promise;
  }


  async function postApproval(){
    // disableScroll()
    let posting = false;
    let dialogBox = document.createElement('div');
    dialogBox.setAttribute('id', 'dialog-box');
    dialogBox.innerHTML = `
      <div id="dialog-content">
        <h2>Add Leave</h2>
        <label for="fromdate">from Date: </label>
        <input type="date" pattern="\d{4}/\d{2}/\d{2}" id="fromdate" name="fromdate" max="${new Date().toISOString().slice(0,10)}">
        <label for="todate">To Date: </label>
        <input type="date" pattern="\d{4}/\d{2}/\d{2}" id="todate" name="todate" max="${new Date().toISOString().slice(0,10)}">
        <label for="reason">Reason:</label>
        <textarea id="reason" name="reason"></textarea>
        <button id="add-leave">Apply Leave</button>
        <button id="cancel">Cancel</button>
      </div>
    `;
    document.body.appendChild(dialogBox);
    let addBookBtn = document.getElementById('add-leave');
    addBookBtn.addEventListener('click',async () => {
      if(!posting){
        posting = true;
      let fromdate = document.getElementById('fromdate').value.trim();
      let todate = document.getElementById('todate').value.trim();
      let reason = document.getElementById('reason').value.trim();
      if((fromdate+todate+reason).includes('<script>') || todate == '' || fromdate == '' || reason == ''){alert('Enter valid book details!');return}
        else{let obj = {
          userId : user._id,
          fromDate : fromdate,
          toDate : todate,
          reason : reason 
        }
        await sendHTTPRequest(`http://localhost:3000/api/v1/approval`,'POST',obj).then(()=>{
          alert('Posted successully!');
        }).catch((err)=>alert('Something went wrong!' + err.message));
        dialogBox.remove();
        }
        posting=false;
        // enableScroll();
      }
    });
  
    let cancelBtn = document.getElementById('cancel');
    cancelBtn.addEventListener('click', () => {
      dialogBox.remove();
      enableScroll();
      endOfBooks=false;
      whileadding = false;
    });
  }

  //get Approvals
  useEffect(()=>{
    async function handleApprovals() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/${currentUser.isAdmin ? 'approval' : `approvalByUser/${currentUser._id}`}`, {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log(error + 'here1');
      }
    }
    
    if(!(JSON.stringify(currentUser) === "{}")){
      handleApprovals().then((response)=>{
        setApprovals(response.data)});
    }

  },[currentUser]);

  //get Users
  useEffect(()=>{
      async function getUsers(){
         return await sendHTTPRequest('http://localhost:3000/api/v1/user','GET')
      }
      getUsers().then((v)=> setUsers(v.data));
      
  },[])

  //Handlers
  const handleLogin = async () => {
    
    let user = await sendHTTPRequest("http://localhost:3000/api/v1/checkUser", 'POST', {
      username: username.current.value,
      password: password.current.value,
    })
    if(user.status){ setCurrentUser(user.data);}

    if(!user.status && JSON.stringify(currentUser) === "{}") setInValidText("Invalid Creds");
  }

  const handleRegsiter = async () => {
    let gotUser = false;
    users.forEach((user)=>{
      if(user.username === username.current.value){
        gotUser = true
        return;
      }
    })
    if(!gotUser){
      console.log('here not got');

      await sendHTTPRequest('http://localhost:3000/api/v1/user', 'POST', {
        username: username.current.value,
        password: password.current.value,
        isAdmin: false
      }).then((v) => {
        if(v.status)
          setIsLogin(0)

        else 
          setInValidText("Server Error Please Try Again");

      })
    }
    else{
      setInValidText("UserName Already Exist");
      console.log('here');
    }
    
  }

  const handleLogOut = () => {
    setCurrentUser({});
    setInValidText("")
    
    localStorage.removeItem("token")
  }
  
  const toggleForms = () =>{ 
    username.current.value = '';
    password.current.value = '';
    setIsLogin(isLogin ^ 1);
    setInValidText("")
  }
  

  return (
    <>
      {
        ((JSON.stringify(currentUser) !== "{}") && (localStorage.getItem('token')))
          ?<ApprovalPage user={currentUser} handleLogOut={handleLogOut} approvals={approvals} postApproval={postApproval}/> 
            
          :<>
          <LoginPage isLogin={isLogin} handlers={[handleLogin, handleRegsiter, toggleForms]} refs={[username, password]}/>   
          {inValidText?<p style={{marginLeft:'44vw',color:'#6948a4',cursor:'pointer',fontSize:'25px'}}>{inValidText}</p>:null}
        </>
          
        }
    </>
  );
}

export default App;