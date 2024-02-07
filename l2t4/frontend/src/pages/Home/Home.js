import "./Home.css";

const Home = (props) => {
  const handleLogout = () => {
    props.setIsLoggedIn(false);
  };

  return (
    <div className="Home">
      <h1>Welcome to Home Page</h1>
      <button className="form-submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
