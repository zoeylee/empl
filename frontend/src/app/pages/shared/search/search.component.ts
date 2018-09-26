import { Component, OnInit, Input, Output, DoCheck, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Pager } from '~models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchText: string;
  @Output() searchTrigger = new EventEmitter<any>();

  public pager: Pager = {
    pageNo: 1,
    pageSize: 30,
    totalCount: 0,
    totalPages: 0,
    pageItems: []
  };

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    let pageNo = this.pager.pageNo;
    let searchText = this.searchText;
    this.searchTrigger.emit({ pageNo, searchText });
  }
}