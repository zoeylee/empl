import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '~services';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @Input()
  id: number;

  contract: any = {};

  constructor(private emplservice: EmployeeService) { }

  ngOnInit() {
    this.emplservice.getContract(this.id).subscribe((res) => {
      this.contract = res;
  });
  }

}
