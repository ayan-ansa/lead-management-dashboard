import { useEffect, useState } from "react";
import React from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login getUser={getUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} getUser={getUser} />} />
      </Routes>
    </div>
  );
}

export default App;
