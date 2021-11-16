import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FlowStep } from "../model/flow-step.model";
import { Flow } from "../model/flow.model";

@Injectable({
    providedIn: 'root'
})
export class FlowService {

    private readonly _currentStepSubject: BehaviorSubject<FlowStep> = new BehaviorSubject(null);
    private readonly _selectedFlowSubject: BehaviorSubject<Flow> = new BehaviorSubject(null);

    public $currentStep: Observable<FlowStep> = this._currentStepSubject.asObservable();
    public $selectedFlow: Observable<Flow> = this._selectedFlowSubject.asObservable();

    public async startFlow() {
        const flow = this._selectedFlowSubject.getValue();
        flow.start();

        this._selectedFlowSubject.next(flow);
    }

    public async nextStep() {
        const flow = this._selectedFlowSubject.getValue();
        flow.next();

        this._selectedFlowSubject.next(flow);
    }

    public async abort() {
        const flow = this._selectedFlowSubject.getValue();
        flow.next();

        this._selectedFlowSubject.next(flow);
        this.selectDefaultFlow();
    }

    public async selectDefaultFlow() {
        this._selectedFlowSubject.next(new Flow([
            { id: 1, title: "Connect with Spotify", allowBack: false, allowNext: false, isListed: true },
            { id: 2, title: "Choose your playlist", allowBack: false, allowNext: true, isListed: true },
            { id: 3, title: "Choose songs", allowBack: false, allowNext: true, isListed: false },
            { id: 4, title: "Connect to YouTube", allowBack: false, allowNext: true, isListed: true }
        ]));
    }

    public hasActiveFlow(): boolean {
        return this._selectedFlowSubject.getValue().hasStarted
    }

}