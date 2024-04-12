import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [user, setUser] = useState([]);
  const [loginuser,setLoginUser] = useState({});
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
        if (data.msg === "Email sent") {
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
    var u =sessionStorage.user ?  JSON.parse(sessionStorage.user) :  window.location.href = '/login';
    setLoginUser(u);
    if (u.username == "admin" && u.password == "admin") {
      getUser();
    } else {
      window.location.href = '/profile';
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Clear the admin session
    window.location.href = '/login'; // Redirect to the admin login page
  };

  const downloadExcel = () => {
    const rows = [['S.No', 'Username', 'Email', 'Password', 'Verification Status']];
    user.forEach((item, index) => {
      rows.push([index + 1, item.username, item.email, item.password, item.verify ? 'Verified' : 'Not Verified']);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_details.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="admin">
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Verification Status</th>
            <th>Status</th> {/* New heading for the Verify button */}
          </tr>
        </thead>
        <tbody>
          {user.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td> {/* Display serial number (index + 1) */}
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.verify ? "Verified" : "Not Verified"}</td>
                <td>
                  {!item.verify && (
                    <button
                      className="verify-button"
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
        </tbody>
      </table>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="download-button" onClick={downloadExcel}>Download Excel</button>
    </div>
  );
}

export default Admin;
