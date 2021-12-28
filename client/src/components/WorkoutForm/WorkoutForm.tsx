import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkoutInfo, WorkoutLog } from '../../interfaces'
import './WorkoutForm.css'

const WorkoutForm = () => {
    const [numSet, setNumSet] = useState([1]);
    const [setReps, setSetReps] = useState<WorkoutInfo[]>([]);
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (d: any) => {

        for (let i = 0; i < numSet.length; i++) {
            const data: WorkoutInfo = {
                set: i+1,
                reps: d[`workoutReps${i+1}`],
                weight: d[`workoutWeight${i+1}`],
                unit: d.unit,
            }
            
            setSetReps([...setReps, data ]);
            console.log({
                set: i+1,
                reps: d[`workoutReps${i+1}`],
                weight: d[`workoutWeight${i+1}`],
                unit: d.unit,
            })
        }

        const name: String = d.name;
        const date: Date = d.date;
        const projectexMax: Number = d.projectexMax;


        const data: WorkoutLog = {
            createdAt: date,
            workout: {
                name: name,
                projectedMax: projectexMax,
                info: setReps,
            },
        };
    }
    
    const addSet = () => {
        setNumSet([...numSet, numSet.length + 1]);
    }

    const deleteSet = () => {
        setNumSet([...numSet.slice(0, numSet.length - 1)]);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="workout__form">
            <label>Unit: </label>
            <select {...register("unit")} className="form__input__select">
                <option value="lb">lb</option>
                <option value="kg">kg</option> 
            </select>
            <label>Date of workout: </label>
            <input {...register("date")} type="date" className="form__input"/>
            <label>Name of workout: </label>
            <select {...register("name")} className="form__input__select">
                <option value="Bench">Bench Press</option>
                <option value="Squat">Squat</option>
                <option value="Deadlift">Deadlift</option>
            </select>
            <label>Projected Max: </label>
            <input {...register("projectedMax")} type="text" placeholder="Projected Max" className="form__input"/>
            {
                numSet.map((set, index) => {
                    return (
                        <div key={index} className="workout__sets">
                            <p style={{marginTop: "2.5em"}}>Set {set}: </p>
                            <div className="workout__reps">
                                <label style={{marginBottom: "0.5em"}}>Weight: </label>
                                <input className="workout__input" {...register(`workoutWeight${set}`)} type="text" placeholder="Weight" />
                            </div>
                            <p style={{marginTop: "2.5em"}}>x</p>
                            <div className="workout__reps">
                                <label style={{marginBottom: "0.5em"}}>Reps: </label>
                                <input className="workout__input" {...register(`workoutReps${set}`)} type="text" placeholder="Reps" />
                            </div>
                            <AiOutlineClose style={{marginTop: "1.5em", color: 'red', cursor: "pointer"}} onClick={deleteSet}/>
                        </div>

                    )
                })
            }
            <button style={{margin: "1em 0"}} type="button" onClick={addSet}>Add Set</button>
            <textarea placeholder="Comments" id="note" name="note" className="text__input"/>
            <button type="submit">Save Workout</button>
        </form>
    )
}

export default WorkoutForm;
