import { Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngiron-custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrls: ['./custom-drop-down.component.scss']
})
export class CustomDropDownComponent implements OnInit, OnChanges {
  customDropDownForm!: FormGroup;
  @Input() options:any;
  @ContentChild('optTmp', {static: false}) optTmpRef!: TemplateRef<any>
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.customDropDownForm = this.fb.group({
      searchInput: new FormControl()
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['options'].currentValue)
  }

  onSubmit() {
    console.log(this.customDropDownForm.value);
  }

  

}
