import React from 'react'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import Navbar from './components/Navbar/Navbar'
import { useForm } from 'react-hook-form';
import { WorkoutLog } from './interfaces';
import WorkoutForm from './components/WorkoutForm/WorkoutForm';
import './App.css';

const App = () => {

    const date = new Date();
    const formattedDate = date.getMonth();


    return (
        <>
            <Navbar /> 
            <div className="app">
                
                <div className="chart__container">
                    <VictoryChart theme={VictoryTheme.material} >
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc"}
                            }}
                            data={[
                                { x: formattedDate-11, y: 1 },
                                { x: formattedDate-10, y: 2 },
                                { x: formattedDate-9, y: 4 },
                                { x: formattedDate-8, y: 3 },
                                { x: formattedDate-7, y: 6 },
                                { x: formattedDate-6, y: 7 },
                                { x: formattedDate-5, y: 100 },
                                { x: formattedDate-4, y: 4 },
                                { x: formattedDate-3, y: 5 },
                                { x: formattedDate-2, y: 2 },
                                { x: formattedDate-1, y: 5 },
                                { x: formattedDate, y: 4 },
                                { x: formattedDate+1, y: 7 }
                            ]}
                        />
                        </VictoryChart>
                </div>
                <WorkoutForm />
            </div>
        </>
    )
}

export default App;
