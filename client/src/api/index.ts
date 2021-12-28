import axios from 'axios';
import { WorkoutLog } from '../interfaces';

const url = 'http://localhost:5000/workout';

export const fetchWorkout = async () => axios.get(url);
export const createWork = (newWorkout:WorkoutLog) => axios.post(url, newWorkout);