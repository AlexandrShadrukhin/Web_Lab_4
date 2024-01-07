import axios from "axios";
import Endpoints from "../endpoints/endpoints";

const register = (username, password) => {
    const requestResponse = axios.post(Endpoints.AUTH.REGISTER, {
        username,
        password
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data));
            }
        });
    return requestResponse;
};
const login = (username, password) => {
    const requestResponse = axios.post(Endpoints.AUTH.LOGIN, {
        username,
        password
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data));
            }
        });
    return requestResponse;
};
const logout = () => {
    localStorage.removeItem("token");
};
const getCurrentToken = () => {
    return JSON.parse(localStorage.getItem("token"))
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentToken
}
export default AuthService;