import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  exports: [FilterComponent]
})
export class FilterModule { }
