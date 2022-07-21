import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropDownComponent } from './custom-drop-down.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomDropDownComponent,
    DropDownMenuComponent,
    SearchInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomDropDownComponent,
    
  ]
})
export class CustomDropDownModule { }
