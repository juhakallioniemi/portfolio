import * as React from "react";
import { TFunction, i18n } from "i18next";
import { ProjectsList } from "./ProjectsList";
import localesEn from "../locales/en.json";
import shortid from "shortid";
import { History, LocationState } from "history";
import ReactMarkdown from "react-markdown";
const appsettings: AppSettings = require("appsettings");
require("../../README-en.md");
require("../../README-fi.md");

interface MainProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

interface MainState {
    isProjectActive: boolean;
    readme: string;
}

export class Main extends React.Component<MainProps, MainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isProjectActive: false,
            readme: ""
        };
        this.fetchReadme();
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

    fetchReadme() {
        let requestFile =
            this.props.i18n.language === "en"
                ? appsettings.readmeEN
                : appsettings.readmeFI;
        fetch(requestFile)
            .then(response => response.text())
            .then(text => {
                this.setState({ readme: text });
            });
    }

    // UNSAFE_componentWillMount() {
    // }

    renderSwitch(locationHash: string): JSX.Element {
        switch (locationHash) {
            case this.titleToKey(localesEn.header["menu-titles"].aboutMe):
                return (
                    <div className="main-content" key={this.getShortId()}>
                        {this.props.t("main.noContent")}
                    </div>
                );

            case this.titleToKey(localesEn.header["menu-titles"].projects):
                return (
                    <ProjectsList
                        key={this.getShortId()}
                        t={this.props.t}
                        i18n={this.props.i18n}
                        history={this.props.history}
                    />
                );

            case this.titleToKey(localesEn.header["menu-titles"].contact):
                return (
                    <div className="main-content" key={this.getShortId()}>
                        {this.props.t("main.noContent")}
                    </div>
                );

            default:
                return (
                    <div className="main-content" key={this.getShortId()}>
                        <ReactMarkdown
                            className="markdown"
                            source={this.state.readme}
                        />
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
