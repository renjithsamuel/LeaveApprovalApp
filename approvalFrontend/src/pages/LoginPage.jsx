import './LoginPage.css';
import leavePortal from '../assets/leavePortal-rbg.png'

export default function LoginPage({isLogin, handlers, refs}) {
    return (

        <div className='formWrapper' style={{display: "flex", justifyItems: 'center', alignItems: 'center', flexDirection: 'column', gap: 15}}>
            <img src={leavePortal} alt="leavePortal"  height={200} width={400}/>
            <Form refs={refs} title={isLogin?"login":"register"} handler={isLogin?handlers[0]:handlers[1]}/>

            <a onClick={handlers[2]} style={{color:'#6948a4',cursor:'pointer',fontSize:'25px'}} >{isLogin? "New User?":"Already Registered?"}</a>
        </div>
    );
}

function Form({title, handler, refs }) {

    return (
        <div className='form'>

        <div className="signIn">{title}</div>
        <input ref={refs[0]} type="text" id='usernameinp' placeholder='username' />
        <input ref={refs[1]} type='password' id='passwordinp' placeholder='password'/>
        <button onClick={handler} > {title} </button>
        </div>
    )
}
