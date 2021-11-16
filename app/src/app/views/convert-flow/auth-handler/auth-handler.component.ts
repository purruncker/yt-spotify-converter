import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-auth-handler',
  templateUrl: './auth-handler.component.html',
  styleUrls: ['./auth-handler.component.scss']
})
export class AuthHandlerComponent implements OnInit {

  public platformName: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthenticationService,
    private flowService: FlowService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const platform = params.get("platform");
      
      if(platform == "spotify") {
        const grantCode = this.route.snapshot.queryParamMap.get("code")

        if(grantCode) {
          this.platformName = platform;
          this.authService.requestSpotifyAccessToken(grantCode).then((token) => {
              console.log(token)
              this.authService.createSpotifyOrientedSession(token).then((session) => {
                console.log(session)
                this.flowService.nextStep();
                this.router.navigate(["/choose-playlist"])
              })
          })          
        } else {
          // TODO: Show error --> no grant code
        }
      } else {
        // TODO: Show error --> platform name not found, therefor not supported
      }
      
    })
  }

}
