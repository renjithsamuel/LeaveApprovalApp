import { useEffect, useRef, useState } from "react";

function PostApproval({setApprovals, setIsPosting, approvals,user:currentUser,sendHTTPRequest}) {
    const fromDate = useRef();
    const toDate = useRef();
    const reason = useRef();

    const addPost = async () => {
        let posting = false;
        if(!posting){
          posting = true;
        let fromdate = fromDate.current.value.trim();
        let todate = toDate.current.value.trim();
        let Reason = reason.current.value.trim();
        if((fromdate+todate+Reason).includes('<script>') || todate == '' || fromdate == '' || Reason == ''){alert('Enter valid book details!');return}
          else{let obj = {
            userId : currentUser._id,
            fromDate : fromdate,
            toDate : todate,
            reason : Reason 
          }
          await sendHTTPRequest(`https://leaveportal.onrender.com/api/v1/approval`,'POST',obj).then((res)=>{
            // console.log(res.data);
            setApprovals([...approvals,res.data]);
          }).catch((err)=>alert('Something went wrong!' + err.message));

          }
          posting = false;
        }

        cancelPosting();
      }

    const cancelPosting = () => setIsPosting(false)

    useEffect(() => {
      fromDate.current.focus();
      window.addEventListener('keyup', (e) => {
        if(e.key == 'Escape') cancelPosting();
      })

      return () => {
        window.removeEventListener('keyup',  (e) => {
          if(e.key == 'Escape') cancelPosting();
        });
      }
    }, [])

    return ( 
        <div id="dialog-box">
            <div id="dialog-content">
                <h2>Add Leave</h2>
                <label htmlFor="fromdate">from Date: </label>
                <input onKeyUp={(e) => {
                    if(e.key == 'Enter') toDate.current.focus();
                }} ref={fromDate} type="date" pattern="\d{4}/\d{2}/\d{2}" id="fromdate" name="fromdate" min="${new Date().toISOString().slice(0,10)}"/>
                <label htmlFor="todate">To Date: </label>
                <input onKeyUp={(e) => {
                    if(e.key == 'Enter') reason.current.focus();
                }} ref={toDate} type="date" pattern="\d{4}/\d{2}/\d{2}" id="todate" name="todate" min="${new Date().toISOString().slice(0,10)}"/>
                <label htmlFor="reason">Reason:</label>
                <textarea ref={reason} id="reason" name="reason"></textarea>
                <button id="add-leave" onClick={addPost} >Apply Leave</button>
                <button id="cancel" onClick={cancelPosting}>Cancel</button>
            </div>
        </div>
     );
}

export default PostApproval;