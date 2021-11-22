import { ActivatedRoute, Router } from "@angular/router";
import { FlowList } from "./flow-list.model";
import { FlowStep } from "./flow-step.model";
import { Platform } from "./platform.model";

export const FLOW_SESSIONSTORAGE_KEY = "currentFlow";

export interface PersistableFlow {
    currentStepId: string;
    srcPlatform: Platform;
    // Not important at the moment
    destPlatform: Platform;
}

export class Flow implements PersistableFlow {

    // TODO: Create data object, that holds the keys of stepIds and the data object as values. Inside these objects all the states will be saved an accessed from other steps

    // Implemented by PersistableFlow
    public currentStepId: string;
    public srcPlatform: Platform;
    public destPlatform: Platform;

    // Custom fields
    public currentStep?: FlowStep;
    public list: FlowList;

    constructor(list: FlowStep[], private router: Router, private currentRoute: ActivatedRoute) {
        this.list = new FlowList(list);
        this.currentStep = list[0];
        this.destPlatform = Platform.YOUTUBE;
        this.srcPlatform = Platform.SPOTIFY;
    }

    public get isActive() {
        return this.currentStep?.id != "index";
    }

    public start(): void {
        console.log("flow started");
        this.next();
    }

    public abort(): void {
        console.log("aborting flow...")
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
    }

    public async navigateToCurrentStep() {
        const queryParams = (this.currentStep?.navigation?.preserveQuery ? await this.currentRoute.queryParams.toPromise() : {})

        this.router.navigate([this.currentStep?.route?.path || "/"], {
            queryParams: queryParams
        })
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
        if(!!localStorage && this.currentStepId) {
            if(!this.isActive) return;

            const persistableFlow: PersistableFlow = {
                currentStepId: this.currentStepId,
                destPlatform: this.destPlatform,
                srcPlatform: Platform.SPOTIFY
            }

            console.log("persisting flow...", persistableFlow)

            localStorage.setItem(FLOW_SESSIONSTORAGE_KEY, JSON.stringify(persistableFlow))
        }
    }

    public async clearPersistedData() {
        if(!!localStorage) {
            console.log("clearing persisted flow...")
            localStorage.removeItem(FLOW_SESSIONSTORAGE_KEY)
        }
    }

}