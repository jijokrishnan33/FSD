import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewAllComponent } from './view-all/view-all.component';
import { HomeComponent } from './home/home.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CategoryComponent } from './category/category.component';
import { ChartComponent } from './chart/chart.component';
import { ActiveWorkoutComponent} from './active-workout/active-workout.component'

const routes: Routes = [
  { path: 'view-all', component: ViewAllComponent },
  { path: "", component: HomeComponent },
  { path: "edit/:id", component: EditWorkoutComponent },
  { path: "create-workout", component: CreateWorkoutComponent },
  { path: "category", component: CategoryComponent },
  { path : "track", component:ChartComponent},
  { path : "start/:id", component:ActiveWorkoutComponent},
  { path : "end/:id", component:ActiveWorkoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}