import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ExpenseComponent } from './expense.component';
import { TimesheetComponent } from './timesheet.component';
import { VacationComponent } from './vacation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'MyAdmin'
    },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'timesheet',
        component: TimesheetComponent,
        data: {
          title: 'Timesheet'
        }
      },
      {
        path: 'expense',
        component: ExpenseComponent,
        data: {
          title: 'Expense'
        }
      },
      {
        path: 'vacation',
        component: VacationComponent,
        data: {
          title: 'Vacation'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAdminRoutingModule { }
