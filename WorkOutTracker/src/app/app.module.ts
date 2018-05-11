import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { HttpModule } from '@angular/http';
import { FusionChartsModule } from 'angular4-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';


import { AppComponent } from './app.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { WorkoutService } from './services/workout.service';
import { CategoryService } from './services/category.service';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CategoryComponent } from './category/category.component';
import { FilterPipe } from './pipe/filter.pipe';
import { ChartComponent } from './chart/chart.component';
import { ActiveWorkoutComponent } from './active-workout/active-workout.component';
import { WorkoutfilterPipe } from './pipe/workoutfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ViewAllComponent,
    HomeComponent,
    EditWorkoutComponent,
    CreateWorkoutComponent,
    CategoryComponent,
    FilterPipe,
    ChartComponent,
    ActiveWorkoutComponent,
    WorkoutfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme),
    HttpModule
  ],
  providers: [
    WorkoutService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
