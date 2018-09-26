export class Pager {
  pageItems: Array<number>;
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  constructor() {
    this.pageNo = 1;
    this.pageSize = 30;
    this.pageItems = [];
    this.totalCount = 0;
    this.totalPages = 0;
  }
}