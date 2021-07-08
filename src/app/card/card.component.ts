import { Component, Input } from '@angular/core';
import { Card } from '../interfaces/card';

@Component({
  selector: 'app-card',
  template: `<div>
               <strong>Name: </strong>{{card.name}}
               <strong>Sex: </strong>{{card.sex}}
             </div>`,
})
export class CardComponent {
  @Input() card!: Card;
}
