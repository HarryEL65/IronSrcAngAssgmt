import { ChangeDetectionStrategy, Component, ContentChild, forwardRef, Input, OnChanges, OnInit, Provider, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '../country.model';
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

const CUSTOM_DROP_DOWN_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomDropDownComponent),
  multi: true
}
@Component({
  selector: 'ngiron-custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrls: ['./custom-drop-down.component.scss'],
  providers: [CUSTOM_DROP_DOWN_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDropDownComponent implements ControlValueAccessor, OnInit, OnChanges {
  value!: string;
  searchText = ''
  filteredOptions: any[]=[];
  onChanged =  ($event: Event) => {};


  onTouched = () => {
    console.log('touched')
  };
  touched = false;
  isDisabled = false;
  @Input() options!:Country[];
  @ContentChild('optTmp', {static: false}) optTmpRef!: TemplateRef<any>
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  onSelect(option: any) {
    this.value = option.name;
    this.onChanged(option.name)
  }

  writeValue(country: any): void {
    this.value = country;
    this.searchKey();
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn; 
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn; 
  }
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
  searchKey = () => {
    this.filteredOptions = this.value === '' ? this.options : this.options.filter((option: any ) => {
     return option.name.toLowerCase().includes(this.value.toLowerCase());
   })
 }

 onFilter = (data: any) => {
   this.onChanged(data)
   this.value = data;
   this.searchKey();
 }
  

}
