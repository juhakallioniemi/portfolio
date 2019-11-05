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

    titleToKey = (title: string) => {
        title = title.replace(/\s/g, "").toLowerCase();
        let myKey: string;
        Object.keys(localesEn.header["menu-titles"]).some((key: string) => {
            if (key.toLowerCase() === title) {
                myKey = key;
            }
        });
        return myKey;
    };

    renderSwitch(locationHash: string): JSX.Element {
        switch (locationHash) {
            case this.titleToKey(localesEn.header["menu-titles"].aboutMe):
                return (
                    <div className="main-content" key={this.getShortId()}>
                        <div className="no-content">
                            {this.props.t("main.noContent")}
                        </div>
                    </div>
                );

            case this.titleToKey(localesEn.header["menu-titles"].projects):
                return (
                    <div className="main-content" key={this.getShortId()}>
                        <ProjectsList
                            t={this.props.t}
                            i18n={this.props.i18n}
                            history={this.props.history}
                        />
                    </div>
                );

            case this.titleToKey(localesEn.header["menu-titles"].contact):
                return (
                    <div className="main-content" key={this.getShortId()}>
                        <div className="no-content">
                            {this.props.t("main.noContent")}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="main-content" key={this.getShortId()}>
                        <div className="no-content">README.md</div>
                    </div>
                );
        }
    }

    render() {
        let locationHash = location.hash.split("/")[1];
        return (
            <React.Fragment>{this.renderSwitch(locationHash)}</React.Fragment>
        );
    }
}
