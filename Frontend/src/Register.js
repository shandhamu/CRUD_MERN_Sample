import { useState } from "react";
import "./App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const saveUser = () => {
    fetch("http://localhost:8081/saveuser", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.affectedRows > 0) {
          alert("User Save Successfully");
          setUsername("");
          setEmail("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="Register">
      <div className="form">
        <div>
          <label for="username">UserName</label>
          <input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div>
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {/* <div>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div> */}
        <div>
          <button onClick={saveUser}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
