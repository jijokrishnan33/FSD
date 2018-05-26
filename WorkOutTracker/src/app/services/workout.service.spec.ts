import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WorkoutService } from './workout.service';
import { HttpModule } from '@angular/http';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { Category } from '../category/category';
import { ServiceResponse } from './service.response';
import { Workout } from '../workout/workout';
import { ActiveWorkout } from '../active-workout/active-workout'

describe('WorkoutService', () => {
  let subject: WorkoutService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });
  beforeEach(inject([WorkoutService, MockBackend], (service, mockBackend) => {
    subject = service;
    backend = mockBackend;
  }));

  it('should be created', inject([WorkoutService], (service: WorkoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Category List from get all Workout service', (done) => {
    let workOuts: Workout[] = [{ "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }, { "id": 240, "title": "Running", "notes": "Running note", "calBurntPerMin": 1.0, "category": { "id": 235, "name": "Jogging" } }];

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/workout/getall');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: workOuts,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getAllWorkouts().subscribe(response => {
      this.list = response;
      expect(response).toEqual(workOuts);
      done();
    });
  });

  it('should get Workout for the given Id', (done) => {
    let workOuts: Workout = { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/workout/getworkout/239');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: workOuts,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getWorkoutById(239).subscribe(response => {
      this.list = response;
      expect(response).toEqual(workOuts);
      done();
    });
  });

  it('should get All Active Workouts', (done) => {
    let activeWorkOuts: ActiveWorkout[] = [{ "activeWorkoutId": 241, "workOut": { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }, "comment": null, "startDate": new Date("2018-05-16"), "startTime": "18:33:55", "endDate": new Date("2018-05-16"), "endTime": "18:36:55" }, { "activeWorkoutId": 242, "workOut": { "id": 240, "title": "Running", "notes": "Running note", "calBurntPerMin": 1.0, "category": { "id": 235, "name": "Jogging" } }, "comment": null, "startDate": new Date("2018-05-16"), "startTime": "18:34:12", "endDate": new Date("2018-05-16"), "endTime": "18:36:12" }];

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/activeworkout/getall');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: activeWorkOuts,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getAllActiveWorkouts().subscribe(response => {
      this.list = response;
      expect(response).toEqual(activeWorkOuts);
      done();
    });
  });

  it('should Check input argument and response of Update Workout service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let workOuts: Workout = { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/workout/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" }
      }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.updateWorkOut(workOuts).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  it('should Check input argument and response of Save Workout service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let workOuts: Workout = { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/workout/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" }
      }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.save(workOuts).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  it('should Check input argument and response of Delete Workout service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let workOuts: Workout = { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/workout/delete');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" }
      }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.deleteWorkout(workOuts).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  it('should Check input argument and response of Save Active Workout service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let activeWorkout: ActiveWorkout = { "activeWorkoutId": 241, "workOut": { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }, "comment": null, "startDate": new Date("2018-05-16"), "startTime": "18:33:55", "endDate": new Date("2018-05-16"), "endTime": "18:36:55" };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/activeworkout/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        "activeWorkoutId": 241, "workOut": { "id": 239, "title": "Naukasana", "notes": "Naukasana Note", "calBurntPerMin": 0.3, "category": { "id": 238, "name": "Yoga" } }, "comment": null, "startDate": new Date("2018-05-16"), "startTime": "18:33:55", "endDate": new Date("2018-05-16"), "endTime": "18:36:55" 
      }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.saveActiveWorkout(activeWorkout).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });
});
