import { useEffect, useState } from "react";
import { auth } from "./firebase";
import "./Profile.css"; // Import the CSS file for styling

function Profile() {
  const [user, setUser] = useState({});

  const handleLogout = async () => {
    await auth.signOut();

    sessionStorage.removeItem("user"); // Clear the admin session
    window.location.href = "/login"; // Redirect to the admin login page
  };

  useEffect(() => {
    var u = sessionStorage.user
      ? JSON.parse(sessionStorage.user)
      : (window.location.href = "/login");
    setUser(u);
    if (u.username == "admin" && u.password == "admin") {
      window.location.href = "/admin";
    }
  }, []);

  return (
    <div className="Profile">
      <div className="message">
        <h2 className="fade-in">Welcome {user.email}</h2>
        <p className="fade-in">You are logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
