import { useEffect, useState } from "react"
import './ApprovalCardUser.css'
import cancelicon from '../assets/cancel-icon.svg';

function ApprovalCardUser({approval,fromDate,toDate,reason,approvalStatus,userId,approvalId,deleteApproval}) {
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
    return ( 

        <div className="UserCardWrapper"  style={{backgroundColor:(approval=='pending')?'#aaafbf':(approval=='accepted')?'#97dee8':(approval=='rejected')?'#b196e3':'#e6e2e1'}}>
        <div className="UserLeft">
            <div className="UserDates">
                <div className="UserFromDate">
                From Date  :
                <div className="UserFromDateContent">{newFromDate}</div>
                </div>
            
                <div className="UserToDate">
                To Date    :<div className="UserToDateContent">{newToDate}</div>
                </div>
            </div>
            <div className="UserReason">
            Reason   :
            <div className="UserReasonContent">{reason} 
            </div>
            </div>
        </div>
        <div className="UserRight">
            <div className="approvalStatus">{approval}</div>
            <div className="deleteApproval" onClick={(e)=>{
                deleteApproval(approvalId);
            }}>
                <img src={cancelicon} alt="cancel" height={50} width={50} />
            </div>
        </div>
    </div> 
    );
}

export default ApprovalCardUser;
