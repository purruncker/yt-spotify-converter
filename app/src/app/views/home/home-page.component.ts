import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FlowButtonOptions, FlowStep, FlowStepButtons } from 'src/app/model/flow-step.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  private _currentStepSub?: Subscription;

  public currentStepButtons: FlowButtonOptions[];
  public currentStep: FlowStep

  constructor(
    public flowService: FlowService, 
    public authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._currentStepSub = this.flowService.$currentStep.subscribe((flowStep) => {
      this.currentStep = flowStep;
      this.currentStepButtons = Object.values((button) => {
        console.log(button)
      })
    })

    // this.flowService.selectDefaultFlow();
  }

  public ngOnDestroy(): void {
    this._currentStepSub?.unsubscribe();
  }

  public startFlow(): void {
    this.flowService.startFlow();
    this.authService.requestSpotifyGrantCode();
  }

  public nextStepInFlow() {
    this.flowService.nextStep()
  }

  public backStepInFlow() {
    // TODO: this.flowService.nextStep()
  }

}
