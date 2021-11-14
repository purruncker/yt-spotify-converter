import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flow } from 'src/app/model/flow.model';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent implements OnInit {

  public $flow: Observable<Flow>;

  constructor(private flowService: FlowService) { }

  ngOnInit(): void {
    this.$flow = this.flowService.$selectedFlow;
  }

}
