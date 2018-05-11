import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { WorkoutService } from '../services/workout.service';
import { Workout } from '../workout/workout';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../services/service.response';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  private workOut: Workout;
  observableWorkouts: Observable<Workout[]>;
  workouts: Workout[];
  observableMessage: Observable<ServiceResponse>;
  response: ServiceResponse;
  searchText='';
  constructor(private workoutService: WorkoutService,
    private rte: Router) {
      this.getAllWorkouts();
  }

  ngOnInit() {
  }
  delete(workOut:Workout) {
    this.observableMessage = this.workoutService.deleteWorkout(workOut);
    this.observableMessage
    .subscribe(
        message => {
          this.response=message;
          if(this.response.message=="Success")
          this.getAllWorkouts();
        }
      
    );
  }

  getAllWorkouts(){
    this.observableWorkouts = this.workoutService.getAllWorkouts();
    this.observableWorkouts.subscribe(
      workouts => this.workouts=workouts
    );
  }
}
