import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter } from './interfaces/filter';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ServerService]
})
export class AppComponent {
  filter: FormGroup;
  filters: Filter[];

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
