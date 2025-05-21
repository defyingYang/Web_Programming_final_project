import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = async (e) => {
  e.preventDefault();

  if (!email || !password || !username) {
    alert('請輸入信箱、使用者名稱、密碼');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      alert('註冊成功，請登入');
      navigate('/'); // 或 navigate('/login');
    } else {
      const data = await response.json();
      const errorText = Object.entries(data)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');
      alert(`註冊失敗：\n${errorText}`);
    }
  } catch (error) {
    console.error('錯誤:', error);
    alert('註冊過程出現錯誤，請檢查伺服器是否啟動');
  }
};


  return (
    <div className="Register-container">
      <div>
        <h1>NoteGenius</h1>
        <div className="Register-form-box" id="register-form">
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" id="register-button">Register</button>
            <p>
              Already have an account?{' '}
              <a onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
