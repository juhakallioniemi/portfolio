import * as React from "react";
import { Project } from "./Project";
import { TFunction, i18n } from "i18next";

interface ProjectsListProps {
    t: TFunction;
    i18n: i18n;
}

interface ProjectsListState {
    isProjectRunning: boolean;
    projectUrl: string;
}

export class ProjectsList extends React.Component<
    ProjectsListProps,
    ProjectsListState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            isProjectRunning: false,
            projectUrl: ""
        };
    }

    openClickedProject = (projectUrl: string) => {
        this.setState({
            projectUrl: projectUrl,
            isProjectRunning: true
        });
    };

    render() {
        // TODO: object width and height 100% somehow
        // try .content styling from less
        // Save running project state somehow
        var testHeight = "500px";

        if (this.state.isProjectRunning) {
            return (
                <div className="projects-list running-project">
                    <React.Fragment>
                        <object
                            className="content"
                            type="text/html"
                            data={this.state.projectUrl}
                            width="800px"
                            height={testHeight}
                        ></object>
                    </React.Fragment>
                </div>
            );
        } else {
            return (
                <div className="projects-list">
                    <Project
                        projectName={this.props.t("brand-game")}
                        clickedProject={this.openClickedProject}
                        t={this.props.t}
                        i18n={this.props.i18n}
                    />
                    <Project
                        projectName="TODO"
                        clickedProject={this.openClickedProject}
                        t={this.props.t}
                        i18n={this.props.i18n}
                    />
                    <Project
                        projectName="TODO"
                        clickedProject={this.openClickedProject}
                        t={this.props.t}
                        i18n={this.props.i18n}
                    />
                </div>
            );
        }
    }
}
