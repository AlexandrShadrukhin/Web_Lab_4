export default function authHeader() {
    const jwt = JSON.parse(localStorage.getItem('token'));

    if (jwt && jwt.token) {
        return {Authorization: `Bearer ` + jwt.token};
    }else{
        return {};
    }
}