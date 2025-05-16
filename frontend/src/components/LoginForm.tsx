import React, { useState } from 'react';
import axios from 'axios';

interface LoginComponentProps {
  onLogin: (email: string, password: string) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <div>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default LoginComponent;
