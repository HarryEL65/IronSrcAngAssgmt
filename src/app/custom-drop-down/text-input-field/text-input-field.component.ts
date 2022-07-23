import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Provider, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';

const validate = (control: AbstractControl): (ValidationErrors | null) => {
  return Validators.required(control);
}

// const CUSTOM_INPUT_VALUE_ACCESSOR: Provider = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => textInputFieldComponent),
//   multi: true
// }
@Component({
  selector: 'text-input-field',
  templateUrl: './text-input-field.component.html',
  styleUrls: ['./text-input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class textInputFieldComponent implements ControlValueAccessor, OnInit {

  @Input() placeholder: string = '';
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  disabled!: boolean;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    let validators = control?.validator
      ? [control.validator, Validators.required]
      : Validators.required;
    control?.setValidators(validators);
  }

  writeValue(value: any): void {
    value && this.controlDir.control?.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

}
