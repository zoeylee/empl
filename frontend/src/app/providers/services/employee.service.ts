import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Employee, Pager } from '../models';

let counter = 0;

@Injectable()
export class EmployeeService {

  private events:Event[];

  constructor(
    private apiService: ApiService
  ) { }

  getAll(pageNo: number = 1, searchText: string = ""):  Observable<any> {
    let path = (searchText!="") ? `/employee/?page=${pageNo}&q=${searchText}` : `/employee/?page=${pageNo}`;
    return this.apiService.get(path).pipe(map(res => res));
  }

  getInfo(id: number):  Observable<any> {
    return this.apiService.get(`/employee/info/${id}`).pipe(map(res => res));
  }

  getContract(id: number):  Observable<any> {
    return this.apiService.get(`/employee/contract/${id}`).pipe(map(res => res));
  }
}
