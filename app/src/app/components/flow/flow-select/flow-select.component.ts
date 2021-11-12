import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flow-select',
  templateUrl: './flow-select.component.html',
  styleUrls: ['./flow-select.component.scss']
})
export class FlowSelectComponent implements OnInit {

  @Input() public enableSwitcher: boolean = false;
  @Output() public switch: EventEmitter<unknown> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  // TODO: Switch flows
  public switchFlow(event: MouseEvent): void {
    this.switch.emit(event)
  }

}
