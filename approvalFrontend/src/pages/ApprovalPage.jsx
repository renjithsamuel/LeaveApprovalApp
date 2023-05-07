import { useEffect, useState } from "react";
import ApprovalCardUser from "../components/ApprovalCardUser";
import ApprovalCardAdmin from "../components/ApprovalCardAdmin";
import './ApprovalPage.css';

function ApprovalPage({user, handleLogOut, approvals, postApproval}) {
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
                            approvals.map((elem)=>{
                               return <ApprovalCardAdmin
                                approval = {elem.approval}
                                username = {elem.userId.username}
                                fromDate = {elem.fromDate}
                                toDate = {elem.toDate}
                                reason = {elem.reason}
                                />
                            })
                        }
                    </div>
                </div>
                :            
                <div>
                    <div className="welcome" style={{fontSize:20}}>
                        Hi {user.username}
                    </div>
                    <div className="addbtn" style={{width:'3vw',height:'3vh',backgroundColor:'gray',borderRadius:15}} onClick={postApproval}>
                        
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
                                />
                            })
                        }
                    </div>
                </div>
        }

    </div> );
}

export default ApprovalPage;