import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../services/category.service';
import { Category } from '../category/category';
import { ServiceResponse } from '../services/service.response';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryList: Category[];
  private editedCat: number;
  newcategory: string = '';
  observableCaterories : Observable<Category[]>;
  observableMessage: Observable<ServiceResponse>;

  constructor(private categoryService: CategoryService,
    private route: Router) {
      this.getAllCategories();
  }

  ngOnInit() {
  }
  title = "Add Category";
  searchText='';
  edit(category: Category) {
    if (category.id == this.editedCat) {
      console.log(category.name);
      this.observableMessage=this.categoryService.update(category);
      this.observableMessage.subscribe(
        categories => this.getAllCategories()
      );
      this.editedCat = 0.00;
    } else {
      this.editedCat = category.id;
    }
  }
  delete(category: Category) {
    this.observableMessage=this.categoryService.delete(category);
    this.observableMessage.subscribe(
      categories => this.getAllCategories()
    );
  }

  add() {
    if(this.newcategory != '') {
    this.observableMessage=this.categoryService.save(new Category(0, this.newcategory));
    this.observableMessage.subscribe(
      categories => this.getAllCategories()
    );
    this.newcategory = '';
    }
  }

  getAllCategories(){
    this.observableCaterories=this.categoryService.getAllCategories();
    this.observableCaterories.subscribe(
      categories => this.categoryList=categories
    );
  }

}
