export interface AmplifyRouterProps {
    amplifyConfig?: object;
    componentOverrides?: Array<React.ReactType>;
    routerProps: React.HTMLAttributes<HTMLDivElement>;
    hide?: Array<React.ReactType>;
    homeRoute?: String
}

declare const AmplifyRouter: React.FunctionComponent<AmplifyRouterProps>;

export default AmplifyRouter;
