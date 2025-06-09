import { useState } from "react";
import HeaderPage from "./homeComponents/header";
import LoginComp from "./homeComponents/login";
import RegisterComp from "./homeComponents/register";
import React from 'react';
void React;


export const HomePage = () => {
    const [showHomePage, setShowHomePage] = useState(true)
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            <HeaderPage />
            {showHomePage && (
                <>
                    <img src="/images/good-clinic.jpg" id="backgroundHome" alt="home background" />
                    <div id="roundLogin">
                        <button className="login-btn" onClick={() => { setShowLogin(true); setShowRegister(false); setShowHomePage(false) }}>כניסה</button>
                        <button className="signup-btn" onClick={() => { setShowRegister(true); setShowLogin(false); setShowHomePage(false) }}>הרשמה</button>
                    </div>
                    
                    <div className="admin-login-container">
                        <button 
                            className="admin-login-btn" 
                            onClick={() => { 
                                window.location.href = 'https://fullstackprojectfrontendangular.onrender.com/'; 
                            }}
                        >
                            כניסת מנהלים
                        </button>
                    </div>
                </>)
            }
            {showLogin && <LoginComp />}
            {showRegister && <RegisterComp />}
            
            <style>{`
                .admin-login-container {
                    position: fixed;
                    bottom: 40px;
                    right: 40px;
                    z-index: 1000;
                    animation: slideInFromRight 1s ease-out;
                }
                
                @keyframes slideInFromRight {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .admin-login-btn {
                    background-color: #C8736D;
                    color: white;
                    border: none;
                    padding: 20px 40px;
                    border-radius: 16px;
                    font-size: 20px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 6px 16px rgba(200, 115, 109, 0.4);
                    font-family: inherit;
                    direction: rtl;
                    min-width: 200px;
                    border: 2px solid transparent;
                }
                
                .admin-login-btn:hover {
                    background-color: #B86560;
                    transform: translateY(-3px) translateX(-5px);
                    box-shadow: 0 8px 20px rgba(200, 115, 109, 0.5);
                    border-color: rgba(255, 255, 255, 0.2);
                }
                
                .admin-login-btn:active {
                    transform: translateY(-1px) translateX(-2px);
                    box-shadow: 0 6px 16px rgba(200, 115, 109, 0.4);
                }
            `}</style>
        </>
    );
};