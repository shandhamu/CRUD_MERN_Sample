import { useEffect, useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  
        fetch("http://localhost:8081/login", {
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: password,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.length > 0) {
                sessionStorage.user = JSON.stringify(data[0]);
                if(data[0].username == "admin"){
                  window.location.href = '/admin';
                }
                else{
                    window.location.href = '/profile';
                }
              }
              else{
                alert("Invalid username or password");
              }
            })
            .catch((err) => {
                 alert("Invalid username or password");

              console.log(err.message);
            });
  };
useEffect(()=>{
      var u =sessionStorage.user ?  JSON.parse(sessionStorage.user) : undefined;
   if(u != undefined) {
    if (u?.username == "admin" && u.password == "admin") {
        window.location.href = '/admin';
     
    } else {
      window.location.href = '/profile';
    }}
  }, []);
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
