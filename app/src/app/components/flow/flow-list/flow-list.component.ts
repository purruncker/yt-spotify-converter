import { Component, Input, OnInit } from '@angular/core';
import { FlowStep } from 'src/app/model/flow-step.model';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent implements OnInit {

  @Input() public flowList: FlowStep[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
