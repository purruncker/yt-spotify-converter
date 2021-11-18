import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, zip } from "rxjs";
import { filter, map } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { FlowService } from "../services/flow.service";

@Injectable({
    providedIn: "root"
})
export class CanActivateRoute implements CanActivate {

    constructor(private flowService: FlowService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.flowService.$selectedFlow.pipe(filter((flow) => !!flow), map(() => {
            if(!this.flowService.getFlow().list.existsByRoute(state.url)) {
                if(this.flowService.hasActiveFlow()) {
                    this.flowService.abort(false);
                }
                return true;
            }
            
            this.flowService.getFlow().navigateToCurrentStep();
            return false;
        }))
    }

}

@Injectable({
    providedIn: "root"
})
export class UserCanActivateFlowRoute implements CanActivateChild {

    constructor(private router: Router, private authService: AuthenticationService, private flowService: FlowService){ }

    canActivateChild(childRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("can activate guard")

        // Fix guard not routing
        // Problem: console.log not even executed
        // Suspected: Somehow the session is not pushed, because selectedFlow has proven that it is pushed correctly.
        
        // Because it is possible that the flow is not ready when guard 
        // is triggered, we have to wait a bit for it to be available
        return zip(this.flowService.$selectedFlow.pipe(filter((flow) => !!flow)), this.authService.$session).pipe(map(() => {
            console.log("flow and session ready")
            // Check if route belongs to flow or is index route.
            // If not, abort and clear flow and allow routing
            if(!this.flowService.getFlow().list.existsByRoute(routeState.url) || this.flowService.getFlow().list.findByRoute(routeState.url).id == "index") {
                this.flowService.abort(false);
                console.log("route neither belongs to flow or is the index of the flow")
                return true;
            }

            // Check if session is valid when routing to steps
            if(!this.authService.hasValidSession()) {
                this.flowService.abort(true);
                this.authService.logout();
                return false;
            }

            return true;
        }));

        


        /*if(state.url == "/" || state.url.startsWith("/authorize") || this.authService.hasValidSession()) {
            return true;
        }

        this.router.navigate(["/"]);

        if(this.flowService.hasActiveFlow()) {
            this.flowService.abort();
        }
        return false;*/
    }

}