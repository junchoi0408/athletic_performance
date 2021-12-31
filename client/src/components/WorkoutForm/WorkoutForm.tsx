import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlusCircle, AiOutlineClose } from 'react-icons/ai';
import { WorkoutInfo, WorkoutLog } from '../../interfaces';
import { createWorkout, checkRecord } from '../../api';
import toast, { Toaster } from 'react-hot-toast';
import './WorkoutForm.css'
import { cp } from 'fs';

const WorkoutForm = () => {
    const [numSet, setNumSet] = useState([1]);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (d: any) => {

        let temp: WorkoutInfo[] = [];
        for (let i = 0; i < numSet.length; i++) {
            const data: WorkoutInfo = {
                set: i+1,
                reps: d[`workoutReps${i+1}`],
                weight: d[`workoutWeight${i+1}`],
                unit: d.unit,
            }
            
            temp.push(data);
        }

        const name: String = d.name;
        const date: Date = d.date;
        const projectedMax: Number = d.projectedMax;
        const comments: String = d.comments;

        const newData: WorkoutLog = {
            date: date,
            name: name,
            projectedMax: projectedMax,
            comments: comments,
            info: temp,
        };
        

        try { 
            const { data } = await checkRecord({ name, date });
            if (data.length > 0) {
                toast.error('Workout already exists!');
            } else { 
                createWorkout(newData);
                toast.success('Saved Successfully');
                reset();
                setNumSet([1]);
                temp = []
            }
            
        } catch (error: any) {
            toast.error('Something went wrong');
        }

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
            <select {...register("unit", { required: true })} className="form__input__select">
                <option value="lb">lb</option>
                <option value="kg">kg</option> 
            </select>
            <label>Date of workout: </label>
            <input {...register("date", { required: true })} type="date" className="form__input"/>
            <label>Name of workout: </label>
            <select {...register("name", { required: true })} className="form__input__select">
                <option value="Bench">Bench Press</option>
                <option value="Squat">Squat</option>
                <option value="Deadlift">Deadlift</option>
            </select>
            <label>Projected Max: </label>
            <input {...register("projectedMax", { required: true })} type="text" placeholder="Projected Max" className="form__input"/>
            {
                numSet.map((set, index) => {
                    return (
                        <div key={index} className="workout__sets">
                            <p style={{marginTop: "2.5em"}}>Set {set}: </p>
                            <div className="workout__reps">
                                <label style={{marginBottom: "0.5em"}}>Weight: </label>
                                <input className="workout__input" {...register(`workoutWeight${set}`, { required: true })} type="text" />
                            </div>
                            <p style={{marginTop: "2.5em"}}>x</p>
                            <div className="workout__reps">
                                <label style={{marginBottom: "0.5em"}}>Reps: </label>
                                <input className="workout__input" {...register(`workoutReps${set}`, { required: true })} type="text" />
                            </div>
                            <AiOutlineClose style={{marginTop: "1.5em", color: 'red', cursor: "pointer"}} onClick={deleteSet}/>
                        </div>

                    )
                })
            }
            <button className="workout__button" style={{margin: "1em 0"}} type="button" onClick={addSet}><AiOutlinePlusCircle size="1.5em"/> <span style={{width: "100%"}}>Add Set</span></button>
            <textarea {...register("comments")} placeholder="Comments" className="text__input"/>
            <button type="submit" className="save__button">Save Workout</button>
            <Toaster /> 
        </form>
    )
}

export default WorkoutForm;
