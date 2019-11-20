import * as React from "react";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";
import { PopupContext } from "../context/PopupContext";
const appsettings: AppSettings = require("appsettings");

interface ProjectProps {
    projectName?: string;
    t?: TFunction;
    i18n?: i18n;
    history?: History<LocationState>;
    isProjectActive?: boolean;
    dynamicWindowHeight?: string;
}

interface ProjectState {
    projectInfo: string;
    noContent: string;
}

export class Project extends React.Component<ProjectProps, ProjectState> {
    constructor(props: any) {
        super(props);
        this.state = {
            projectInfo: this.props.projectName,
            noContent: this.props.t("main.noContent")
        };
    }

    openProject = () => {
        let popupContext: PopupContext = this.context;
        if (this.props.projectName === this.props.t("projects.brand-game")) {
            popupContext.setContext(
                popupContext.popupType.project,
                appsettings.brandGameUrl,
                location.hash + "/" + "brand-game"
            );
        } else {
            this.setState({
                projectInfo: this.props.t("main.noContent")
            });
        }
    };

    projectInfoRenderer(): JSX.Element {
        if (this.state.projectInfo === this.state.noContent) {
            return <p>{this.state.projectInfo}</p>;
        } else return <h3>{this.state.projectInfo}</h3>;
    }

    render() {
        if (this.props.isProjectActive) {
            return (
                <React.Fragment>
                    <object
                        className="active-project"
                        style={{
                            height: this.props.dynamicWindowHeight
                        }}
                        type="text/html"
                        data={appsettings.brandGameUrl}
                    ></object>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="project" onClick={this.openProject}>
                        <div className="project-content">
                            {this.projectInfoRenderer()}
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

Project.contextType = PopupContext;
