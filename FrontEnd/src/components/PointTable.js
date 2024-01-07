import {useEffect} from "react";


const PointTable = ({pointsList,drawDot,pointCanvasRef}) => {
    useEffect(()=> {
        if (pointsList) {
        pointsList.map((point, index) => {
            drawDot(pointCanvasRef.current, point.xCoordination, point.yCoordination, point.result);
        })}}, [pointsList, drawDot, pointCanvasRef]);
    const tableStyle = {
        opacity: 0.8,
    };
    const table = (
        <div className="table-responsive" style={{ height: "300px", overflowY: "scroll" }}>
        <table className='table table-dark ' style={tableStyle} >
            <thead>
            <tr>
                <th scope='col'>X</th>
                <th scope="col">Y</th>
                <th scope="col">R</th>
                <th scope="col">Result</th>
                <th scope="col">Create Date</th>
                <th scope="col">Execute Time</th>
            </tr>
            </thead>
            <tbody>
            {pointsList &&pointsList.map((point,index)=>(
                <tr key={index}>
                    <td>{point.xCoordination}</td>
                    <td>{point.yCoordination}</td>
                    <td>{point.rSizeGraph}</td>
                    <td>{point.result ? 'Попадание' : 'Промах'}</td>
                    <td>{point.creationDate}</td>
                    <td>{point.executeTime}</td>
                </tr>
            ))
            }
            </tbody>
        </table>
            </div>
    );
return table;

}
export default PointTable;