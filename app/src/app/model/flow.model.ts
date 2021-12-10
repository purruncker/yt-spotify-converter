import { Router } from "@angular/router";
import { FlowList } from "./flow-list.model";
import { FlowStep } from "./flow-step.model";
import { Platform } from "./platform.model";

export const FLOW_SESSIONSTORAGE_KEY = "currentFlow";

export interface PersistableFlow {
    currentStepId: string;
    srcPlatform: Platform;
    // Not important at the moment
    destPlatform: Platform;
    hasStarted: boolean;
}

export class Flow implements PersistableFlow {

    // TODO: Create data object, that holds the keys of stepIds and the data object as values. Inside these objects all the states will be saved an accessed from other steps

    // Implemented by PersistableFlow
    public currentStepId: string;
    public srcPlatform: Platform;
    public destPlatform: Platform;
    public hasStarted: boolean = false;

    // Custom fields
    public currentStep?: FlowStep;
    public list: FlowList;

    constructor(list: FlowStep[], private router: Router) {
        this.list = new FlowList(list);
        this.currentStep = list[0];

        console.log(this.currentStep)
        this.hasStarted = false;
        this.destPlatform = Platform.YOUTUBE;
        this.srcPlatform = Platform.SPOTIFY;
    }

    public start(): void {
        console.log("flow started");
        this.hasStarted = true;
        this.next();
    }

    public abort(): void {
        this.hasStarted = false;
        this.currentStep = this.list.find("index");
        this.currentStepId = this.currentStep.id;
        this.clearPersistedData()
    }

    public next(): void {
        if(!this.currentStep) {
            this.currentStep = this.list[0];
            this.currentStepId = this.currentStep.id;
        }

        console.log("current step: ", this.currentStep.id)
        this.setStepById(this.currentStep?.navigation?.nextId)
    }

    public setStepById(id: string) {
        this.currentStep = this.list.find(id);
        this.currentStepId = this.currentStep.id;
        console.log("routing to flow: ", id, " on route ", this.currentStep.route.path)
        this.navigateToCurrentStep();
        this.persist();
    }

    public navigateToCurrentStep() {
        this.router.navigateByUrl(this.currentStep?.route?.path || "/")
    }

    public back(): void {
        if(!this.currentStep) this.currentStep = this.list.find("index");

        /*const currentStep = this.currentStep;

        this.currentStep = this.list[this.currentStep.id - 1 || 0];        
        this.router.navigateByUrl(currentStep.navigation.backRoute.path)
        this.persist()*/

        this.setStepById(this.currentStep?.navigation?.backId);
    }

    

    public async persist() {
        if(!!sessionStorage && this.currentStepId) {
            const persistableFlow: PersistableFlow = {
                currentStepId: this.currentStepId,
                destPlatform: this.destPlatform,
                hasStarted: this.hasStarted,
                srcPlatform: Platform.SPOTIFY
            }

            console.log("persisting flow...", persistableFlow)

            sessionStorage.setItem(FLOW_SESSIONSTORAGE_KEY, JSON.stringify(persistableFlow))
        }
    }

    public async clearPersistedData() {
        if(!!sessionStorage) {
            console.log("clearing persisted flow...")
            sessionStorage.removeItem(FLOW_SESSIONSTORAGE_KEY)
        }
    }

}