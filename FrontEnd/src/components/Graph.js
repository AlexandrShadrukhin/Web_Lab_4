import React, { useEffect, useRef } from 'react'; // Размер клетки
const colorCuriousBlue = "rgb(52, 152, 219)";
const colorMariner = "rgb(41, 128, 185)";
const colorCinnabar = "rgb(231, 76, 60)";
const colorTallPoppy = "rgb(192, 57, 43)";
const colorButtercup = "rgb(243, 156, 18)";
const colorBurntOrange = "rgb(211, 84, 0)";
const cageSize = 50;
const Graph = ({ xValue, setX, yValue, setY, rValue, setR, list, setList,canvasRef,pointCanvasRef,drawDot,validateInputs,setErrors }) => {
    useEffect(() => {

        const graphWidth = 600;
        const graphHeight = 500;

        const colorRed = "red";
        const colorBlack = "black";

        const drawGrid = () => {
            const ctx = canvasRef.current.getContext('2d');
            const xAxis = (Math.round(graphWidth / cageSize / 2)-1 ) * cageSize;
            const yAxis = Math.round(graphHeight / cageSize / 2) * cageSize;


            ctx.font = '20px Arial';
            ctx.beginPath();
            ctx.strokeStyle = colorRed;

            for (let i = 0; i <= graphWidth; i += cageSize) {
                ctx.moveTo(i, 1);
                ctx.lineTo(i, graphHeight);
                ctx.fillText(((i - xAxis) / cageSize), i, yAxis);

            }

            for (let i = 0; i <= graphHeight; i += cageSize) {
                ctx.moveTo(0, i);
                ctx.lineTo(graphWidth, i);
                ctx.fillText(((yAxis - i) / cageSize), xAxis, i);
            }
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.strokeStyle = colorBlack;
            ctx.moveTo(xAxis, 0);
            ctx.lineTo(xAxis - 1, graphHeight);
            ctx.stroke();
            ctx.moveTo(0, yAxis);
            ctx.lineTo(graphWidth, yAxis - 1);
            ctx.stroke();
            ctx.closePath();
        };

        const drawGraph = (r) => {

            const ctx = canvasRef.current.getContext('2d');
            const cage = r * cageSize;
            const centerX = (Math.round(graphWidth / cageSize / 2) - 1) * cageSize;
            const centerY = Math.round(graphHeight / cageSize / 2) * cageSize;

            ctx.fillStyle = colorBlack;
            ctx.strokeStyle = colorBlack;
            ctx.clearRect(0, 0, graphWidth, graphHeight);
            drawGrid();
            square(cage, centerX, centerY);
            circle(cage, centerX, centerY);
            triangle(cage, centerX, centerY);
        };

        const square = (cage, centerX, centerY) => {
            const ctx = canvasRef.current.getContext('2d');

            ctx.beginPath();
            ctx.rect(centerX - cage, centerY, cage, -cage);
            ctx.fillStyle = colorCuriousBlue;
            ctx.fill();
            ctx.strokeStyle = colorMariner;
            ctx.stroke();
            ctx.closePath();
        };

        const circle = (cage, centerX, centerY) => {
            const ctx = canvasRef.current.getContext('2d');

            ctx.beginPath();
            ctx.arc(centerX, centerY, cage, (Math.PI / 180) * 270, (Math.PI / 180) * 360);
            ctx.lineTo(centerX + cage, centerY);
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = colorButtercup;
            ctx.fill();
            ctx.strokeStyle = colorBurntOrange;
            ctx.stroke();
            ctx.closePath();
        };

        const triangle = (cage, centerX, centerY) => {
            const ctx = canvasRef.current.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX, centerY + cage);
            ctx.lineTo(centerX - cage / 2, centerY);
            ctx.closePath();
            ctx.fillStyle = colorCinnabar;
            ctx.fill();
            ctx.strokeStyle = colorTallPoppy;
            ctx.stroke();
            ctx.closePath();
        };

        drawGraph(rValue);
    }, [xValue, yValue, rValue]);


    const handleClick = (event) => {
        if (rValue === null) {
            alert("Выберите значение R");
            return;
        }
        const canvas = pointCanvasRef.current;
        const xAxis = (Math.round(canvas.width / cageSize / 2)-1 ) * cageSize;
        const yAxis = Math.round(canvas.height / cageSize / 2) * cageSize;
        const rect = canvas.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xRes = (x - xAxis) / cageSize;
        const yRes = (yAxis - y) / cageSize;
        const validationErrors = validateInputs(xRes, yRes, rValue);
        setX(xRes);
        setY(yRes);
        pointCanvasRef.current.getContext('2d').clearRect(0,0,pointCanvasRef.current.width,pointCanvasRef.current.height)
        drawDot(canvas, xRes, yRes, null);
        setErrors(validationErrors);
        console.log(xRes,yRes);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={600}
                height={500}
                style={{position: 'absolute', top: '50', left: '30', border: '1px solid black' ,zIndex: 1 }}
            />
            <canvas
                ref={pointCanvasRef}
                width={600}
                height={500}
                style={{ position: 'absolute', top: '50', left: '30',zIndex: 2 }}
                onClick={handleClick}
            />
        </div>
    );
};

export default Graph;
