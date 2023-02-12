import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { detailComponent } from './detail/detail.component';

import { SearchbarComponent } from './searchbar/searchbar.component';

const routes: Routes = [
  {path: '', component: SearchbarComponent},
  {path: 'detail/:id', component: detailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
