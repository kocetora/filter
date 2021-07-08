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
  filter: FormGroup;
  filters: Filter[];
  cards!: Card[];
  cardsSubscription!: Subscription;

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
