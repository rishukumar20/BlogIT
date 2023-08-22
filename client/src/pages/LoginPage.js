import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f7f7f7, #e0e0e0);
`;

const LoginForm = styled.form`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 360px;
  padding: 40px;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const LoginTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const LoginInput = styled.input`
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

const LoginButton = styled.button`
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

const SignUpButton = styled(Link)`
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
  &:hover {
    color: #0056b3;
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={login}>
        <LoginTitle>Welcome to Myblog</LoginTitle>
        <LoginInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <LoginButton>Login</LoginButton>
        <SignUpButton to={"/register"}>Don't have an account? Sign up</SignUpButton>
      </LoginForm>
    </LoginPageContainer>
  );
}
