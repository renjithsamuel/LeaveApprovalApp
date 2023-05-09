import { useEffect, useState } from "react"
import './ApprovalCardUser.css'
import cancelicon from '../assets/cancel-icon.svg';
import rightArrow from '../assets/right-arrow-icon.svg';


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
        // style={{backgroundColor:(approval=='pending')?'#aaafbf':(approval=='accepted')?'#97dee8':(approval=='rejected')?'#b196e3':'#e6e2e1'}}
        <div className="UserCardWrapper"  style={{backgroundColor:(approval=='pending')?'#ffffff8a':(approval=='accepted')?'#33b7b7c0':(approval=='rejected')?'#ac9bcbb9':'#e6e2e197'}}>
        <div className="UserLeft">
            <div className="UserDates">
                <div className="UserFromDate">
               
                <div className="UserFromDateContent">{newFromDate}</div>
                </div>
                        <div className="rightArrow">
                            <img src={rightArrow} alt="to" />
                        </div>
                <div className="UserToDate">
                <div className="UserToDateContent">{newToDate}</div>
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
