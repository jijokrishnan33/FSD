import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';

import { Workout } from '../workout/workout';
import { WorkoutService } from '../services/workout.service';
import { ActiveWorkout} from './active-workout';
import { ServiceResponse } from '../services/service.response';

@Component({
  selector: 'app-active-workout',
  templateUrl: './active-workout.component.html',
  styleUrls: ['./active-workout.component.css']
})
export class ActiveWorkoutComponent implements OnInit {

  private workOut: Workout= new Workout();
  observableWorkout: Observable<Workout>;
  fieldLabel : string;
  tittle : string="";
  activeWorkout :ActiveWorkout= new ActiveWorkout();
  observableActiveWorkout: Observable<ActiveWorkout>;
  id :number;
  observableMessage: Observable<ServiceResponse>;
  response: ServiceResponse;
  pipe = new DatePipe('en-US');
  constructor(private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private rte: Router) {
      let path=route.snapshot.url[0].path; 
      if(path=="start"){
        this.fieldLabel="Start";
        this.tittle="Start Workout"
      } else {
        this.fieldLabel="End";
        this.tittle="End Workout";
      }
      this.activeWorkout.startDate=new  Date();
      this.activeWorkout.startTime=this.transformTime(new  Date());
      this.activeWorkout.endDate=new  Date();
      this.activeWorkout.endTime=this.transformTime(new  Date());
     }

  ngOnInit() {
    this.activeWorkout.workOut=this.workOut;
    this.id= +this.route.snapshot.paramMap.get('id');
    this.observableWorkout = this.workoutService.getWorkoutById(this.id);
    this.observableWorkout.subscribe(
      workout => {this.workOut=workout;
        this.activeWorkout.workOut=workout;
      }
    );
    //this.activeWorkout.startDate=new  Date().toISOString().split('T')[0];
    
    console.log(this.activeWorkout.endTime);
  }

  process(){
    if(this.fieldLabel=="Start"){
      this.fieldLabel="End";
      this.tittle="End Workout";
    } else {
      console.log(this.activeWorkout.workOut.title);
      this.observableMessage=this.workoutService.saveActiveWorkout(this.activeWorkout);
      this.observableMessage
      .subscribe(
          message => {
            this.response=message;
            if(this.response.message=="Success")
            this.rte.navigate(["/view-all"])
          }
        
      );
    }
  }

  transformTime(now) {
    const myFormattedTime = this.pipe.transform(now, 'HH:mm:ss');
    return myFormattedTime;
  }
}
