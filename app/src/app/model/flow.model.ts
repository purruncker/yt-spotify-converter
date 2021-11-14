import { FlowStep } from "./flow-step.model";

export class Flow {

    public currentStep?: FlowStep;
    public readonly list: FlowStep[] = [];
    public hasStarted: boolean = false;

    constructor(list: FlowStep[]) {
        this.list = list;
        this.currentStep = list[0];
        this.hasStarted = false;
    }

    public start(): void {
        this.hasStarted = true;
        this.currentStep.isActive = true;
    }

    public abort(): void {
        this.hasStarted = false;
        this.currentStep.isActive = false;
        this.currentStep = this.list[0];
    }

    public next(): void {
        if(!this.currentStep) this.currentStep = this.list[0];

        this.currentStep.isActive = false;
        this.currentStep = this.list[this.currentStep.id + 1 || 0];
        this.currentStep.isActive = true;
    }

}