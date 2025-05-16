import React from 'react';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';

const AppRouter = () => {
    return (
        <Routes>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
    );
}

export default AppRouter;