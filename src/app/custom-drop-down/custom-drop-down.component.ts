import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, forwardRef, Input, OnChanges, OnInit, Optional, Provider, Self, SimpleChanges, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Country } from '../country.model';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Validates if the value passed has a code in order to be declared as an
 * object provided by material autocomplete options
 */
 function isAutocompleteOption(value: Country): boolean {
  if (!value || typeof value === 'string') return false;
  return true;
}

/**
 * Validates the control value to have a `code` attribute. It is expected
 * control value to be an object.
 */
 function containsCodeValidation(control: AbstractControl): any {
  return isAutocompleteOption(control.value) ? null : { required: true };
}

// const CUSTOM_DROP_DOWN_VALUE_ACCESSOR: Provider = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => CustomDropDownComponent),
//   multi: true
// }
@Component({
  selector: 'ngiron-custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrls: ['./custom-drop-down.component.scss'],
  // providers: [CUSTOM_DROP_DOWN_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDropDownComponent implements OnInit, OnChanges, ControlValueAccessor {
  value!: string;
  searchText = ''
  filteredOptions: any;;

  onTouched = () => {
    console.log('touched')
  };
  touched = false;
  isDisabled = false;
  @Input() placeholder = 'Please type country name';
  @Input() options!:Country[];
  @Input() 
  set lnToTriggerSrch(value: number) {
    this._lnToTriggerSrch = coerceNumberProperty(value, 0);
  }
  @ContentChild('optTmp', {static: false}) optTmpRef!: TemplateRef<any>

  inputControl = new FormControl('', this.validators);
  noResults = false;
  isSearching = false;
  private _lnToTriggerSrch = 3;
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Optional() @Self() private controlDir: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.matIconRegistry.addSvgIcon(
      "up",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/svg/up-arrow.svg")
    );

    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.controlDir) {
      // Set validators for the outer ngControl equals to the inner
      const control = this.controlDir.control;
      const validators: any = control?.validator
        ? [control.validator, this.inputControl.validator]
        : this.inputControl.validator;
      control?.setValidators(validators);
      // Update outer ngControl status
      control?.updateValueAndValidity({ emitEvent: false });
    }
  }
 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      if (this.isSearching) {
        this.isSearching = false;

        if (!changes['options'].firstChange && !changes['options'].currentValue.length) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      }
    }
  }

  // onSelect(option: any) {
  //   this.value = option.name;
  //   this.onChanged(option.name)
  // }

  /**
   * Allows Angular to update the inputControl.
   * Update the model and changes needed for the view here.
   */
  writeValue(obj: any): void {
    obj && this.inputControl.setValue(obj);
  }

   /**
   * Allows Angular to register a function to call when the inputControl changes.
   */
  registerOnChange(fn: any): void {
    // Pass the value to the outer ngControl if it has an code otherwise pass null
    this.inputControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe({
      next: value => {
        if (typeof value === 'string') {
          if (this.isMinLength(value)) {
            this.isSearching = true;
            /**
             * Fire change detection to display the searching status option
             */
            this.changeDetectorRef.detectChanges();
            fn(value.toUpperCase());
          } else {
            this.isSearching = false;
            this.noResults = false;

            fn(null);
          }
        } else {
          fn(value);
        }
      },
    });
  }

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
   registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Allows Angular to disable the input.
   */
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

// searchKey = () => {
//     this.filteredOptions = this.options;
//  }

//  onFilter = (data: any) => {
//    this.onChanged(data)
//    this.value = data;
//    this.searchKey();
//  }

  /**
   * Method linked to the mat-autocomplete `[displayWith]` input.
   * This is how result name is printed in the input box.
   */
  displayFn(result: Country): string  {
    return result?.name;
  }
 private get validators(): ValidatorFn[] {
  return [Validators.required, containsCodeValidation];
}
isMinLength(value: string) {
  return value.length >= this._lnToTriggerSrch;
}
  

}
