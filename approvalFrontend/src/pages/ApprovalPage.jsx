import { useEffect, useState } from "react";
import ApprovalCardUser from "../components/ApprovalCardUser";
import ApprovalCardAdmin from "../components/ApprovalCardAdmin";
import './ApprovalPage.css';
import addicon from '../assets/add-icon.svg'
import logOutIcon from '../assets/logOut-icon.svg'

function ApprovalPage({user, handleLogOut, approvals, postApproval,approvalStatus,deleteApproval}) {
    // console.log(approvals);
    // console.log(user);

    return ( <div className="approvalPageWholeWrapper">
        <div className="approvalPageHead">
            <div className="approvalHeader">LeavePortal</div>
            <div className="logoutBtn" onClick={handleLogOut}>
                <img src={logOutIcon} alt="logOut" />
            </div>
        </div>

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
                        <div className="addbtn" onClick={postApproval}>
                        add leave<img src={addicon} alt="add" width={30} height={35} />
                    </div>}
        </div>

        
        {user.isAdmin?
                <div className="approvalsWrapper">
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