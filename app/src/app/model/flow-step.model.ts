export interface FlowRoute {
    /**
     * Define the path of the route.
     * This should match a route configured in 
     * the router module, as it is used in the guard
     * and to identify the current step with a route.
     */
    path: string;
}

// Check if this is really needed
export enum FlowButtonType {
    START = "start",
    NEXT = "next",
    BACK = "back",
    END = "end",
    ABORT = "abort"
}

export interface FlowButtonOptions {
    text: string;
    icon?: string;
    class?: string;
    type: FlowButtonType;
}

export interface FlowStepButtons {
    next?: FlowButtonOptions;
    back?: FlowButtonOptions;
    start?: FlowButtonOptions;
    abort?: FlowButtonOptions
}

export interface FlowNavigationOptions {

    /**
     * Define the step by its id that should follow when
     * a next event is triggered on the current flow.
     * If not set, there will be no "next" button
     */
    nextId?: string;

    /**
     * Define the step by its id that should follow when
     * a back event is triggered on the current flow.
     * If not set, there will be no "back" button
     */
    backId?: string;
}

export class FlowStep {

    /**
     * Id of the step.
     * This is for internal uses only.
     * The very first step should always have "index" as
     * its id.
     */
    public id: string;

    /**
     * Title to be displayed in components
     */
    public title: string;

    /**
     * Route that matches this step
     */
     public route: FlowRoute;


    /**
     * The id that should be displayed in components
     * This should be different to the plain "id", because
     * if steps are set to not listed some ids or steps are skipped
     * when displaying in components.
     */
    public displayId: number;

    /**
     * Define wether the step can be 
     * displayed in components or not
     */
    public isListed: boolean = true;

    /**
     * Define navigation options like 
     * next or back routes.
     */
    public navigation?: FlowNavigationOptions;

    /**
     * Define custom buttons.
     * Every button type should exist only once.
     */
    public buttons?: FlowStepButtons;

    /**
     * Define label text to appear on navigation.
     */
    public flowLabel?: string;

    /**
     * The data field is used for storing states
     * of every steps. This helps remembering the data
     * that was inserted but was interrupted due to
     * back or next navigation.
     */
    // TODO: Create inheritable Component class, so that reading and saving the state is automated.
    public data?: Record<string, any> = {};

}