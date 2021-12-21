import mongoose from 'mongoose';

interface workoutInfo {
    set: Number;
    reps: Number;
    weight: Number;
    unit: String;
}

interface workout {
    name: string;
    info: workoutInfo[];
}

export interface WorkoutLogDocument extends mongoose.Document {
    workout: workout[];
    createdAt: Date;
}

const workoutSchema = new mongoose.Schema(
    {
        workouts: [{
            name: String,
            info: [
                {
                    set: Number,
                    reps: Number,
                    weight: Number,
                    unit: String
                }
            ]
        }],
        
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }  
);

const WorkoutLog = mongoose.model('WorkoutLog', workoutSchema);

export default WorkoutLog;