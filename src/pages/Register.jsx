import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import NavBeforeLogin from '../components/NavBeforeLogin';


const Register = () => {
  return (
    <>
    <NavBeforeLogin /> {/* Include the Navbar here */}

      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <RegisterForm />
      </div>

    </>
  );
};

export default Register;
