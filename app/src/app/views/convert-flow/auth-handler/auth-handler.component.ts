import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-auth-handler',
  templateUrl: './auth-handler.component.html',
  styleUrls: ['./auth-handler.component.scss']
})
export class AuthHandlerComponent implements OnInit, OnDestroy {

  public platformName: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthenticationService,
    private flowService: FlowService
  ) { }
  

  private activeSubscriber: Subscription[] = [];

  public ngOnInit(): void {

    // MergeMap connects two observables. If auth is not ready yet, it returns a nullish param object
    // This null value is detected and the process is held on hold till it turns into a proper paramMap object
    this.authService.$ready.pipe(mergeMap((ready) => ready ? this.route.paramMap : of(null))).subscribe((params) => {
      if(params) {
        if(this.authService.hasValidSession()) {
          // TODO: Show info to user or skip step (Message can be shown on the very start of the flow)
          console.log("no need to authenticate, session exists")
          return;
        }

        const platform = params.get("platform");
        if(platform == "spotify") {
          const grantCode = this.route.snapshot.queryParamMap.get("code")
          this.platformName = platform;
  
          if(grantCode) {
            this.authService.requestSpotifyAccessToken(grantCode).then((token) => {
                console.log(token)
                this.authService.createSpotifyOrientedSession(token).then((session) => {
                  console.log(session)
                  this.flowService.nextStep();
                })
            }).catch(() => {})          
          } else {
            this.authService.requestSpotifyGrantCode()
          }
        } else {
          // TODO: Show error --> platform name not found, therefor not supported
        }
      }
    })
  }

  public ngOnDestroy(): void {
    this.activeSubscriber.forEach((sub) => sub.unsubscribe())
  }

  

}
