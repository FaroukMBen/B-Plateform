import SignUpComponent from "../components/SignUpForm.tsx";
import React from "react";

const SignUpPage: React.FC = () => {
    const handleSignUp = (username: string, email:string, password:string) => {
        // Handle sign-up logic here
        console.log("Sign Up:", { username, email, password });
    };

    return (
        <SignUpComponent onSignUp={handleSignUp} />
    );
} 

export default SignUpPage;