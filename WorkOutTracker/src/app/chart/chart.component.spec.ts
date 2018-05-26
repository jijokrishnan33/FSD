import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DatePipe } from '@angular/common';

import { ChartComponent } from './chart.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../workout/workout';
import { Observable } from "rxjs/Rx";
import { ActiveWorkout } from '../active-workout/active-workout'

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let routerMock: any;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: WorkoutService, useClass: WorkoutServiceMock},
      { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();


    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create day Graph week graph and month graph', () => {
    expect(component).toBeTruthy();
  });

  class WorkoutServiceMock {
    pipe = new DatePipe('en-US');
    getAllActiveWorkouts():  Observable<ActiveWorkout[]>{
          let activeWorkOutArray:ActiveWorkout[]=[{"activeWorkoutId":241,"workOut":{"id":239,"title":"Naukasana","notes":"Naukasana Note","calBurntPerMin":0.3,"category":{"id":238,"name":"Yoga"}},"comment":null,"startDate":new Date("2018-05-16"),"startTime":"18:33:55","endDate":new Date("2018-05-16"),"endTime":"18:36:55"},{"activeWorkoutId":242,"workOut":{"id":240,"title":"Running","notes":"Running note","calBurntPerMin":1.0,"category":{"id":235,"name":"Jogging"}},"comment":null,"startDate":new Date("2018-05-16"),"startTime":"18:34:12","endDate":new Date("2018-05-16"),"endTime":"18:36:12"}];
          return Observable.of(activeWorkOutArray);
    
        };
      }
});
