import * as React from "react";
import { TFunction, i18n } from "i18next";

const appEnvironment = process.env.NODE_ENV;
const brandGameUrl =
    appEnvironment === "production"
        ? "brand-game/index.html"
        : "docs/brand-game/index.html";

interface ProjectProps {
    projectName: string;
    clickedProject: any;
    t: TFunction;
    i18n: i18n;
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
            this.props.clickedProject(brandGameUrl);
        } else {
            this.setState({
                projectInfo: this.props.t("noContent")
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="project" onClick={this.openProject}>
                    {this.state.projectInfo}
                </div>
            </React.Fragment>
        );
    }
}
