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

export class Main extends React.Component<MainProps, {}> {
    getShortId = () => {
        const id = shortid.generate();
        return id;
    };

    render() {
        if (location.hash.split("/")[1] === localesEn["menu-titles"][1]) {
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
                <div className="no-content">{this.props.t("noContent")}</div>
            </div>
        );
    }
}
