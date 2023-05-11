import { useEffect, useRef, useState } from "react"
import LoginPage from "./pages/LoginPage";
import ApprovalPage from "./pages/ApprovalPage";
import 'typeface-poppins';


function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [inValidText, setInValidText] = useState("");
  const [serverConnected, setServerConnected] = useState("Connecting to server");
  const [isLogin, setIsLogin] = useState(1);
  const [approvals,setApprovals] = useState([]);
 
  const username = useRef();
  const password = useRef();
  
  //send HTTP request 
  const sendHTTPRequest = (url,method,data) => {

      let promise = new Promise(async (resolve,reject)=>{
        await fetch(url,{method:method,body:JSON.stringify(data),headers:{"Content-Type": "application/json",}})
            .then((res)=> {
              if('https://leaveportal.onrender.com/api/v1/checkUser' === url){
                sessionStorage.setItem("token", res.headers.get('token'));
            }
              return res.json()
            })
            .then((result) => {
              resolve(result)})

        .catch((err)=>{reject(err)})
    })
    
    return promise;
  }

  //get Approvals
  useEffect(()=>{
    async function handleApprovals() {
      try {
        const response = await fetch(`https://leaveportal.onrender.com/api/v1/${currentUser.isAdmin ? 'approval' : `approvalByUser/${currentUser._id}`}`, {
          method: 'GET',
          headers: {
            'token': sessionStorage.getItem('token')
          }
        });
        const data = await response.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error + 'here1');
      }
    }
    
    if(!(JSON.stringify(currentUser) === "{}")){
      handleApprovals().then((response)=>{
        // setApprovals(response.data);
        setApprovals(response.data.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate)))
      });
    }

  },[currentUser]);

  // approval status handling
    const handleApprovalStatus = async ({status,approvalId,reason}) =>{
      await sendHTTPRequest(`https://leaveportal.onrender.com/api/v1/approval/${approvalId}`,'PATCH',{
        approval : status,
        userId : currentUser._id,
        reason : reason
      }).then((res)=>{if(res.success==true)
        {
          console.log("Approval updated");
          // console.log(res.data);
        setApprovals(approvals.map((elem)=>{
          if(elem._id == approvalId){
              elem = res.data
            }
            return elem;
        }));
    }
    else{ console.log("something went wrong while updating!");}})
      .catch((err)=>{console.log("something went wrong while updating!" + err);});
      // console.log(response);
    }
    

  // deleteApproval
  async function deleteCurrentApproval(approvalId){
    // console.log(approvalId);
    await sendHTTPRequest(`https://leaveportal.onrender.com/api/v1/approval/${approvalId}`,'DELETE')
    .then((res)=>{if(res.success==true){console.log("Approval deleted successfully!");
    setApprovals(approvals.filter((e) => {
      if (e._id !== approvalId) {
        return true; // include the approval in the filtered array
      } else {
        console.log('Filtered out approval:', e);
        return false; // exclude the approval from the filtered array
      }
    }));
    }else{console.log("Something Went Wrong while deleting!");}})
    .catch((err)=>{console.log("error while deleting! "+err);})
  }

  //get Users
  useEffect(()=>{
      async function getHealthStatus(){
         return await sendHTTPRequest('https://leaveportal.onrender.com/api/v1/health','GET')
      }
      getHealthStatus().then((v)=> {if(v.status=='success')setServerConnected('Server connected!')
                                    else setServerConnected('Try again later!')
                                    });

      async function getUsers(){
         return await sendHTTPRequest('https://leaveportal.onrender.com/api/v1/user','GET')
      }
      getUsers().then((v)=> setUsers(v.data));
      
  },[])

  //Handlers
  const handleLogin = async () => {
    let user = await sendHTTPRequest("https://leaveportal.onrender.com/api/v1/checkUser", 'POST', {
      username: username.current.value,
      password: password.current.value,
    })
    if(user.status)
      setCurrentUser(user.data);

    if(!user.status && JSON.stringify(currentUser) === "{}") setInValidText("Invalid Creds");
  }

  const handleRegsiter = async () => {
    
    if(!(username.current.value) || !(password.current.value) ){
      alert('Please enter valid credentials')
      return;
    }
    let gotUser = false;
    users.forEach((user)=>{
      if(user.username === username.current.value){
        gotUser = true
        return;
      }
    })
    if(!gotUser){
      await sendHTTPRequest('https://leaveportal.onrender.com/api/v1/user', 'POST', {
        username: username.current.value,
        password: password.current.value,
        isAdmin: false
      }).then((v) => {
        if(v.status){
          setIsLogin(1)}
        else {
          setInValidText("Server Error Please Try Again");}
      })
    }
    else if(gotUser){
      setInValidText("UserName Already Exist");
    }
  }

  const handleLogOut = () => {
    setCurrentUser({});
    setInValidText("");
    setApprovals([]);
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
        ((JSON.stringify(currentUser) !== "{}") && (sessionStorage.getItem('token')))
          ?
          <ApprovalPage user={currentUser} handleLogOut={handleLogOut}  approvals={approvals}
          setApprovals={setApprovals} approvalStatus={handleApprovalStatus} 
          deleteApproval={deleteCurrentApproval} sendHTTPRequest={sendHTTPRequest}/> 
            
          :<>
          <LoginPage isLogin={isLogin} handlers={[handleLogin, handleRegsiter, toggleForms]} refs={[username, password]}/>   
          {inValidText?<p className="invalidText" >{inValidText}</p>:null}
          {<p className="serverConnected" >{serverConnected}</p>}
        </>
        }
    </>
  );
}

export default App;