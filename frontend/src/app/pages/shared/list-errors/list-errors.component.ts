import { Component, Input  } from '@angular/core';
import * as _ from 'lodash';
import { Errors } from '~models';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent {

  formattedErrors: Array<string> = [];
  
    @Input()
    set errors(errorList: Errors) {
      this.formattedErrors = [];
      if (!_.isEmpty(errorList.errors)) {
        // for (const field in errorList.errors) {
        //   this.formattedErrors.push(`${errorList[field]}`);
        // }
        this.formattedErrors.push(errorList.errors.toString());
        console.log("formattedErrors", this.formattedErrors);
      }
    };
  
    get errorList() { return this.formattedErrors; }

}
