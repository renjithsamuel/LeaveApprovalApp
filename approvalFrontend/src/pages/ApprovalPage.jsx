import { useEffect, useState } from "react";
import ApprovalCardUser from "../components/ApprovalCardUser";
import ApprovalCardAdmin from "../components/ApprovalCardAdmin";
import './ApprovalPage.css';
import addicon from '../assets/add-icon.svg'
import logOutIcon from '../assets/logout-icon.svg'
import backgroundImg from '../assets/background.svg'
import { useMemo } from "react";
import ReactLoading from 'react-loading';
import PostApproval from "../components/PostApproval";

function ApprovalPage({user, handleLogOut,approvals, setApprovals,approvalStatus,deleteApproval}) {
    const [currentDisplay,setCurrentDisplay] = useState('pending');
    const [approvalsSet, setApprovalsSet] = useState([]); 
    const [isLoading, setIsLoading] = useState(true)
    const [isPosting, setIsPosting] = useState(false);
    useMemo(() => {
        setIsLoading(true);

        if(currentDisplay=='pending')
            setApprovalsSet(approvals.filter((elem)=>(elem.approval==='pending')));
        else
            setApprovalsSet(approvals.filter((elem)=>(elem.approval!=='pending')))
        // setT imeout(() => {
            setIsLoading(false);
        // }, 3000);
    }, [approvals, currentDisplay])

    return (
    <div className="approvalPageWholeWrapper">
        {isPosting?<PostApproval setApprovals={setApprovals} approvals={approvals} setIsPosting={setIsPosting} user={user}/>:null}
        {/* NAVBAR */}
            <div className="backgroundImg">
                <img src={backgroundImg} alt="" />
            </div>
            <div className="approvalPageHead">
                <div className="approvalHeader">LeavePortal</div>
                <div className="logoutBtn" onClick={handleLogOut}>
                    <img src={logOutIcon} alt="logOut" />
                </div>
            </div>

        {/* SUBHEADER */}
          <div className="subHeader">
                        <div className="subHeading">
                            Approvals
                        </div>
                        <div className="verticalLine">

                        </div>
                        <div className="welcome">
                            Hi {user.username}
                        </div>  
                        {user.isAdmin?
                            <div className="adminMode">
                                Admin
                            </div>
                        :''
                        }
                        {user.isAdmin?'':
                        <div className="addbtn" onClick={() => {
                            setIsPosting(true)
                        }}>
                        add leave<img src={addicon} alt="add" width={30} height={35} />
                    </div>}
        </div>
        
        {/* SORT BY */}
        
        <div className="sortBtn">
                <div className="pending" onClick={(e)=>{setCurrentDisplay('pending');}} style={{backgroundColor:(currentDisplay=='pending')?'#83c9d6':'transparent',color:(currentDisplay=='pending')?'#000722':'white'}}>
                        pending
                </div>
                <div className="verticalLineSort">

                </div>
                <div className="history" onClick={(e)=>{setCurrentDisplay('history');}} style={{backgroundColor:(currentDisplay=='pending')?'transparent':'#83c9d6' , color:(currentDisplay=='pending')?'white':'#000722' }}>
                        history
                </div>
        </div>

        {
        isLoading?<div className="loading">
            <ReactLoading type="bubbles" color="#6948a4" height={150} width={150} />
        </div>:
        user.isAdmin?
                // cards for admin
                <div className="approvalsWrapper">
                    <div className="adminWrapper">
                        {!approvalsSet.length?<div className="ntd">Nothing to display</div>:
                            approvalsSet.map((elem,index)=>{
                               return <ApprovalCardAdmin
                               key={index}
                                approval = {elem.approval}
                                username = {elem.userId.username}
                                fromDate = {elem.fromDate}
                                toDate = {elem.toDate}
                                reason = {elem.reason}
                                approvalStatus={approvalStatus}
                                userId={user._id}
                                approvalId = {elem._id}
                                />
                            })
                        }
                    </div>
                </div>
                :   
                // cards for user 
                <div className="userAllWrapper">
                    <div className="userWrapper">
                        {!approvalsSet.length?<div className="ntd">Nothing to display</div>:
                            approvalsSet.map((elem, index)=>{
                               return <ApprovalCardUser
                                key={index}
                                approval = {elem.approval}
                                fromDate = {elem.fromDate}
                                toDate = {elem.toDate}
                                reason = {elem.reason}
                                approvalStatus={approvalStatus}
                                userId={user._id}
                                approvalId = {elem._id}
                                deleteApproval={deleteApproval}
                                />
                            })
                        }
                    </div>
                </div>
        }

    </div> );
}



export default ApprovalPage;