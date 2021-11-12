import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FlowStep } from "../model/flow-step.model";

@Injectable({
    providedIn: 'root'
})
export class FlowService {

    private readonly currentStepSubject: BehaviorSubject<FlowStep> = new BehaviorSubject(null);
    public $currentStep: Observable<FlowStep> = this.currentStepSubject.asObservable();

    constructor() {
        
    }



}