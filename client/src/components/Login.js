// client/src/components/Login.js
import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Instagram ile Giriş Yap
      </button>
    </div>
  );
};

export default Login;
