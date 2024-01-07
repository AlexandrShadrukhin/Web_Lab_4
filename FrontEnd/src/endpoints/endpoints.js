const urlHost = "http://localhost:8080/api";
const Endpoints = {

    AUTH: {
        REGISTER: urlHost + '/auth/register',
        LOGIN: urlHost + '/auth/authenticate',
    },
    POINT: {
        GetAll: urlHost + "/point/points",
        CREATE: urlHost + "/point/points"
    }
}

export default Endpoints;