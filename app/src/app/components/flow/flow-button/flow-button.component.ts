import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowButtonOptions, FlowStep } from 'src/app/model/flow-step.model';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-flow-button',
  templateUrl: './flow-button.component.html',
  styleUrls: ['./flow-button.component.scss']
})
export class FlowButtonComponent implements OnInit {

  @Input() public options?: FlowButtonOptions;

  constructor(
    private flowService: FlowService
  ) { }

  ngOnInit(): void {
  }

  public next() {
    this.flowService.nextStep();
  }

  public back() {
    this.flowService.backStep();
  }

}
