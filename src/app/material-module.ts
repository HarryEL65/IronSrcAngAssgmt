import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

    exports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatIconModule,
        MatCardModule
    ]
})
export class MaterialModule {}
