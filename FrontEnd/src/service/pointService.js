import axios from "axios";
import Endpoints from "../endpoints/endpoints";
import authHeader from "./authHeader";
import {setMessage} from "../slice/messageSlice";
import {useDispatch} from "react-redux";


const dispatch = useDispatch
const getAllPointCurrentUser = () => {
    return axios.get(Endpoints.POINT.GetAll, {headers: authHeader()})
};

const createPoint = (xCoordination, yCoordination, rSizeGraph) => {
    return axios.post(Endpoints.POINT.CREATE, {
            xCoordination,
            yCoordination,
            rSizeGraph
        },
        {headers: authHeader()})
        .then((response) => {
            try {
                if (response.data.pointId) {
                    return response.data
                }
            } catch (error) {
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                dispatch(setMessage(errMsg));
            }
        })
};

export const PointService = {
    getAllPointCurrentUser,
    createPoint
}
export default PointService;