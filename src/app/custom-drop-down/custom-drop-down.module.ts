import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropDownComponent } from './custom-drop-down.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    CustomDropDownComponent,
    DropDownMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    CustomDropDownComponent,
  ]
})
export class CustomDropDownModule { }
