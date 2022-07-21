import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-option',
  templateUrl: './custom-option.component.html',
  styleUrls: ['./custom-option.component.scss']
})
export class CustomOptionComponent implements OnInit {

  @Input() country!: any;
  @Input() isSelected!: boolean;
  @Output() selected = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  selectOption = (option: any) => {
    console.log(`selected option is: ${option.name}` )
    this.selected.emit(option);
  }

}
