import { Workout } from '../workout/workout';

export class ActiveWorkout {
    activeWorkoutId: number;
    workOut: Workout;
    comment : string;
    startDate : Date;
    startTime : string;
    endDate : Date;
    endTime : string;

    constructor(){

    }
}
