import { Injectable } from '@angular/core';

import { Category } from '../category/category';
import { Response,Http,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ServiceResponse} from './service.response';

@Injectable()
export class CategoryService {

  categories :Category[]=[];
  constructor(private http :Http) { }

  getAllCategories(): Observable<Category[]>{

    return this.http.get("http://localhost:8085/workouttrackerservice/category/getall").map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  update(category:Category): Observable<ServiceResponse>{
    let headers= new Headers({'Content-Type':'application/json'});
    let options= new RequestOptions({headers:headers});
    return this.http.post("http://localhost:8085/workouttrackerservice/category/save",category,options).map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  save(category:Category): Observable<ServiceResponse>{
    console.log(category);
    let headers= new Headers({'Content-Type':'application/json'});
    let options= new RequestOptions({headers:headers});
    return this.http.post("http://localhost:8085/workouttrackerservice/category/save",category,options).map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  delete(category:Category): Observable<ServiceResponse>{
    let headers= new Headers({'Content-Type':'application/json'});
    let options= new RequestOptions({headers:headers});
    return this.http.post("http://localhost:8085/workouttrackerservice/category/delete",category,options).map(this.extractData)
    .catch(this.handleErrorObservable);
  }


  private extractData(res :Response){
    console.log(res);
    let body = res.json();
    return body || {};
  }
  
  private handleErrorObservable (error: Response | any) {
    console.error("This is error: "+error.message || error);
    return Observable.throw(error.message || error);
  } 
}
