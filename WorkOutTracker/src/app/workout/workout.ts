import { Category } from '../category/category'

export class Workout {

    public id: number;
    public title: string;
    public notes: string;
    public calBurntPerMin: number=0;
    public category: Category;

    constructor(){

    }

}
