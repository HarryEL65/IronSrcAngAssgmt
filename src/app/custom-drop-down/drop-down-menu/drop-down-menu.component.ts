import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit {

  @Input() options!:any;
  @ContentChild('optTmp', {static: false}) optTmpRef!: TemplateRef<any>


  constructor() { }

  ngOnInit(): void {
  }

}
