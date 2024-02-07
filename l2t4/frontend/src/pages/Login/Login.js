import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyPassword = async (enteredPassword, originalPassword) => {
    try {
      const response = await fetch("http://localhost:5000/api/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enteredPassword, originalPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.isValid;
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users"));

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      const isPasswordValid = await verifyPassword(
        password,
        existingUser.password
      );

      if (isPasswordValid) props.setIsLoggedIn(true);
      else alert("Invalid password!");
    } else {
      alert("Email is not registered!");
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="form-input"
        />
        <input type="submit" value="Login" className="form-submit" />
      </form>
      <Link to="/sign-up">
        <button className="form-switcher">New User? Create Account</button>
      </Link>
    </div>
  );
};

export default Login;
