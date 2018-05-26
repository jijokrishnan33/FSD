import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CategoryService } from './category.service';
import { HttpModule } from '@angular/http';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { Category } from '../category/category';
import { ServiceResponse } from './service.response';

describe('CategoryService', () => {
  let subject: CategoryService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService,
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
  beforeEach(inject([CategoryService, MockBackend], (service, mockBackend) => {
    subject = service;
    backend = mockBackend;
  }));

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));


  it('should get Category List from get all category service', (done) => {
    let category: Category[] = [{
      id: 12,
      name: "Yoga",
    }];
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/category/getall');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: category,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getAllCategories().subscribe(response => {
      this.list = response;
      expect(response).toEqual(category);
      done();
    });
  });

  it('should Check input argument and response of Update category service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let category: Category = {
      id: 12,
      name: "Yoga",
    };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/category/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        id: 12,
        name: "Yoga"
    }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.update(category).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  it('should Check input argument and response of Save category service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let category: Category = {
      id: 12,
      name: "Yoga",
    };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/category/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        id: 12,
        name: "Yoga"
    }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.save(category).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  it('should Check input argument and response of Delete category service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let category: Category = {
      id: 12,
      name: "Yoga",
    };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/workouttrackerservice/category/delete');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        id: 12,
        name: "Yoga"
    }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.delete(category).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });
});
