import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Card } from "../interfaces/card";
import { Filter } from '../interfaces/filter';

@Injectable()
export class ServerService implements OnDestroy{
  paramsSubscription: Subscription;
	cards: BehaviorSubject<Card[]>;

	cardList: Card[] = [
    {
      name: "Adriana",
      sex: "female",
    },
    {
      name: "Borys",
      sex: "male",
    },
    {
      name: "Adriana Sea",
      sex: "female",
    },
    {
      name: "David",
      sex: "male",
    },
    {
      name: "Eren",
      sex: "female",
    },
    {
      name: "Felix",
      sex: "male",
    },
    {
      name: "Helen",
      sex: "female",
    },
    {
      name: "Ioan",
      sex: "male",
    },
    {
      name: "Jane",
      sex: "female",
    },
    {
      name: "Yan",
      sex: "male",
    },
  ]

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
		this.cards = new BehaviorSubject<Card[]>(this.cardList);
    this.paramsSubscription = this.route.queryParams
      .subscribe(params => console.log(params));
  }

	getFilters(): Filter[]{
    return this.filters;
  }

  getCards(): Observable<Card[]> {
    return this.cards.asObservable();
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }
}