import React, { useState } from 'react';
import axios from 'axios';

interface SignUpComponentProps {
  onSignUp: (username: string, email: string, password: string) => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ onSignUp }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

export default SignUpComponent;
