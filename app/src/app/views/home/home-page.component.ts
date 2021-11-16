import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public flowService: FlowService, 
    public authService: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.flowService.selectDefaultFlow();
  }

  public startFlow(): void {
    this.flowService.startFlow();
    this.authService.requestSpotifyGrantCode();
  }

  public nextStepInFlow() {
    // TODO: this.flowService.nextStep()
  }

  public backStepInFlow() {
    // TODO: this.flowService.nextStep()
  }

}
