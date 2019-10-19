import * as React from "react";
import { Project } from "./Project";
import { TFunction, i18n } from "i18next";

interface ProjectsListProps {
    t: TFunction;
    i18n: i18n;
}

export class ProjectsList extends React.Component<ProjectsListProps, {}> {
    render() {
        return (
            <div className="projects-list">
                <Project projectName={this.props.t("brand-game")} />
                <Project projectName="TODO" />
                <Project projectName="TODO" />
            </div>
        );
    }
}
