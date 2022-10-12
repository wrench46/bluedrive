import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

import { AnalyticsComponent } from './analytics/analytics.component';
import { TablePagingComponent } from './table-paging/table-paging.component';
// import { TablesService } from '../tables/tables.service';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    TablePagingComponent
  ],
  providers: [
    // TablesService
  ]
})
export class DashboardModule { }
