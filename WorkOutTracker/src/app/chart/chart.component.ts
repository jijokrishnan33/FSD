import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { WorkoutService } from '../services/workout.service';
import { ActiveWorkout } from '../active-workout/active-workout';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    id = 'chart1';
    width = 600;
    height = 300;
    type = 'column2d';
    dataFormat = 'json';
    activeworkouts: ActiveWorkout[];
    pipe = new DatePipe('en-US');

    dayGraphDataSource = {
        "chart": {
            "caption": "Day Graph",
            "theme": "fint"
        },
        "data": [
            {
                "index": 1,
                "label": "Mon",
                "value": "0"
            },
            {
                "index": 2,
                "label": "Tue",
                "value": "0"
            },
            {
                "index": 3,
                "label": "Wed",
                "value": "0"
            },
            {
                "index": 4,
                "label": "Thu",
                "value": "0"
            },
            {
                "index": 5,
                "label": "Fri",
                "value": "0"
            },
            {
                "index": 6,
                "label": "Sat",
                "value": "0"
            },
            {
                "index": 0,
                "label": "Sun",
                "value": "0"
            }

        ]
    }

    weekGraphDataSource = {
        "chart": {
            "caption": "Week Graph",
            "theme": "fint"
        },
        "data": [
            {
                "index": 1,
                "label": "Week 1",
                "value": "0"
            },
            {
                "index": 2,
                "label": "Week 2",
                "value": "0"
            },
            {
                "index": 3,
                "label": "Week 3",
                "value": "0"
            },
            {
                "index": 4,
                "label": "Week 4",
                "value": "0"
            },
            {
                "index": 5,
                "label": "Week 4",
                "value": "0"
            }
        ]
    }

    yearGraphDataSource = {
        "chart": {
            "caption": "Year Graph",
            "theme": "fint"
        },
        "data": [
            {
                "index": 0,
                "label": "1",
                "value": "0"
            },
            {
                "index": 1,
                "label": "2",
                "value": "0"
            },
            {
                "index": 2,
                "label": "3",
                "value": "0"
            },
            {
                "index": 3,
                "label": "4",
                "value": "0"
            },
            {
                "index": 4,
                "label": "5",
                "value": "0"
            },
            {
                "index": 5,
                "label": "6",
                "value": "0"
            },
            {
                "index": 6,
                "label": "7",
                "value": "0"
            },
            {
                "index": 7,
                "label": "8",
                "value": "0"
            },
            {
                "index": 8,
                "label": "9",
                "value": "0"
            },
            {
                "index": 9,
                "label": "10",
                "value": "0"
            },
            {
                "index": 10,
                "label": "11",
                "value": "0"
            },
            {
                "index": 11,
                "label": "12",
                "value": "0"
            }
        ]
    }
    constructor(private workoutService: WorkoutService) { }


    totalWorkoutToday: number = 0;
    totalWorkoutThisWeek: number = 0;
    totalWorkoutThisMonth: number = 0;

    totalCalBurnWeekly: number = 0;
    totalCalBurnMonthly: number = 0;
    totalCalBurnYearly: number = 0;

    ngOnInit() {
        this.getAllActiveWorkout();
    }

    getAllActiveWorkout() {
        this.workoutService.getAllActiveWorkouts().subscribe(
            data => {
                this.activeworkouts = data;
            },
            error => {

            },
            () => {
                this.getCurrentDayWorkoutTime();
                this.getWeeklyWorkoutTime();
                this.getMonthlyWorkoutTime();
                this.getYearlyWorkoutTime();
            }
        );
    }

    getCurrentDayWorkoutTime() {
        this.activeworkouts.forEach(element => {
            if (this.transformDate(element.startDate) === this.transformDate(Date.now())) {
                var workoutinMin = this.getMinsOfSingleWorkout(element);
                this.totalWorkoutToday = this.totalWorkoutToday + workoutinMin;
            }

        });


    }
    getWeeklyWorkoutTime() {
        this.activeworkouts.forEach(element => {
            if (this.transformDate(element.startDate) >= this.transformDate(this.getMonday(Date.now()))
                && this.transformDate(element.endDate) <= this.transformDate(this.getSunday(Date.now()))) {
                var workoutinMin = this.getMinsOfSingleWorkout(element);
                this.totalWorkoutThisWeek = this.totalWorkoutThisWeek + workoutinMin;
                var dt = new Date(element.startDate);
                var day = dt.getDay();
                this.totalCalBurnWeekly=(+this.totalCalBurnWeekly + workoutinMin * element.workOut.calBurntPerMin);
                this.totalCalBurnWeekly=+this.totalCalBurnWeekly.toFixed(2);
                this.dayGraphDataSource.data.forEach(graphElement => {
                    if (graphElement.index === day) {
                        graphElement.value = (+graphElement.value + workoutinMin * element.workOut.calBurntPerMin).toString();
                    }
                });
            }

        });

    }
    getMonthlyWorkoutTime() {
        this.activeworkouts.forEach(element => {
            var monthStartDate =new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            var monthEndDate=new Date(new Date().getFullYear(), new Date().getMonth()+1, 0);
            
            if (this.transformDate(element.startDate) >= this.transformDate(monthStartDate)
              && (this.transformDate(element.endDate) <= this.transformDate(monthEndDate))) {
                var workoutinMin = this.getMinsOfSingleWorkout(element);
                this.totalWorkoutThisMonth = this.totalWorkoutThisMonth + workoutinMin;
                this.totalCalBurnMonthly=(+this.totalCalBurnMonthly + workoutinMin * element.workOut.calBurntPerMin);
                this.totalCalBurnMonthly=+(this.totalCalBurnMonthly.toFixed(2));
                let weekNum=this.getWeekNumber(monthStartDate,element.startDate);
                this.weekGraphDataSource.data.forEach(graphElement => {
                    if (graphElement.index === weekNum) {
                        graphElement.value = (+graphElement.value + workoutinMin * element.workOut.calBurntPerMin).toString();
                    }
                });
            }

        });

    }

    getYearlyWorkoutTime() {
        this.activeworkouts.forEach(element => {
            var yearStartDate =new Date(new Date().getFullYear(), 0, 1);
            var yearEndDate=new Date(new Date().getFullYear(), 11, 31);
            if (this.transformDate(element.startDate) >= this.transformDate(yearStartDate)
              && (this.transformDate(element.endDate) <= this.transformDate(yearEndDate))) {
                var workoutinMin = this.getMinsOfSingleWorkout(element);
                let monthNum=this.getMonthNumber(element.startDate);
                this.totalCalBurnYearly=(+this.totalCalBurnYearly + workoutinMin * element.workOut.calBurntPerMin);
                this.totalCalBurnYearly=+(this.totalCalBurnYearly.toFixed(2));
                this.yearGraphDataSource.data.forEach(graphElement => {
                    if (graphElement.index === +monthNum) {
                        graphElement.value = (+graphElement.value + workoutinMin * element.workOut.calBurntPerMin).toString();
                    }
                });
            }

        });

    }



    transformDate(now) {
        const myFormattedDate = this.pipe.transform(now, 'yyyyMMdd');
        return myFormattedDate;
    }


    getMinsOfSingleWorkout(element) {
        var actStartTime = Date.parse(element.startDate + 'T' + element.startTime);
        var actEndTime = Date.parse(element.endDate + 'T' + element.endTime);
        var minsWorkout = +((actEndTime - actStartTime) / (1000 * 60)).toFixed(2);
        return minsWorkout;

    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }
    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day+7;
        return new Date(d.setDate(diff));
    }

    getWeekNumber(startdate,date) {
        startdate = new Date(startdate);
        var day = startdate.getDay();
        date = new Date(date);
        var date = date.getDate();
        return Math.ceil((date+ day-1)/ 7);
    }

    getMonthNumber(date) {
        var dt = new Date(date);
        var month = dt.getMonth();
        return month;
    }

}
