import axios from 'axios';
import { WorkoutLog, IWorkoutParams } from '../interfaces';

const url = 'http://localhost:5000/workout';

export const fetchWorkout = () => axios.get(url);
export const checkRecord = (record: IWorkoutParams) => {
    const { name, date } = record;

    return axios.get(url+'/record', { params: { name, date } });
}

export const createWorkout = (newWorkout:WorkoutLog) => {
    try {
        axios.post(url, newWorkout)
    }
    catch(error: any) {
        console.log(error.message);
    }
}

export const updateWorkout = (newWorkout: WorkoutLog) => {
    try {
        axios.put(url, newWorkout);
    } catch(error: any) {
        console.log(error.message);
    }
}