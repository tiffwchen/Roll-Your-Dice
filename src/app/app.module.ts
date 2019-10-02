import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DieComponent } from './die/die.component';

@NgModule({
  declarations: [
    AppComponent,
    DieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DieComponent]
})
export class AppModule { }
