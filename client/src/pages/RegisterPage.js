import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f7f7f7, #e0e0e0);
`;

const RegisterForm = styled.form`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 360px;
  padding: 40px;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const RegisterTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const RegisterInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const RegisterButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }

  return (
    <RegisterPageContainer>
      <RegisterForm onSubmit={register}>
        <RegisterTitle>Join Us</RegisterTitle>
        <RegisterInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <RegisterInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <RegisterButton>Register</RegisterButton>
      </RegisterForm>
    </RegisterPageContainer>
  );
}
