import { FlowStep } from "./flow-step.model";

export class FlowList {

    private _list: Map<string, FlowStep> = new Map();
    private _paths: Map<string, FlowStep> = new Map();

    constructor(list: FlowStep[]) {
        this._list = new Map(list.map((value) => [value.id, value]));
        console.log(this._list)
        this._paths = new Map(list.map((value) => [value.route.path, value]));
    }

    public find(id: string): FlowStep {
        return this._list.get(id);
    }

    public findDisplayableSteps(): FlowStep[] {
        return Array.from(this._list.values()).filter((value: FlowStep) => value.isListed);
    }

    public existsByRoute(path: string): boolean {
        return !!this._paths.get(path)
    }

    public findByRoute(path: string): FlowStep {
        return this._paths.get(path)
    }

}