import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { detailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    ResultsViewComponent,
    detailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [
    SearchbarComponent,
    ResultsViewComponent,
    detailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
