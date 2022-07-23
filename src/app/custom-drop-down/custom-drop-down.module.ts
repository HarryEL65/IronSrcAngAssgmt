import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropDownComponent } from './custom-drop-down.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { textInputFieldComponent } from './text-input-field/text-input-field.component';



@NgModule({
  declarations: [
    CustomDropDownComponent,
    DropDownMenuComponent,
    textInputFieldComponent,
  ],
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CustomDropDownComponent,
    
  ]
})
export class CustomDropDownModule { }
