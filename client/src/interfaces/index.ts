export interface WorkoutInfo {
    set: Number;
    reps: Number;
    weight: Number;
    
}
export interface WorkoutLog {
    name: String;
    projectedMax: number;
    info: WorkoutInfo[];
    comments?: String;
    date: Date;
}

export interface IWorkoutParams {
    name: String; 
    date: Date;
}

export interface IGraphData {
    x: number;
    y: number;
}