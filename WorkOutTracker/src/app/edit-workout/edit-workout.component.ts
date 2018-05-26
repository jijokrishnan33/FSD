import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Workout } from '../workout/workout';
import { Category } from '../category/category';
import { WorkoutService } from '../services/workout.service';
import { CategoryService } from '../services/category.service';
import { ServiceResponse } from '../services/service.response';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {

  workOut: Workout;
  categoryList:Category[];
  observableWorkout: Observable<Workout>;
  observableMessage: Observable<ServiceResponse>;
  response: ServiceResponse;
  selectedCategory : Category;
  observableCaterories: Observable<Category[]>;
  constructor(private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private rte: Router,
    private categoryService : CategoryService) {

    let id = +this.route.snapshot.paramMap.get('id');
    this.observableWorkout = workoutService.getWorkoutById(id);
    this.observableWorkout.subscribe(
      workout => {this.workOut=workout;
      this.selectedCategory=this.workOut.category}
    );
    this.observableCaterories=categoryService.getAllCategories();
    this.observableCaterories.subscribe(
      categories => this.categoryList=categories
    );
    
  }
  ngOnInit() {
  }
  title = "Edit Workout";
  
  update() {
    this.observableMessage = this.workoutService.updateWorkOut(this.workOut);
    this.observableMessage
    .subscribe(
        message => {
          this.response=message;
          if(this.response.message=="Success")
          this.rte.navigate(["/view-all"])
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

}
