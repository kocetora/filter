import { Component, OnInit, OnDestroy, ɵdetectChanges as detectChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from './services/server.service';
import { Filter } from './filter/interfaces/filter';
import { FilterValue } from './filter/interfaces/filterValue';
import { Card } from './interfaces/card';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ServerService]
})
export class AppComponent implements OnInit, OnDestroy{
  readonly filters: Filter[];
  private cardsSubscription!: Subscription;
  cards: Card[] = [];

  constructor(
    private router: Router,
    private serverService: ServerService
  ) {
    this.filters = this.serverService.getFilters();
  }

  ngOnInit(){
    this.serverService.getCards().subscribe(cards => {
      this.cards = cards;
      detectChanges(this)
    });
  }

  search(filterValue: FilterValue){
    this.router.navigate([], { queryParams: filterValue });
  }

  ngOnDestroy(){
    this.cardsSubscription.unsubscribe();
  }
}