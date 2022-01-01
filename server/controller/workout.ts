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

export const getRecord = async (req: Request, res: Response) => {
    const { name, date } = req.query;
 
    try { 
        const workouts = await WorkoutLog.find({ name, date });
        res.status(200).json(workouts);
    } catch (error) {
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

export const updateWorkout = async (req: Request, res: Response) => {
    const data = req.body;
    const { projectedMax, info, comments, date } = data;

    try {
        const workout = await WorkoutLog.findOne({ date }, (error: any, foundObj: WorkoutLogDocument) => {
            if (error) {
                res.status(404).json({ message: error.message });
            }
            foundObj.projectedMax = projectedMax;
            foundObj.info = info;
            foundObj.comments = comments;
            foundObj.save();
        });        
        res.status(200).json(workout);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export const deleteWorkout = async (req: Request, res: Response) => {
    const { date, name } = req.body;

    try { 
        const workouts = await WorkoutLog.findOneAndDelete({ name, date });

        res.status(200).json(workouts);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
    }
   
}