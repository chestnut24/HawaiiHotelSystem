import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { DEFAULT_ROUTES } from './pages/routing-manifests';
import { PageNotFondComponent } from './components/page-not-fond/page-not-fond.component';

const routes: Routes = [
  {
    path:'',
    component:DefaultLayoutComponent,
    children:DEFAULT_ROUTES,

},
{ path: '**', component: PageNotFondComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
