import { Router } from "@angular/router";
import { FlowStep } from "./flow-step.model";

export const FLOW_SESSIONSTORAGE_KEY = "currentFlow";

export class Flow {

    // TODO: Create data object, that holds the keys of stepIds and the data object as values. Inside these objects all the states will be saved an accessed from other steps

    public currentStep?: FlowStep;
    public list: FlowStep[] = [];
    public hasStarted: boolean = false;

    constructor(list: FlowStep[], private router: Router) {
        this.list = list;
        this.currentStep = list[0];
        this.hasStarted = false;
    }

    public start(): void {
        console.log("flow started");
        this.hasStarted = true;
        this.currentStep.isActive = true;
        this.next();
    }

    public abort(): void {
        this.hasStarted = false;
        this.currentStep.isActive = false;
        this.currentStep = this.list[0];
        this.clearPersistedData()
    }

    public next(): void {
        if(!this.currentStep) {
            this.currentStep = this.list[0];
        }

        const currentStep = this.currentStep;

        this.currentStep.isActive = false;
        this.currentStep = this.list[this.currentStep.id || 0];
        this.currentStep.isActive = true;

        console.log("routing to next flow: ", currentStep.nextRoute)
        this.router.navigateByUrl(currentStep.nextRoute.path)
        this.persist();
    }

    public back(): void {
        if(!this.currentStep) this.currentStep = this.list[0];

        const currentStep = this.currentStep;

        this.currentStep.isActive = false;
        this.currentStep = this.list[this.currentStep.id - 1 || 0];
        this.currentStep.isActive = true;
        
        this.router.navigateByUrl(currentStep.nextRoute.path)
        this.persist()
    }

    public async persist() {
        if(!!sessionStorage) {
            console.log("persisting flow...")
            sessionStorage.setItem(FLOW_SESSIONSTORAGE_KEY, JSON.stringify({
                currentStep: this.currentStep,
                list: this.list,
                hasStarted: this.hasStarted
            }))
        }
    }

    public async clearPersistedData() {
        if(!!sessionStorage) {
            console.log("clearing persisted flow...")
            sessionStorage.removeItem(FLOW_SESSIONSTORAGE_KEY)
        }
    }

}