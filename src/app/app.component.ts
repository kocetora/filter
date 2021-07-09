import { Component, OnInit, OnDestroy, ɵdetectChanges as detectChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from './services/server.service';
import { Filter } from './interfaces/filter';
import { Card } from './interfaces/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ServerService]
})
export class AppComponent implements OnInit{
  readonly filter: FormGroup;
  readonly filters: Filter[];
  private cardsSubscription!: Subscription;
  cards: Card[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serverService: ServerService
  ) {
    this.filters = this.serverService.getFilters();
    const group: { [key: string]: FormControl } = {};
    this.filters.forEach((input) => {
      group[input.title] = new FormControl('');
    });
    this.filter = new FormGroup(group);
  }

  ngOnInit(){
    this.serverService.getCards().subscribe(cards => {
      this.cards = cards;
      detectChanges(this)
    });
  }

  onSubmit() {
    for (var key in this.filter.value) {
      if (!this.filter.value[key]) {
        delete this.filter.value[key];
      }
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.filter.value,
    });
  }

  reset() {
    this.filter.reset({ name: '', sex: 'both' });
    this.onSubmit();
  }

  ngOnDestroy(){
    this.cardsSubscription.unsubscribe();
  }
}