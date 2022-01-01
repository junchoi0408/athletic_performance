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
        return axios.post(url, newWorkout)
    }
    catch(error: any) {
        console.log(error.message);
    }
}

export const updateWorkout = (newWorkout: WorkoutLog) => {
    try {
        return axios.put(url, newWorkout);
    } catch(error: any) {
        console.log(error.message);
    }
}

export const deleteWorkout = (date: Date, name: String) => {
    try {
        return axios.delete(url, { data: { date, name } });
    } catch(error: any) {
        console.log(error.message);
    }
}