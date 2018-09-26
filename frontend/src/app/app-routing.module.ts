import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/index';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule', canActivate: [AuthGuard] },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            { enableTracing: true }
        ),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
