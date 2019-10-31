import * as React from "react";
import { TFunction, i18n } from "i18next";
import { ProjectsList } from "./ProjectsList";
import localesEn from "../locales/en.json";
import shortid from "shortid";
import { History, LocationState } from "history";

interface MainProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

interface MainState {
    isProjectActive: boolean;
}

export class Main extends React.Component<MainProps, MainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isProjectActive: false
        };
    }

    getShortId = () => {
        const id = shortid.generate();
        return id;
    };

    componentDidUpdate() {
        if (location.hash.split("/")[2] && !this.state.isProjectActive) {
            this.setState({
                isProjectActive: true
            });
            // window.onbeforeunload = function() {
            //     return "Your work will be lost.";
            // };
        } else if (!location.hash.split("/")[2] && this.state.isProjectActive) {
            this.setState({
                isProjectActive: false
            });
            // window.onbeforeunload = undefined;
        }
        console.log(
            "main update - project active: " + this.state.isProjectActive
        );
    }

    render() {
        if (
            location.hash.split("/")[1] ===
            localesEn.header["menu-titles"][1].toLowerCase()
        ) {
            return (
                <div className="main-content" key={this.getShortId()}>
                    <ProjectsList
                        t={this.props.t}
                        i18n={this.props.i18n}
                        history={this.props.history}
                    />
                </div>
            );
        }
        return (
            <div className="main-content" key={this.getShortId()}>
                <div className="no-content">
                    {this.props.t("main.noContent")}
                </div>
            </div>
        );
    }
}
