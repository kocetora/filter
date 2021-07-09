import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter } from './interfaces/filter';
import { FilterValue } from './interfaces/filterValue';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit{
  filter!: FormGroup;
  default: FilterValue = {};
  @Input() filters: Filter[] = [];
  @Output() onsubmit: EventEmitter<FilterValue> = new EventEmitter<FilterValue>();

  ngOnInit() {
    const group: { [key: string]: FormControl } = {};
    this.filters.forEach((input) => {
      group[input.title] = new FormControl(input.default);
      this.default[input.title] = input.default;
    });
    this.filter = new FormGroup(group);
  }

  onSubmit() {
    for (var key in this.filter.value) {
      if (this.filter.value[key] === this.default[key]) {
        delete this.filter.value[key];
      }
    }
    this.onsubmit.emit(this.filter.value);
  }

  reset() {
    this.filter.reset(this.default);
  }
}
