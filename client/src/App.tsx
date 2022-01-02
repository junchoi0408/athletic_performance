import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Charts from './components/Charts/Charts';
import { WorkoutLog, IGraphData, WorkoutInfo } from './interfaces';
import WorkoutForm from './components/WorkoutForm/WorkoutForm';
import { fetchWorkout, deleteWorkout } from './api';
import './App.css';
import { AiOutlineClose } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { convertCompilerOptionsFromJson } from 'typescript';

const App = () => {
    const [graphData, setGraphData] = useState<IGraphData[]>([]);
    const [workoutChoice, setWorkoutChoice] = useState<string>('Bench');
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [maxDate, setMaxDate] = useState<Date>(new Date());
    const [minWeight, setMinWeight] = useState<number>(10000);
    const [maxWeight, setMaxWeight] = useState<number>(0);
    const [fetchedRawData, setFetchedRawData] = useState<WorkoutLog[]>([]);

    useEffect(() => {
        fetchData();
    }, [workoutChoice])

    const fetchData = async () => {
        const { data } = await fetchWorkout();  
        
        const fetchedData = data.filter((workout: WorkoutLog) => workout.name === workoutChoice);

        if (fetchedData.length === 0) {
            setGraphData([]);
            setFetchedRawData([]);
            return;
        }

        setFetchedRawData(fetchedData);

        const cleanedData = fetchedData.map((workout: WorkoutLog) => {
            const { date, projectedMax} = workout;
    
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

        const newMinWeight = weightData[0].y;
        const newMaxWeight = weightData[cleanedData.length-1].y;
      
        setMinWeight(newMinWeight);
        setMaxWeight(newMaxWeight);

        const minDate = cleanedData[0].x
        const maxDate = cleanedData[cleanedData.length-1].x

        setMinDate(minDate);
        setMaxDate(maxDate);

        setGraphData(cleanedData);
    }

    const handleWorkoutChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWorkoutChoice(e.target.value);
    }

    const handleDelete = async (deleteDate: Date, deleteName: String) => {
        const res = await deleteWorkout(deleteDate, deleteName);
        if (res?.data) {
            
            const newGraphData = fetchedRawData.filter((data: WorkoutLog) => {
                return data.date !== deleteDate && data.name === deleteName;
            })
            setFetchedRawData(newGraphData);
            toast.success('Workout deleted successfully!');
        } else {
            toast.error('Something went wrong');
        }
    }

    return (
        <>
            <Navbar /> 
            <div className="filter">
                <label>Select workout: </label>
                <select className="form__input__select" onChange={handleWorkoutChoice}>
                    <option value="Bench">Bench Press</option>
                    <option value="Squat">Squat</option> 
                    <option value="Deadlift">Deadlift</option> 
                </select>
            </div>
            <div className="app">
                <Charts minDate={minDate} maxDate={maxDate} minWeight={minWeight} maxWeight={maxWeight} graphData={graphData} />
                <WorkoutForm fetchData={fetchData}/>
            </div>
            <div className="history">
                <p>History - Raw data</p>
                {fetchedRawData.map((workout: WorkoutLog, index: number) => {
                    return (
                        <div className="raw__data" key={index}>
                            <p>{workout.date.toString().split('T')[0]}:</p> 
                            <p>Projected max: {workout.projectedMax}</p>
                            <AiOutlineClose style={{color: "red", cursor: "pointer"}} onClick={() => handleDelete(workout.date, workout.name)}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default App;
