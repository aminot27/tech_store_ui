import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-generic-delete',
  templateUrl: './generic-delete.component.html',
  styleUrls: ['./generic-delete.component.scss']
})
export class GenericDeleteComponent {
  @Input() title: string;
  @Input() Id: number;

  @Output() submitEvent = new EventEmitter<number>();

  onConfirm(){
    this.submitEvent.emit(this.Id);
  }

}
