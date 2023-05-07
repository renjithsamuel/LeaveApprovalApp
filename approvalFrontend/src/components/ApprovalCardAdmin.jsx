import { useEffect, useState } from "react"


function ApprovalCardAdmin({approval,username,fromDate,toDate,reason}) {
    console.log(approval);
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
        console.log(newFromDate);
        console.log(newToDate);
    },[newToDate,newFromDate]);
    return ( 

        <div style={{backgroundColor:(approval=='pending')?'gray':(approval=='accepted')?'green':(approval=='rejected')?'red':'white'}}>
        <div className="username">
            {username}
        </div>
        <div className="dates">
            <div className="fromDate">
                {newFromDate}
            </div>
            <div className="toDate">
                {newToDate}
            </div>
        </div>
        <div className="reason">
            {reason}
        </div>
    </div> 
    );
}


export default ApprovalCardAdmin;