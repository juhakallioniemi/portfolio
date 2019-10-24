import * as React from "react";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";

const appEnvironment = process.env.NODE_ENV;
const brandGameUrl =
    appEnvironment === "production"
        ? "brand-game/index.html"
        : "docs/brand-game/index.html";

interface ProjectProps {
    projectName?: string;
    clickedProject?: any;
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
        if (this.props.projectName === this.props.t("brand-game")) {
            this.props.history.push(location.hash + "/" + "Brand-game");
        } else {
            this.setState({
                projectInfo: this.props.t("noContent")
            });
        }
    };

    render() {
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
