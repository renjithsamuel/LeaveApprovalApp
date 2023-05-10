import './LoginPage.css';
import leavePortal from '../assets/leavePortal-rbg.png'

export default function LoginPage({isLogin, handlers, refs}) {
    return (

        <div className='formWrapper' style={{display: "flex", justifyItems: 'center', alignItems: 'center', flexDirection: 'column', gap: 15}}>
            <div className="leaveportalImg"><img src={leavePortal} alt="leavePortal" /></div>
            <Form refs={refs} title={isLogin?"Login":"Register"} handler={isLogin?handlers[0]:handlers[1]}/>

            <a onClick={handlers[2]}  >{isLogin? "New User?":"Already Registered?"}</a>
        </div>
    );
}

function Form({title, handler, refs }) {

    return (
        <div className='form'>

        <div className="signIn">{title}</div>
        <input ref={refs[0]} type="text" id='usernameinp' placeholder='username' onKeyUp={(e) => {if(e.key === 'Enter') refs[1].current.focus()}}/>
        <input ref={refs[1]} type='password' id='passwordinp' placeholder='password' onKeyUp={(e) => {if(e.key === 'Enter') handler()}}/>
        <button onClick={handler} > {title} </button>
        </div>
    )
}
