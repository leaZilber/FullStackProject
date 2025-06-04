// import { useState } from "react";
// import HeaderPage from "./homeComponents/header";
// import LoginComp from "./homeComponents/login";
// import RegisterComp from "./homeComponents/register";
// import React from "react";

// export const HomePage = () => {
//     const [showHomePage, setShowHomePage] = useState(true)
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);

//     return (
//         <>< HeaderPage />
//             {showHomePage && (
//                 <>
//                     <img src="./src/images/good-clinic.jpg" id="backgroundHome" alt="home background" />
//                     <div id="roundLogin">
//                         <button className="login-btn" onClick={() => { setShowLogin(true); setShowRegister(false); setShowHomePage(false) }}>כניסה</button>
//                         <button className="signup-btn" onClick={() => { setShowRegister(true); setShowLogin(false); setShowHomePage(false) }}>הרשמה</button>
//                     </div>
                    
//                 </>)
//             }
//             {showLogin && <LoginComp />}
//             {showRegister && <RegisterComp />}
//         </>
//     );
// };


// import { useState } from "react";
// import HeaderPage from "./homeComponents/header";
// import LoginComp from "./homeComponents/login";
// import RegisterComp from "./homeComponents/register";
// import React from "react";

// export const HomePage = () => {
//     const [showHomePage, setShowHomePage] = useState(true)
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);

//     return (
//         <>
//             <HeaderPage />
//             {showHomePage && (
//                 <>
//                     <img src="./src/images/good-clinic.jpg" id="backgroundHome" alt="home background" />
//                     <div id="roundLogin">
//                         <button className="login-btn" onClick={() => { setShowLogin(true); setShowRegister(false); setShowHomePage(false) }}>כניסה</button>
//                         <button className="signup-btn" onClick={() => { setShowRegister(true); setShowLogin(false); setShowHomePage(false) }}>הרשמה</button>
//                     </div>
                    
//                     {/* Admin Login Button */}
//                     <div className="admin-login-container">
//                         <button 
//                             className="admin-login-btn" 
//                             onClick={() => { setShowLogin(true); setShowRegister(false); setShowHomePage(false) }}
//                         >
//                             כניסת מנהלים
//                         </button>
//                     </div>
//                 </>)
//             }
//             {showLogin && <LoginComp />}
//             {showRegister && <RegisterComp />}
            
//             <style jsx>{`
//                 .admin-login-container {
//                     position: fixed;
//                     top: 20px;
//                     left: 20px;
//                     z-index: 1000;
//                 }
                
//                 .admin-login-btn {
//                     background-color: #C8736D;
//                     color: white;
//                     border: none;
//                     padding: 8px 16px;
//                     border-radius: 6px;
//                     font-size: 14px;
//                     font-weight: 500;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                     font-family: inherit;
//                     direction: rtl;
//                 }
                
//                 .admin-login-btn:hover {
//                     background-color: #B86560;
//                     transform: translateY(-1px);
//                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//                 }
                
//                 .admin-login-btn:active {
//                     transform: translateY(0);
//                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                 }
//             `}</style>
//         </>
//     );
// };



// import { useState } from "react";
// import HeaderPage from "./homeComponents/header";
// import LoginComp from "./homeComponents/login";
// import RegisterComp from "./homeComponents/register";
// import React from "react";

// export const HomePage = () => {
//     const [showHomePage, setShowHomePage] = useState(true)
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);

//     return (
//         <>
//             <HeaderPage />
//             {showHomePage && (
//                 <>
//                     <img src="./src/images/good-clinic.jpg" id="backgroundHome" alt="home background" />
//                     <div id="roundLogin">
//                         <button className="login-btn" onClick={() => { setShowLogin(true); setShowRegister(false); setShowHomePage(false) }}>כניסה</button>
//                         <button className="signup-btn" onClick={() => { setShowRegister(true); setShowLogin(false); setShowHomePage(false) }}>הרשמה</button>
//                     </div>
                    
//                     {/* Admin Login Button */}
//                     <div className="admin-login-container">
//                         <button 
//                             className="admin-login-btn" 
//                             onClick={() => { 
//                                 // Navigate to Angular login page
//                                 window.location.href = '/login'; // או הנתיב הספציפי לעמוד Angular שלך
//                             }}
//                         >
//                             כניסת מנהלים
//                         </button>
//                     </div>
//                 </>)
//             }
//             {showLogin && <LoginComp />}
//             {showRegister && <RegisterComp />}
            
//             <style jsx>{`
//                 .admin-login-container {
//                     position: fixed;
//                     bottom: 30px;
//                     left: 30px;
//                     z-index: 1000;
//                 }
                
//                 .admin-login-btn {
//                     background-color: #C8736D;
//                     color: white;
//                     border: none;
//                     padding: 16px 32px;
//                     border-radius: 12px;
//                     font-size: 18px;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     box-shadow: 0 4px 12px rgba(200, 115, 109, 0.3);
//                     font-family: inherit;
//                     direction: rtl;
//                     min-width: 160px;
//                 }
                
//                 .admin-login-btn:hover {
//                     background-color: #B86560;
//                     transform: translateY(-2px);
//                     box-shadow: 0 6px 16px rgba(200, 115, 109, 0.4);
//                 }
                
//                 .admin-login-btn:active {
//                     transform: translateY(-1px);
//                     box-shadow: 0 4px 12px rgba(200, 115, 109, 0.3);
//                 }
//             `}</style>
//         </>
//     );
// };






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
                    
                    {/* Admin Login Button */}
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