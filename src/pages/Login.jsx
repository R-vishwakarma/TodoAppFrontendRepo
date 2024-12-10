import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import NavBeforeLogin from "../components/NavBeforeLogin";


const Login = () => {
    return (
      <>
      <NavBeforeLogin /> {/* Include the Navbar here */}


        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <LoginForm/>  {/* Render RegisterForm */}
        </div>

        </>
      );
};

export default Login;
