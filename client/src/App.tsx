import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Charts from './components/Charts/Charts';
import { WorkoutLog, IGraphData } from './interfaces';
import WorkoutForm from './components/WorkoutForm/WorkoutForm';
import { fetchWorkout } from './api';
import './App.css';



const App = () => {
    const [graphData, setGraphData] = useState<IGraphData[]>([]);
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const [minWeight, setMinWeight] = useState<number>(10000);
    const [maxWeight, setMaxWeight] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const { data } = await fetchWorkout();

        const bench = data.filter((workout: WorkoutLog) => workout.name === 'Bench');
     
        const cleanedData = bench.map((workout: WorkoutLog) => {
            const { date, projectedMax } = workout;

            return {
                x: new Date(date),
                y: projectedMax
            }
        })


        cleanedData.sort((a: IGraphData, b:IGraphData) => {
            return a.x - b.x
        })

        const weightData = cleanedData.sort((a: IGraphData, b:IGraphData) => {
            return a.y - b.y
        })

        const newMinWeight = weightData[0].y
        const newMaxWeight = weightData[cleanedData.length-1].y

        setMinWeight(newMinWeight);
        setMaxWeight(newMaxWeight);
        
        const minDate = cleanedData[0].x
        const maxDate = cleanedData[cleanedData.length-1].x

        setMinDate(minDate);
        setMaxDate(maxDate);

        setGraphData(cleanedData);
    }

    return (
        <>
            <Navbar /> 
            <div className="app">
                <Charts minDate={minDate} maxDate={maxDate} minWeight={minWeight} maxWeight={maxWeight} graphData={graphData}/>
                <WorkoutForm />
            </div>
        </>
    )
}

export default App;
