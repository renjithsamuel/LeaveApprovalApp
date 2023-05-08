import { useEffect, useState } from "react";
import ApprovalCardUser from "../components/ApprovalCardUser";
import ApprovalCardAdmin from "../components/ApprovalCardAdmin";
import './ApprovalPage.css';
import addicon from '../assets/add-icon.svg'

function ApprovalPage({user, handleLogOut, approvals, postApproval,approvalStatus,deleteApproval}) {
    // console.log(approvals);
    // console.log(user);

    return ( <div>
        <div className="approvalPageHead">
            <div className="approvalHeader">Approvals</div>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
        
        {user.isAdmin?
                <div className="approvalsWrapper">
                    <div className="welcome">
                        Hi {user.username}
                    </div>
                    <div className="adminWrapper">
                        {
                            approvals.map((elem,index)=>{
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
                <div className="userAllWrapper">
                    <div className="userNameAndAdd">
                        <div className="welcome" style={{fontSize:30}}>
                            Hi {user.username}
                        </div>
                        <div className="addbtn" onClick={postApproval}>
                            add leave<img src={addicon} alt="add" width={30} height={35} />
                        </div>
                    </div>
                    <div className="userWrapper">
                        {
                            approvals.map((elem, index)=>{
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