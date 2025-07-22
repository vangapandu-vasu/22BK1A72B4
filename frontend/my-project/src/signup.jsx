import axios from 'axios';
import { useState } from 'react';
import {  useNavigate } from 'react-router';
import './designing/signup.css';



function Signup(){

    const navigate=useNavigate();

    const[fname, setFname] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errmsg,setErrmsg]=useState("");

    const emailCheck = /^[A-Za-z0-9]+[A-Za-z0-9._%-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


    let handlesig=(e)=>{
        e.preventDefault();
            if(!email.match(emailCheck)){
                setErrmsg("invalid email format.please enter valid email address");
            }
            else
            {
                setErrmsg("");
                axios.post('http://localhost:9000/signup',{fname,email,password})
                .then(result=>{
                console.log(result)
                if(result.data==="already exists"){
                    setErrmsg("the email address already exists");
                }
                else if(result.data==="success"){
                    navigate("/home");
                }
                })
                .catch(err=>console.log(err));
            }

        };

    return(
        <>
            <span className="formone">
                <div className='formin' id='logo'>
                    <h5>SIGNUP</h5>
                </div>
                <form onSubmit={(e)=>handlesig(e)}>
                    <div className="formin" id='namee'>
                        <input 
                        className="name" 
                        placeholder="enter your name"
                        onChange={(e)=>setFname(e.target.value)} 
                        required
                        />
                    </div>
                    <div className="formin" id='emaill' >
                        <input 
                        className="email" 
                        placeholder="enter your email"
                        onChange={(e)=>setEmail(e.target.value)} 
                        required
                        />
                    </div>
                    <div className="formin" id='passwordd'>
                        <input 
                        className="password" 
                        type="password" placeholder="enter your password"
                        onChange={(e)=>setPassword(e.target.value)} 
                        required
                        />
                    </div>
                    {errmsg && <p className="error-msg">{errmsg}</p>}
                    <div className='formin' id='buttonn'>
                        <button className="buttononsig" type="submit" >Register</button>
                    </div>
                </form>
            </span>
        </>
    )
}



export default Signup;