import mongoose from 'mongoose';

interface WorkoutInfo {
    set: Number;
    reps: Number;
    weight: Number;
    unit: String;
}

export interface WorkoutLogDocument extends mongoose.Document {
    createdAt: Date;
    name: string;
    projectedMax: Number;
    comments?: String;
    info: WorkoutInfo[];
}

const workoutSchema = new mongoose.Schema(
    {
      
        name: String,
        projectedMax: Number,
        info: [
            {
                set: Number,
                reps: Number,
                weight: Number,
                unit: String
            }
        ],
        comments: String,
        date: {
            type: Date,
            default: Date.now()
        }
    }  
);

const WorkoutLog = mongoose.model('WorkoutLog', workoutSchema);

export default WorkoutLog;