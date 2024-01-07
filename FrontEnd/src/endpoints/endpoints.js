const Endpoints = {
    AUTH: {
        REGISTER: 'http://localhost:8080/api/auth/register',
        LOGIN: 'http://localhost:8080/api/auth/authenticate',
    },
    POINT:{
        GetAll: "http://localhost:8080/api/point/getAll",
        CREATE: "http://localhost:8080/api/point/create"
    }
}
export default Endpoints;