import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter } from './interfaces/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  filter: FormGroup;
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

  constructor(
  ) {
    const group: { [key: string]: FormControl } = {};
    this.filters.forEach((input) => {
      group[input.title] = new FormControl('');
    });
    this.filter = new FormGroup(group);
  }

  onSubmit() {
    console.log(this.filter.value);
  }
}
