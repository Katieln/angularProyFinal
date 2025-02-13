import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//ruta base: /dasboard


const routes: Routes = [
  {path:'home', 
    loadChildren: () =>
      import('./pages/home/home.module').then(
        (m) => m.HomeModule)
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
