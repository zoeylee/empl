import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';

import { PagesComponent } from './pages.component';
import { ListsComponent as EmployeeListComponent } from './employees/lists/lists.component';
import { DetailComponent } from './employees/detail/detail.component';
import { InfoComponent } from './employees/detail/info/info.component';
import { ContractComponent } from './employees/detail/contract/contract.component';
import * as Shared from './shared';

const approutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'employee-list', component: EmployeeListComponent },
            { path: 'employee-detail/:id', component: DetailComponent },
        ]
    }
];

@NgModule({
    declarations: [
        PagesComponent,
        EmployeeListComponent,
        DetailComponent,
        InfoComponent,
        ContractComponent,
        Shared.PagerComponent,
        Shared.SearchComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TabsModule.forRoot(),
        ReactiveFormsModule,
        RouterModule.forChild(approutes),
    ],
    entryComponents: [

    ],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
