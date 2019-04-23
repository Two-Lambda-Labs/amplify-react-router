export interface AmplifyRouterProps {
    amplifyConfig?: object;
    componentOverrides?: Array<React.ReactType>;
    hide?: Array<React.ReactType>;
    homeRoute?: String
}

declare const AmplifyRouter: React.FunctionComponent<AmplifyRouterProps>;

export default AmplifyRouter;
