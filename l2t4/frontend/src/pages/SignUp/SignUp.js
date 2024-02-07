import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const clearInputs = () => {
    setUser({ firstName: "", lastName: "", email: "", password: "" });
  };

  const isExistingUser = (email) => {
    return users.some((user) => user.email === email);
  };

  const encryptPassword = async (password) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/encryptPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.hashedPassword;
      } else {
        const error = await response.json();
        console.error(error);
        throw new Error("Password encryption failed");
      }
    } catch (error) {
      console.error(error.message);
      throw new Error("Password encryption failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      };

      const existingUser = isExistingUser(newUser.email);

      if (!existingUser) {
        console.log(newUser);

        const hashedPassword = await encryptPassword(newUser.password);

        newUser.password = hashedPassword;
        console.log(newUser);

        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);

        console.log(updatedUsers);

        props.setIsLoggedIn(true);
      } else {
        alert("Email is already registered!");
      }

      clearInputs();
    } catch (error) {
      console.error(error.message);
      // Handle any additional error handling or logging as needed
    }
  };

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))
          }
          className="form-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))
          }
          className="form-input"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={user.email}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
          }
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
          }
          className="form-input"
        />
        <input type="submit" value="Sign Up" className="form-submit" />
      </form>
      <Link to="/login">
        <button className="form-switcher">Already have an account?</button>
      </Link>
    </div>
  );
};

export default SignUp;
