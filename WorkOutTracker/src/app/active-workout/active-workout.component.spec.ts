import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
 

import { ActiveWorkoutComponent } from './active-workout.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from '../category/category';
import { CategoryService } from '../services/category.service';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../workout/workout';
import {Observable} from "rxjs/Rx";

describe('ActiveWorkoutComponent', () => {
  let component: ActiveWorkoutComponent;
  let fixture: ComponentFixture<ActiveWorkoutComponent>;
  let routerMock: any;
  let workoutMock: Workout;
  let paramMap: MockParamMap;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: WorkoutService, useClass: WorkoutServiceMock },
      { provide: CategoryService, useClass: CategoryServiceMock},
      { provide: Router, useValue: routerMock },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
              paramMap: new MockParamMap(),
              url : 
                [
                  {
                    path: 'start'
                  }
                ]
              
          }
        }
      }
      ]
    })
      .compileComponents();


    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a start workout screen withn category and selected workout', () => {
    expect(component).toBeTruthy();
  });


  class WorkoutServiceMock {
    
        getWorkoutById(id: number) : Observable<Workout>{
          let workOutArray:Workout[]=[{"id":239,"title":"Naukasana","notes":"Naukasana Note","calBurntPerMin":0.3,"category":{"id":238,"name":"Yoga"}},{"id":240,"title":"Running","notes":"Running note","calBurntPerMin":1.0,"category":{"id":235,"name":"Jogging"}}];
          let workout :Workout[];
          workout = workOutArray.filter(x => x.id === id)
          return Observable.of(workout[0]);
    
        };
      }
    
      class MockParamMap {
        get(id: string) {
          return 239;
        }
      }
    
      class CategoryServiceMock {
        getAllCategories() : Observable<Category[]>{
          let categoryArray:Category[]=[{"id":238,"name":"Yoga"},{"id":235,"name":"Jogging"}];
          return Observable.of(categoryArray);
        }
      }
});
