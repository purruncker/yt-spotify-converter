import { Component, Input, OnInit } from '@angular/core';
import { FlowStep } from 'src/app/model/flow-step.model';

@Component({
  selector: 'app-flow-item',
  templateUrl: './flow-item.component.html',
  styleUrls: ['./flow-item.component.scss']
})
export class FlowItemComponent implements OnInit {

  @Input() public flowStep: FlowStep;

  constructor() { }

  ngOnInit(): void {}

}
