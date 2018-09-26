import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '~services';
import { Employee, Pager } from '~models';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public items: Employee[];
  public searchText: string;
  public pager: Pager = new Pager();


  constructor(private emplservice: EmployeeService, private router: Router ) { }

  ngOnInit() {
    let searchText = this.searchText;
    let pageNo = this.pager.pageNo;
    let object: any = { pageNo, searchText };
    this.refreshData(object);
  }

  onClick(id: number) {
    this.router.navigate(['/pages/employee-detail', id]);
  }

  refreshData(object: any = {}) {
    // let pageNo = (object.pageNo==null) ? 1 : object.pageNo ;
    this.emplservice.getAll(object.pageNo, object.searchText)
      .subscribe((res) => {
        this.items = res.results;
        this.pager.pageNo = object.pageNo;
        this.pager.totalCount = res.count;
    });
  }
}
