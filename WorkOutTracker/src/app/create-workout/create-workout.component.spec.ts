import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { CreateWorkoutComponent } from './create-workout.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../workout/workout';
import { Category } from '../category/category';
import { CategoryService } from '../services/category.service';
import { Observable } from "rxjs/Rx";
import { ActiveWorkout } from '../active-workout/active-workout';
import { AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../home/home.component';
import {ViewAllComponent} from '../view-all/view-all.component'


describe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  let routerMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule,RouterTestingModule.withRoutes(
        [{path: '', component: HomeComponent}, {path: 'view-all', component: ViewAllComponent}])],
      providers: [{ provide: WorkoutService, useClass: WorkoutServiceMock },
      { provide: CategoryService, useClass: CategoryServiceMock },
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a create workout component with category list populated.', () => {
    expect(component).toBeTruthy();
  });

  class WorkoutServiceMock {

    getWorkoutById(id: number): Observable<Workout> {
      let workOutArray: Workout[] = [{ "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }, { "id": 240, "title": "Running", "notes": "Running note", "calBurntPerMin": 1.0, "category": { "id": 235, "name": "Jogging" } }];
      let workout: Workout[];
      workout = workOutArray.filter(x => x.id === id)
      return Observable.of(workout[0]);

    };
  }


  class CategoryServiceMock {
    getAllCategories(): Observable<Category[]> {
      let categoryArray: Category[] = [{ "id": 238, "name": "Yoga" }, { "id": 235, "name": "Jogging" }];
      return Observable.of(categoryArray);
    }
  }
});
