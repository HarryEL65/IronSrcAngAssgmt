import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CustomDropDownModule } from './custom-drop-down/custom-drop-down.module';

import { AppComponent } from './app.component';
import { CustomOptionComponent } from './components/custom-option/custom-option.component';
import { IconComponent } from './components/icon/icon.component';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    CustomOptionComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomDropDownModule,
    MaterialModule
  ],
  exports: [
    IconComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
