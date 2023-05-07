import { useEffect, useState } from "react"

function ApprovalCardUser({approval,fromDate,toDate,reason}) {
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

        <div style={{backgroundColor:(approval=='pending')?'gray':(approval=='accepted')?'green':'red'}}>
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

export default ApprovalCardUser;
