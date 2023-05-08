import { useEffect, useState } from "react"
import './ApprovalCardAdmin.css';
import cancelicon from '../assets/cancel-icon.svg';
import accepticon from '../assets/tick-icon.svg';
import rightArrow from '../assets/right-arrow-icon.svg';

function ApprovalCardAdmin({approval,username,fromDate,toDate,reason,approvalStatus,userId,approvalId}) {
    const  [newToDate,setNewToDate] = useState('');
    const [newFromDate,setNewFromDate] = useState('');
    useEffect(()=>{
        const inter1 = new Date(fromDate);
        const inter2 = new Date(toDate);
        setNewFromDate(inter1.toLocaleDateString('en-US',{
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }));
        setNewToDate(inter2.toLocaleDateString('en-US',{
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }));
    },[newToDate,newFromDate]);

    // useEffect(()=>{
    //     console.log('Rerender the component');
    //     approval = approvalStatus;
    // },[approvalStatus[0],approval])
    
    return ( 
    <div className="AdminCardWrapper" style={{backgroundColor:(approval=='pending')?'#aaafbf':(approval=='accepted')?'#97dee8':(approval=='rejected')?'#b196e3':'#e6e2e1'}}>
        <div className="adminleft">
            <div className="username">
                Name : {username}
            </div>
            <div className="dates">
                <div className="fromDate">
                <div className="fromDateContent">{newFromDate}</div>
                </div>
                <div className="rightArrow">
                    <img src={rightArrow} alt="to" />
                </div>
                <div className="toDate">
                <div className="toDateContent">{newToDate}</div>
                </div>
            </div>
            <div className="reason">
            Reason   :
            <div className="reasonContent">{reason}
            </div>
            </div>
        </div>
        <div className="adminRight">
            <div className="AdminapprovalStatus">{approval}</div>
            <div className="rejectBtn" onClick={(e)=>{approvalStatus({status : 'rejected',userId:userId,approvalId:approvalId,reason:reason})}} >
                <img src={cancelicon} alt="cancel" width={70} height={70} />
            </div>
            <div className="acceptBtn" onClick={(e)=>{approvalStatus({status : 'accepted',userId:userId,approvalId:approvalId,reason:reason})}}>
                <img src={accepticon} alt="cancel" width={70} height={60} />
            </div>
        </div>
    </div> 
    );
}


export default ApprovalCardAdmin;