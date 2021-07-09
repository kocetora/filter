import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ServerService } from './services/server.service';
import { FilterModule } from './filter/filter.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FilterModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
