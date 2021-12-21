import { Request, Response } from 'express';
import WorkoutLog, { WorkoutLogDocument } from '../model/workout';

export const getWorkouts = async (req: Request, res: Response) => {
    try {
        const workouts = await WorkoutLog.find();

        res.status(200).json(workouts);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export const createWorkouts = async(req: Request, res: Response) => {
    const data = req.body;

    const newWorkout: WorkoutLogDocument = new WorkoutLog(data);

    try {
        await newWorkout.save();

        res.status(201).json(newWorkout);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
    }
}