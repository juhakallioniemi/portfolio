import * as React from "react";
import { Project } from "./Project";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";
import { Prompt } from "react-router-dom";

interface ProjectsListProps {
    t: TFunction;
    i18n: i18n;
    history?: History<LocationState>;
}

interface ProjectsListState {
    isProjectActive: boolean;
}

export class ProjectsList extends React.Component<
    ProjectsListProps,
    ProjectsListState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            isProjectActive: location.hash.split("/")[2] !== undefined
        };
    }

    componentDidMount() {
        if (this.state.isProjectActive) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    }

    render() {
        if (this.state.isProjectActive) {
            return (
                <div className="projects-list" style={{ padding: 0 }}>
                    <Prompt
                        message={this.props.t("project-exit-confirmation")}
                    />
                    <Project isProjectActive={true} />
                </div>
            );
        } else {
            return (
                <div className="projects-list">
                    <Project
                        projectName={this.props.t("brand-game")}
                        t={this.props.t}
                        i18n={this.props.i18n}
                        history={this.props.history}
                    />
                    <Project
                        projectName="TODO"
                        t={this.props.t}
                        i18n={this.props.i18n}
                    />
                    <Project
                        projectName="TODO"
                        t={this.props.t}
                        i18n={this.props.i18n}
                    />
                </div>
            );
        }
    }
}
