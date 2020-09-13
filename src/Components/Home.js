import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>I am Home!</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>SignUp</button>
      </Link>
    </div>
  );
}

export default Home;
