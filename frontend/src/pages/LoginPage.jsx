import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('請輸入帳號和密碼');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.auth_token);
        alert('登入成功！');
        navigate('/category');
      } else {
        const errorMessage = Array.isArray(data.non_field_errors)
          ? data.non_field_errors[0]
          : '請再試一次';
        alert('登入失敗：' + errorMessage);
      }
    } catch (error) {
      console.error('登入錯誤:', error);
      alert('登入過程出錯');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h1 className="title">NoteGenius</h1>
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="text"
          placeholder="username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-group">
          <button className="login-btn" type="submit">log in</button>
          <button className="register-btn" type="button" onClick={handleRegister}>register</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
