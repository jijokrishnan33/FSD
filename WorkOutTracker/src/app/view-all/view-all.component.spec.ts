import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, ParamMap, Data } from "@angular/router";

import { ViewAllComponent } from './view-all.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../workout/workout';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../services/service.response';

describe('ViewAllComponent', () => {
  let component: ViewAllComponent;
  let fixture: ComponentFixture<ViewAllComponent>;
  let workOutArray: Workout[] = [{ "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }, { "id": 240, "title": "Running", "notes": "Running note", "calBurntPerMin": 1.0, "category": { "id": 235, "name": "Jogging" } }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: WorkoutService, useClass: WorkoutServiceMock }]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and fetch all the workouts', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the selected workout', () => {
    let workout: Workout = { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } };
    component.delete(workout);
    expect(workOutArray.length).toBe(1);
  });

  class WorkoutServiceMock {

    getAllWorkouts(id: number): Observable<Workout[]> {

      return Observable.of(workOutArray);
    };

    deleteWorkout( workout :Workout) : Observable<ServiceResponse>{
      var index = workOutArray.indexOf(workout);
      workOutArray.splice(index, 1);
      return Observable.of(new ServiceResponse("Success"));
    }
  }
});
