import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService, UserService } from '~services';
import { Employee, Pager } from '~models';
import { environment } from '~environments/environment';
import * as _ from 'lodash';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: number;
  imgUrl: string;
  isAdmin: boolean = false;
  user: any = {};
  constructor(
    private emplservice: EmployeeService,
    private userservice: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.getUser(params['id']);
      this.getCurrentUser();
   });
  }
  
  getUser(id: any) {
    this.emplservice.getInfo(this.id).subscribe((res) => {
      this.imgUrl = `${environment.apiUrl}${res.image}`;
      this.user = res;
    });
  }
  
  getCurrentUser() {
    this.userservice.getCurrentUser().subscribe(res => {
      this.isAdmin = (!_.isNull(res) && !_.isUndefined(res)) ? res.is_superuser : false;
    })
  }

}
