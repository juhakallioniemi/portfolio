import * as React from "react";
import { Project } from "./Project";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";

interface ProjectsListProps {
    t: TFunction;
    i18n: i18n;
    history?: History<LocationState>;
}

interface ProjectsListState {
    isProjectActive: boolean;
    dynamicWindowHeight: string;
}

export class ProjectsList extends React.Component<
    ProjectsListProps,
    ProjectsListState
> {
    timeoutId: NodeJS.Timeout;

    constructor(props: any) {
        super(props);
        this.state = {
            isProjectActive: location.hash.split("/")[2] !== undefined,
            dynamicWindowHeight: `calc(100vh - ${$("header").outerHeight(true) +
                $("footer").outerHeight(true)}px)`
        };
    }

    resizeProjectWindow = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.setState({
                dynamicWindowHeight: `calc(100vh - ${$("header").outerHeight(
                    true
                ) + $("footer").outerHeight(true)}px)`
            });
        }, 100);
    };

    componentDidMount() {
        window.addEventListener("resize", this.resizeProjectWindow);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeProjectWindow);
    }

    componentDidUpdate() {
        if (location.hash.split("/")[2] && !this.state.isProjectActive) {
            this.setState({
                isProjectActive: true
            });
        } else if (!location.hash.split("/")[2] && this.state.isProjectActive) {
            this.setState({
                isProjectActive: false
            });
        }
    }

    render() {
        if (this.state.isProjectActive) {
            return (
                <Project
                    isProjectActive={true}
                    dynamicWindowHeight={this.state.dynamicWindowHeight}
                />
            );
        } else {
            return (
                <div
                    className="projects-list"
                    style={{ height: this.state.dynamicWindowHeight }}
                >
                    <Project
                        projectName={this.props.t("projects.brand-game")}
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
