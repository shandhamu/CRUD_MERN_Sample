import { useEffect, useState } from "react";
import "./App.css";

function Admin() {
  const [user, setUser] = useState([]);
  const verifyUser = (item) => {
    fetch("http://localhost:8081/verifyuser", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.msg == "Email sent") {
          alert("User Verified Successfully");
          getUser();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getUser = () => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          setUser(json);
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="admin">
      <table>
        {user.map((item, i) => {
          return (
            <tr>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                {item.verify ? (
                  <div>Verified</div>
                ) : (
                  <button
                    onClick={() => {
                      verifyUser(item);
                    }}
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Admin;
