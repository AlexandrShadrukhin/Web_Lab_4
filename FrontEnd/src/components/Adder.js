import React from "react";
import pointService from "../service/pointService";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setMessage} from "../slice/messageSlice";
import {logout} from "../slice/authSlice";

const Adder = ({
                   addPoint,
                   setX,
                   setY,
                   setR,
                   xValue,
                   yValue,
                   rValue,
                   drawDot,
                   pointCanvasRef,
                   validateInputs,
                   errors,
                   setErrors
               }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const x = xValue;
        const y = yValue;
        const r = rValue;
        const validationErrors = validateInputs(x, y, r);
        pointService
            .createPoint(x, y, r)
            .then(
                (response) => {
                    addPoint(response);
                    drawDot(pointCanvasRef.current, response.xCoordination, response.yCoordination, response.result);
                }).catch((error) => {
            if (error.response && error.response.status === 401) {
                // Вывести окно ошибки и кнопку для повторной авторизации
                alert("Ошибка авторизации. Пожалуйста, авторизуйтесь снова.");
                navigate("/");
                window.location.reload();
                dispatch(logout());
            }
            dispatch(setMessage(error.response.data.message));
        })
        setErrors(validationErrors)
    };


    const handleChange = (event) => {
        const form = event.target.form;
        const x = form.x.value;
        const y = form.y.value;
        const r = form.r.value;
        console.log(x, y, r)
        const validationErrors = validateInputs(x, y, r);
        setX(x);
        setY(y);
        setR(r);
        pointCanvasRef.current.getContext('2d').clearRect(0, 0, pointCanvasRef.current.width, pointCanvasRef.current.height)
        drawDot(pointCanvasRef.current, x, y, null);
        setErrors(validationErrors);
    };


    return (
        <div className="addForm">
            <form onSubmit={handleSubmit}>
                <div className="x-radio">
                    <label htmlFor="x">X:</label>
                    {["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"].map((option) => (
                        <label key={option} className="form-check-inline">
                            <input
                                type="radio"
                                name="x"
                                value={option}
                                checked={xValue === option}
                                onChange={handleChange}
                            />
                            {option}
                        </label>
                    ))}
                    {errors.x && <div className="error">{errors.x}</div>}
                </div>

                <div>
                    <label htmlFor="y">Y:</label>
                    <input
                        type="text"
                        id="y"
                        name="y"
                        value={yValue}
                        onChange={handleChange}
                    />
                    {errors.y && <div className="error">{errors.y}</div>}
                </div>

                <div className="r-radio">
                    <label htmlFor="r">R:</label>
                    {["1", "2", "3"].map((option) => (
                        <label key={option} className="form-check-inline">
                            <input
                                type="radio"
                                name="r"
                                value={option}
                                checked={rValue === option}
                                onChange={handleChange}
                            />
                            {option}
                        </label>
                    ))}
                    {errors.r && <div className="error">{errors.r}</div>}
                </div>
                <button type="submit" disabled={Object.keys(errors).length > 0}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Adder;