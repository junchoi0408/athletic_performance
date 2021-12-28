export interface WorkoutInfo {
    set: Number;
    reps: Number;
    weight: Number;
    unit: String;
}

interface Workout {
    name: String;
    projectedMax: Number;
    info: WorkoutInfo[];
}

export interface WorkoutLog {
    workout: Workout;
    createdAt: Date;
}