import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-auth-handler',
  templateUrl: './auth-handler.component.html',
  styleUrls: ['./auth-handler.component.scss']
})
export class AuthHandlerComponent implements OnInit, OnDestroy {

  public platformName: string;
  public isCheckingSession: boolean = true;
  public ngLottieAnimOptions: AnimationOptions = {
    loop: true,
    autoplay: true,
    path: "/assets/animated/loader.json"
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthenticationService,
    private flowService: FlowService
  ) { }
  

  private activeSubscriber: Subscription[] = [];

  public ngOnInit(): void {
    // Notify component that session is being checked on
    this.isCheckingSession = true;

    // zip() Operator causes to emit value if every observable has released some data. So this chains them all together.
    // Authservice ready is filtered, so that only true values come through, so that this observable only emits if auth service is actually ready, causing
    // the whole observable (zip) to hold until this one is ready.
    // The map at the end maps all the values from zip() into an object
    zip(this.authService.$ready.pipe(filter((ready) => ready)), this.route.paramMap, this.flowService.$selectedFlow.pipe(filter((flow) => !!flow))).pipe(map(([ready, params, flow]) => ({ ready, params, flow }))).subscribe((result) => {
      if(!result.ready) return;
      if(!result.flow.hasStarted) this.flowService.abort();
      this.isCheckingSession = false;

      if(this.authService.hasValidSession()) {
        // TODO: Show info to user or skip step (Message can be shown on the very start of the flow)
        console.log("no need to authenticate, session exists")
        setTimeout(() => this.flowService.nextStep(), 500)
        return;
      }

      const platform = result.params.get("platform");
      if(platform == "spotify") {
        const grantCode = this.route.snapshot.queryParamMap.get("code")
        this.platformName = platform;

        if(grantCode) {
          this.authService.requestSpotifyAccessToken(grantCode).then((token) => {
              console.log(token)
              this.authService.createSpotifyOrientedSession(token).then((session) => {
                console.log(session)
                setTimeout(() => this.flowService.nextStep(), 500)
              })
          }).catch(() => {})          
        } else {
          this.authService.requestSpotifyGrantCode()
        }
      } else {
        // TODO: Show error --> platform name not found, therefor not supported
      }
    })
  }

  public ngOnDestroy(): void {
    this.activeSubscriber.forEach((sub) => sub.unsubscribe())
  }

  

}
