import { NuevoParteComponent } from './nuevo-parte/nuevo-parte.component';
import { ParteComponent } from './admin/parte/parte.component';
import { ListComponent } from './admin/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  { path: 'nuevo-parte', component: NuevoParteComponent},
  { path: 'list', component: ListComponent},
  { path: 'parte/:id', component: ParteComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'list'},
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
