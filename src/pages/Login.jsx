import React, { useState } from "react";
import axios from "axios";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password){
      alert("All fields required");
      return;
    }

    try{
      setLoading(true);

      const res = await axios.post("https://playonbackend.onrender.com/api/admin/login",{
        email,
        password
      });

      // token save
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminData", JSON.stringify(res.data.admin));

      alert("Login success 🔥");
      localStorage.setItem("token", res.data.token);
localStorage.setItem("adminData", JSON.stringify(res.data.admin));

window.location.reload();

      // dashboard redirect
      window.location.href="/dashboard";

    }catch(err){
      alert(err.response?.data?.message || "Login failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.btn}>
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"#0f172a"
  },
  card:{
    background:"#fff",
    padding:"40px",
    borderRadius:"10px",
    width:"350px",
    textAlign:"center"
  },
  input:{
    width:"100%",
    padding:"12px",
    margin:"10px 0",
    border:"1px solid #ccc",
    borderRadius:"6px"
  },
  btn:{
    width:"100%",
    padding:"12px",
    background:"#2563eb",
    color:"#fff",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }
};