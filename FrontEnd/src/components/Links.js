import {Link} from "react-router-dom";
import React from "react";

const Links = ({ logOut,currentToken}) => {
    const logOutLink = (
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                    LogOut
                </a>
            </li>
        </div>
    );
    const authLinks =  (
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
    );
    const infoLink = (
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
                <a href="/info" className="nav-link">
                    Info
                </a>
            </li>
        </div>
    )

    return (
        <div>
            {currentToken ? (
            logOutLink
        ) : (
            authLinks
        )}
            {infoLink}
        </div>
    )
}
export default Links;