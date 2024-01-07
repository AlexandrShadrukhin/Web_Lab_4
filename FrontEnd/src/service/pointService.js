import axios from "axios";
import Endpoints from "../endpoints/endpoints";
import {setMessage} from "../slice/messageSlice";
import {useDispatch} from "react-redux";
import getAuthHeader from "./authHeader";


const dispatch = useDispatch
const getAllPointCurrentUser = () => {
    return axios.get(Endpoints.POINT.GetAll, {headers: getAuthHeader()})
};

const createPoint = (xCoordination, yCoordination, rSizeGraph) => {
    return axios.post(Endpoints.POINT.CREATE, {
            xCoordination,
            yCoordination,
            rSizeGraph
        },
        {headers: getAuthHeader()})
        .then((response) => {
            try {
                if (response.data.pointId) {
                    return response.data
                }
            } catch (error) {
                const errMsg =
                    (error.response?.data?.message) ||
                    (error.message) ||
                    error.toString()
                dispatch(setMessage(errMsg));
            }
        })
};

export const PointService = {
    getAllPointCurrentUser,
    createPoint
}
export default PointService;