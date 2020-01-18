export interface AmplifyRouterProps {
    amplifyConfig?: object;
    componentOverrides?: Array<React.ReactType>;
    hide?: Array<React.ReactType>;
    navigate: (route: string) => void;
    homeRoute?: String
}

declare const AmplifyRouter: React.FunctionComponent<AmplifyRouterProps>;

export default AmplifyRouter;
