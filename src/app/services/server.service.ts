import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { Filter } from '../interfaces/filter';

@Injectable()
export class ServerService implements OnDestroy{
  paramsSubscription: Subscription;
	
	filters: Filter[] = [
    {
      type: 'select',
      title: 'sex',
      options: ['both', 'female', 'male'],
    },
    {
      type: 'text',
      placeholder: 'enter search phrase',
      title: 'name',
    },
  ];

  constructor(private route: ActivatedRoute) { 
    this.paramsSubscription = this.route.queryParams
      .subscribe(params => console.log(params));
  }

	getFilters(): Filter[]{
    return this.filters;
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }
}