import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router"; 

function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [errmssg, seterrmssg] = useState("");

    const navigate=useNavigate();

    const emailcheck=/^[A-Za-z0-9]+[A-Za-z0-9._%-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    let handlesubmit=(e)=>{
        e.preventDefault();
        if(!email.match(emailcheck)){
            seterrmssg("please enter valid email address");
        }
        else{
            seterrmssg("");
            axios.post('http://localhost:9000/signup',{name,email,password},{withCredentials:true})
            .then(result=>{
                if(result.data=="alreadyexists"){
                    seterrmssg("email already exists");
                }
                else if(result.data.equals("goon")){
                    navigate('/home');
                }
            })
        }
    }

    return(
    <>
        <span
        className="border">
            <div className="innerborder">
                SIGNUP FORM
            </div>
            <form onSubmit={(e)=>handlesubmit(e)}>
                <div className="divname">
                    <input
                    className="name"
                    placeholder="enter your name"
                    type="input"
                    onChange={(e)=>setName(e.target.value)}
                    required/>
                </div>
                <div className="divemail">
                    <input className="email"
                    placeholder="enter your email"
                    type="input"
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>
                </div>
                <div className="divpass">
                    <input
                    className="pass"
                    placeholder="password"
                    type="password"
                    onChange={(e)=>setpassword(e.target.value)}
                    required/>
                </div>
                {errmssg && <p className="error-msg">{errmssg}</p>}
                <div>
                    <button type="submit">
                        Register
                    </button>
                </div>
            </form>
        </span>
    </>
    );

}

export default Signup;