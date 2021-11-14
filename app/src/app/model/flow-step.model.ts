import { Route } from "@angular/router";

export class FlowStep {

    public id: number;
    public title: string;
    public data?: Record<string, any> = {};
    public isActive?: boolean = false;

    public allowBack?: boolean = false;
    public allowNext?: boolean = true;

    // TODO: Implement routing

    public nextRoute?: Route;
    public backRoute?: Route;

}