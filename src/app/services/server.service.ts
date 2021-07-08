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
      .subscribe(params => {
				this.paramsSubscription = this.route.queryParams
      .subscribe(params => {
        let cards = [ ...this.cardList ];
        if (params.sex === 'male' || params.sex === 'female'){
          cards = cards.filter(card => card.sex === params.sex)
        }
        if(params.name){
          cards = cards.filter(card => 
            card.name
              .toLowerCase()
              .includes(params.name.toLowerCase()))
        		}
        	this.cards.next(cards);
      	});
		});
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