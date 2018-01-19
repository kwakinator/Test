import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { OptionComponent } from './poll-list/option/option.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: SearchComponent
    },
    {
        path: 'create',
        pathMatch: 'full',
        component: PollCreateComponent
    },
    {
        path: 'polls',
        component: PollListComponent,
        children: [
          {
            path: ':id',
            component: OptionComponent
          }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
