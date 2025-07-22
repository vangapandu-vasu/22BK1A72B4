import { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'


function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errmsg,setErrmsg]=useState("");

    const emailCheck = /^[A-Za-z0-9]+[A-Za-z0-9._%-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const navigate = useNavigate();

    let handlelogin=(e)=>{
        e.preventDefault();
        if(!email.match(emailCheck)){
            setErrmsg("invalid email format.enter a valid address");
        }
        else{
            setErrmsg("");
            axios.post('http://localhost:9000/login',{email,password},{withCredentials:true})
            .then(result=>{console.log(result)
            if(result.data=="access granted"){
                navigate("/home");
            }
            else{
                setErrmsg("wrong credentials");
                navigate("/login");
            }})
            .catch(err=>console.log(err))
        }
    };
    

    return(
        <>
        <div className="formone">
            <div className="loginone" id="logo">
                <h5>LOGIN</h5>
            </div>
            <form onSubmit={(e)=>handlelogin(e)}>
                <div className="loginone" id="namee">
                    <input className="email"
                        placeholder="enter your email"
                        type="text"
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="loginone" id="password">
                    <input className="password"
                        placeholder="enter your password"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    ></input>   
                </div>
                {errmsg && <p className="error-msg">{errmsg}</p>}
                <div className="loginone" id="buttonn">
                    <button  type="submit">login</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default Login;