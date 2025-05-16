import LoginComponent from "../components/LoginForm.tsx";
import React from "react";

const LoginPage = () => {
    const handleLogin = (email:string, password:string) => {
        console.log("Login:", {email, password });
    };

    return (
        <LoginComponent onLogin={handleLogin} />
    );
} 

export default LoginPage;