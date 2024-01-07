import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Helmet} from 'react-helmet';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import boobs from './components/img/boobs.jpg'

import Login from "./pages/Login"
import Register from "./pages/Register";


import {logout} from "./slice/authSlice";
import Main from "./pages/Main";
import Info from "./pages/Info";

const App = () => {


    const {token: currentToken} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    return (
        <Router>

            <div style={{
                backgroundImage: `url(${boobs})`,
                backgroundRepeat: 'no-repeat',
                opacity: 0.8,
                height: '100vh'
            }}>
            <Helmet>
                <title>Web Lab 4</title>
            </Helmet>
                {currentToken ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/info" className="nav-link">
                        Info
                    </a>
                </li>
            </div>

            <div className="container mt-3">
                <Routes>
                    <Route path="/info" element={<Info/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/main" element={<Main/>}/>
                </Routes>
            </div>

        </div>

</Router>
)
    ;
};

export default App;
