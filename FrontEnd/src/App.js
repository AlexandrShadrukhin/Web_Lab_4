import React, {useCallback} from "react";
import {connect, Provider, useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Helmet} from 'react-helmet';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import boobs from './components/img/boobs.jpg'
import Links from './components/Links'
import Login from "./pages/Login"
import Register from "./pages/Register";
import authSlice, {logout} from "./slice/authSlice";
import Main from "./pages/Main";
import Info from "./pages/Info";
import {store} from "./store/store";
import messageSlice from "./slice/messageSlice";

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
                    <Links
                        currentToken={currentToken}
                        logOut={logOut}
                    />
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
    );
};
const mapStateToProps = store => {
    return {
        auth: authSlice,
        message: messageSlice
    }
}
export default connect(mapStateToProps)(App);
