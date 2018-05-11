import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { Workout } from '../workout/workout';
import { Category } from '../category/category';
import { CategoryService } from '../services/category.service';
import { WorkoutService } from '../services/workout.service';
import { ServiceResponse } from '../services/service.response';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {

  private workOut: Workout = new Workout();
  private categoryList: Category[];
  observableMessage: Observable<ServiceResponse>;
  response: ServiceResponse;
  selectedCategory : Category =new Category(0,'--Please Select category--');
  observableCaterories : Observable<Category[]>;
  constructor(private categoryService: CategoryService,
    private workoutService: WorkoutService,
    private route: Router) {
      this.observableCaterories=categoryService.getAllCategories();
      this.observableCaterories.subscribe(
        categories => this.categoryList=categories
      );
  }

  ngOnInit() {
  }
  increment() {
    this.workOut.calBurntPerMin = Math.round((this.workOut.calBurntPerMin + 0.1) * 10) / 10;
  }
  decrement() {
    this.workOut.calBurntPerMin = Math.round((this.workOut.calBurntPerMin - 0.1) * 10) / 10;
  }

  save() {
    this.observableMessage = this.workoutService.save(this.workOut);
    this.observableMessage
    .subscribe(
        message => {
          this.response=message;
          if(this.response.message=="Success")
          this.route.navigate(["/view-all"])
        }
      
    );
  }

  onSelect() { 
    for (var i = 0; i < this.categoryList.length; i++)
    {
      if (this.categoryList[i].id == this.selectedCategory.id) {
        this.selectedCategory = this.categoryList[i];
      }
    }
    this.workOut.category=this.selectedCategory;
}
  title = 'Create Workout';
}
