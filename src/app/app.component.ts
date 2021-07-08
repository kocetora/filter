import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const group: { [key: string]: FormControl } = {};
    this.filters.forEach((input) => {
      group[input.title] = new FormControl('');
    });
    this.filter = new FormGroup(group);
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
}
