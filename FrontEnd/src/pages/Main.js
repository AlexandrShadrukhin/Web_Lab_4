import React, {useEffect, useRef, useState} from "react";
import pointService from "../service/pointService";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, setMessage} from "../slice/messageSlice";
import {logout} from "../slice/authSlice";
import {useNavigate} from "react-router-dom";
import Adder from "../components/Adder";
import PointTable from "../components/PointTable";
import Graph from "../components/Graph";

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const canvasRef = useRef(null);
    const pointCanvasRef = useRef(null);
    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state) => state.auth);
    const [xValue, setX] = useState(null);
    const [yValue, setY] = useState(null);
    const [rValue, setR] = useState(null);
    const [errors, setErrors] = useState({
        x: "",
        y: "",
        r: ""
    });
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const addPoint = (newPoint) => {
        setList(prevState => [newPoint, ...prevState]);
    };

    useEffect(() => {
        pointService
            .getAllPointCurrentUser()
            .then((response) => {
                setList(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert("Authorization error. Please log in again.");
                    navigate("/");
                    window.location.reload();
                    dispatch(logout());
                }
                dispatch(setMessage(error.response.data.message));
                setIsLoading(true);
            });
    }, []);
    if (!isLoggedIn) {
        alert("Authorization error. Please log in.");
        navigate("/");
        window.location.reload();
        dispatch(logout());
    }

    const validateInputs = (xValue, yValue, rValue) => {
        const errors = {};
        if (!xValue) {
            errors.x = "X value is required";
        }
        if (isNaN(parseFloat(yValue)) || !isFinite(yValue)) {
            errors.y = "Y must be a number";
        } else if (yValue < -3 || yValue > 3) {
            errors.y = "Y value must be between -3 and 3";
        }
        if (!rValue) {
            errors.r = "R value is required";
        }
        return errors;
    };
    function drawDot(canvas, xVal, yVal, result) {
        const ctx = canvas.getContext("2d");

        const cageSize = 50;
        const xAxis = (Math.round(canvas.width / cageSize / 2) - 1) * cageSize;
        const yAxis = Math.round(canvas.height / cageSize / 2) * cageSize;
        const x = xAxis + xVal * cageSize;
        const y = yAxis - yVal * cageSize;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        if (result) {
            ctx.fillStyle = "rgb(0, 255, 0)";
        } else if(result===null){
           ctx.fillStyle = "rgb(25, 0, 255)";
        }
        else {
            ctx.fillStyle = "rgb(255, 0, 0)";
        }
        ctx.fill();
        ctx.closePath();
    }
    const style = {
        height: '52vh'
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <div className="row" style={style}>
                    <div className="col-md-6">
                        {isLoading && (
                            <Graph
                                errors={errors}
                                setErrors={setErrors}
                                xValue={xValue}
                                setX={setX}
                                yValue={yValue}
                                setY={setY}
                                rValue={rValue}
                                setR={setR}
                                list={list}
                                setList={setList}
                                drawDot={drawDot}
                                canvasRef={canvasRef}
                                pointCanvasRef={pointCanvasRef}
                                validateInputs={validateInputs}
                            />
                        )}
                    </div>
                    <div className="col-md-6">
                        <Adder
                            addPoint={addPoint}
                            errors={errors}
                            setErrors={setErrors}
                            setX={setX}
                            setY={setY}
                            setR={setR}
                            rValue={rValue}
                            yValue={yValue}
                            xValue={xValue}
                            drawDot={drawDot}
                            canvasRef={canvasRef}
                            pointCanvasRef={pointCanvasRef}
                            validateInputs={validateInputs}
                        />
                    </div>
                </div>
            </header>
            <div className="row" >
                <div className="col-md-12">
                    <PointTable
                        pointsList={list}
                        pointCanvasRef={pointCanvasRef}
                        drawDot={drawDot}
                    />
                </div>
            </div>
            <div>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};
export default Main;