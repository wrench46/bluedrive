import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const token = 'Token d8efa5fb05336cda75b731ec67e375d28d092ceb';

const httpOptions2 = {
  headers: new HttpHeaders({
    'AUTHORIZATION': token
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(public http:HttpClient) { }

  generateNumbers(){

    const urlUsed = `https://devtest.bluedrive.io/api/v1/devtest/randominteger/generate/`;
   
    return this.http.get<any>(urlUsed,httpOptions2);
  }

  getGenaratedNumbers(limit,offset){

    const urlUsed = `https://devtest.bluedrive.io/api/v1/devtest/randominteger/?limit=`+limit+'&offset='+offset;
   
    return this.http.get<any>(urlUsed,httpOptions2);
  }

  getOrderedNumbers(){

    const urlUsed = `https://devtest.bluedrive.io/api/v1/devtest/randominteger/`;
   
    return this.http.get<any>(urlUsed,httpOptions2);
  }
  getOrderedNumberslimit(limit){

    const urlUsed = `https://devtest.bluedrive.io/api/v1/devtest/randominteger/?limit=`+limit;
   
    return this.http.get<any>(urlUsed,httpOptions2);
  }

  private datasource = new BehaviorSubject([]);
  getDataSource= this.datasource.asObservable();

  setDataSource(datasource:any) {
    this.datasource.next(datasource)
   
  }
}
