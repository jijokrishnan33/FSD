import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { CategoryComponent } from './category.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from '../category/category';
import { CategoryService } from '../services/category.service';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../workout/workout';
import { Observable } from "rxjs/Rx";

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let routerMock: any;
  let categoryMock: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: CategoryService, useClass: CategoryServiceMock},
      { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();


    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create category screen with all the category items', () => {
    expect(component).toBeTruthy();
  });

  class CategoryServiceMock {
    getAllCategories() : Observable<Category[]>{
      let categoryArray:Category[]=[{"id":238,"name":"Yoga"},{"id":235,"name":"Jogging"}];
      return Observable.of(categoryArray);
    }
  }
});
