import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-auth-handler',
  templateUrl: './auth-handler.component.html',
  styleUrls: ['./auth-handler.component.scss']
})
export class AuthHandlerComponent implements OnInit {

  public platformName: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const platform = params.get("platform");
      
      if(platform == "spotify") {
        const grantCode = this.route.snapshot.queryParamMap.get("code")

        if(grantCode) {
          console.log(grantCode)
          this.platformName = platform;
          this.authService.requestSpotifyAccessToken(grantCode).then((token) => {
              this.authService.createSpotifyOrientedSession(token).then(() => {
                this.router.navigate(["/spotify"])
              })
          })          
        } else {
          // TODO: Show error --> no grant code
        }
      }
      
    })
  }

}