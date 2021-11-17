import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlowStep } from 'src/app/model/flow-step.model';
import { Flow } from 'src/app/model/flow.model';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent implements OnInit, OnDestroy {

  private _flowSub?: Subscription;
  public list: FlowStep[];

  constructor(private flowService: FlowService) { }

  public ngOnInit(): void {
    this._flowSub = this.flowService.$selectedFlow.subscribe((flow) => {
      this.list = flow.list.findDisplayableSteps();
    });
  }

  public ngOnDestroy(): void {
    this._flowSub?.unsubscribe();
  }

}
