import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomOptionComponent } from './components/custom-option/custom-option.component';
import { IconComponent } from './components/icon/icon.component';
import { CustomDropDownModule } from './custom-drop-down/custom-drop-down.module';

@NgModule({
  declarations: [
    AppComponent,
    CustomOptionComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CustomDropDownModule,
    // NgModule
  ],
  exports: [
    IconComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
