import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '~services';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input()
  id: number;

  profile: any = {};
  constructor(private emplservice: EmployeeService) { }

  ngOnInit() {
    this.emplservice.getInfo(this.id).subscribe((res) => {
      this.profile = res;
    });
  }

 
}
