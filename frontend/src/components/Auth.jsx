import { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [signup, setSignup] = useState(true);
  let navigate = useNavigate();

const apiURL = import.meta.env.VITE_BACKEND_URL

  function changeAuth() {
    setSignup(!signup);
  }

 async function handleSubmit(){


    const user = signup?{
      username,
      email,
      password
    }
    :{
      email,
      password
    }

    try{
    const res = await axios.post(apiURL+`/api/auth/${signup?"signup":"login"}`,user);

    if(signup){
      alert(res.data.message);
    }
    if(!signup && res.data.token){
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    }else {
      alert("Login failed: token not received");
    }
  }
    catch(err){
      console.error(err.message)
    }

  }
  
  return (

    <div className="mainContainer">
      <h2>Welcome to MyNotes !</h2>

    <div className="auth-container">
      {signup && (
        <input
          className="auth-input"
          type="text"
          placeholder="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        className="auth-input"
        type="email"
        placeholder="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="primary-btn" onClick={handleSubmit}>
        {signup ? "Signup" : "Login"}
      </button>
     
      <button className="secondary-btn" onClick={changeAuth}>
        {signup ? "Login" : "Signup"}{" "}
      </button>
    </div>
    </div>
  );
}
