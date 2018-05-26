import { Injectable } from '@angular/core';

import { Workout } from '../workout/workout';
import { Category } from '../category/category';
import { ActiveWorkout } from '../active-workout/active-workout';
import { Response,Http,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ServiceResponse} from './service.response';


@Injectable()
export class WorkoutService {

  workouts :Workout[]=[];
  constructor(private http :Http) { }

 
  getAllWorkouts(): Observable<Workout[]>{

    return this.http.get("http://localhost:8085/workouttrackerservice/workout/getall").map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getWorkoutById(id): Observable<Workout>{
      return this.http.get("http://localhost:8085/workouttrackerservice/workout/getworkout/"+id).map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  updateWorkOut(workout:Workout): Observable<ServiceResponse> {
    let headers= new Headers({'Content-Type':'application/json'});
    let options= new RequestOptions({headers:headers});
    return this.http.post("http://localhost:8085/workouttrackerservice/workout/save",workout,options).map(this.extractData)
    .catch(this.handleErrorObservable);
}

save(workout:Workout): Observable<ServiceResponse>{
  let headers= new Headers({'Content-Type':'application/json'});
  let options= new RequestOptions({headers:headers});
  console.log(workout);
  return this.http.post("http://localhost:8085/workouttrackerservice/workout/save",workout,options).map(this.extractData)
  .catch(this.handleErrorObservable);
}
deleteWorkout(workout:Workout): Observable<ServiceResponse>{
  let headers= new Headers({'Content-Type':'application/json'});
  let options= new RequestOptions({headers:headers});
  console.log(workout);
  return this.http.post("http://localhost:8085/workouttrackerservice/workout/delete",workout,options).map(this.extractData)
  .catch(this.handleErrorObservable);
}

saveActiveWorkout(activeWorkout:ActiveWorkout): Observable<ServiceResponse>{
  let headers= new Headers({'Content-Type':'application/json'});
  let options= new RequestOptions({headers:headers});
  console.log(activeWorkout);
  return this.http.post("http://localhost:8085/workouttrackerservice/activeworkout/save",activeWorkout,options).map(this.extractData)
  .catch(this.handleErrorObservable);
}

getAllActiveWorkouts():  Observable<ActiveWorkout[]>{
  return this.http.get("http://localhost:8085/workouttrackerservice/activeworkout/getall").map(this.extractData)
  .catch(this.handleErrorObservable);
}

private extractData(res :Response){
  console.log(res);
  let body = res.json();
  return body || {};
}



private handleErrorObservable (error: Response | any) {
  console.error("This is error: "+error.message || error);
  return Observable.throw(error.message || error);
} 

}
