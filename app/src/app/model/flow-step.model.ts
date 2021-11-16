export class FlowRoute {
    public path: string;
}

export class FlowButtonOptions {
    public text: string;
    public icon?: string;
    public class?: string;
    public onClick?: Function;
}

export class FlowStep {

    public id: number;
    public title: string;
    public data?: Record<string, any> = {};
    public isActive?: boolean = false;
    public isListed: boolean = true;

    public allowBack?: boolean = false;
    public allowNext?: boolean = true;

    // TODO: Implement routing

    public nextRoute?: FlowRoute;
    public backRoute?: FlowRoute;

    public customNextButton?: FlowButtonOptions;

    /**
     * Used to define the little label text.
     */
    public flowLabel?: string;

}