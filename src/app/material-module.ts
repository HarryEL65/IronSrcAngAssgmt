import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatIconModule
    ],
    exports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatIconModule
    ]
})
export class MaterialModule {}
