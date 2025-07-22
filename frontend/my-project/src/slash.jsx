import { useNavigate } from "react-router";
function Slash(){

    const navigate=useNavigate();

    let handlelog=()=>{
        navigate('/signup');
    }

    return(<>
        <h1>Welcome to the URL Shortener App</h1>
        <p>Please signup to continue.</p>
        <button onClick={handlelog}>
            signup
        </button>
    </>)
};

export default Slash;