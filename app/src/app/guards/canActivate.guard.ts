import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { FlowService } from "../services/flow.service";

@Injectable({
    providedIn: "root"
})
export class UserCanActivateFlowRoute implements CanActivateChild {

    constructor(private router: Router, private authService: AuthenticationService, private flowService: FlowService){ }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // TODO: Remove childRoute.queryParamMap...
        if(state.url == "/" || state.url.startsWith("/authorize") || childRoute.queryParamMap.get("code") || this.authService.hasValidSession()) {
            return true;
        }

        this.router.navigate(["/"]);

        if(this.flowService.hasActiveFlow()) {
            this.flowService.abort();
        }
        return false;
    }

}