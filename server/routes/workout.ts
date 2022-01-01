import express, { Request, Response } from 'express';
import { getWorkouts, createWorkouts, getRecord, updateWorkout, deleteWorkout } from '../controller/workout';

const router = express.Router();

router.get('/', getWorkouts);

router.get('/record', getRecord);

router.put('/', updateWorkout)

router.post('/', createWorkouts);

router.delete('/', deleteWorkout)

export default router;