import * as React from "react";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";
import { PopupContext } from "../context/PopupContext";

const appEnvironment = process.env.NODE_ENV;
const brandGameUrl =
    appEnvironment === "production"
        ? "brand-game/index.html"
        : "docs/brand-game/index.html";

interface ProjectProps {
    // router: any;
    // route: any;
    projectName?: string;
    t?: TFunction;
    i18n?: i18n;
    history?: History<LocationState>;
    isProjectActive?: boolean;
}

interface ProjectState {
    projectInfo: string;
}

export class Project extends React.Component<ProjectProps, ProjectState> {
    constructor(props: any) {
        super(props);
        this.state = {
            projectInfo: this.props.projectName
        };
    }

    openProject = () => {
        let popupContext: PopupContext = this.context;
        if (this.props.projectName === this.props.t("projects.brand-game")) {
            popupContext.setContext(
                popupContext.popupType.project,
                brandGameUrl,
                location.hash + "/" + "brand-game"
            );
        } else {
            this.setState({
                projectInfo: this.props.t("main.noContent")
            });
        }
    };

    // componentWillMount() {
    //     this.props.router.setRouteLeaveHook(
    //         this.props.route,
    //         this.routerWillLeave
    //     );
    // }

    // routerWillLeave() {
    //     return <div>sdadsa</div>;
    // }

    render() {
        let popupContext: PopupContext = this.context;
        if (this.props.isProjectActive) {
            return (
                <React.Fragment>
                    <object
                        className="active-project"
                        type="text/html"
                        data={brandGameUrl}
                    ></object>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="project" onClick={this.openProject}>
                        <div className="project-content">
                            {this.state.projectInfo}
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

Project.contextType = PopupContext;
