import * as React from "react";
import { TFunction, i18n } from "i18next";
import { ProjectsList } from "./ProjectsList";
import localesEn from "../locales/en.json";
import { History, LocationState } from "history";
import ReactMarkdown from "react-markdown";
import { Login } from "./Login";
const appsettings: AppSettings = require("appsettings");
require("../../README-en.md");
require("../../README-fi.md");

interface MainProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
    setLoginState: any;
}

interface MainState {
    isProjectActive: boolean;
    readme: string;
}

export class Main extends React.Component<MainProps, MainState> {
    isComponentMounted: boolean = false;
    constructor(props: any) {
        super(props);
        this.state = {
            isProjectActive: false,
            readme: ""
        };
        this.fetchReadme();
    }

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
                if (this.isComponentMounted) {
                    this.setState({ readme: text });
                }
            });
    }

    componentDidMount() {
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    renderSwitch(locationHash: string): JSX.Element {
        let titles = localesEn.header["menu-titles"];
        let aboutMe = this.titleToKey(titles.aboutMe);
        let projects = this.titleToKey(titles.projects);
        let login = this.titleToKey(titles.login);

        switch (locationHash) {
            case aboutMe:
                return (
                    <div className="no-content" key={aboutMe}>
                        {this.props.t("main.noContent")}
                    </div>
                );

            case projects:
                return (
                    <ProjectsList
                        key={projects}
                        t={this.props.t}
                        i18n={this.props.i18n}
                        history={this.props.history}
                    />
                );

            case login:
                return (
                    <Login
                        key={login}
                        t={this.props.t}
                        i18n={this.props.i18n}
                        setLoginState={this.props.setLoginState}
                    />
                );

            default:
                return (
                    <ReactMarkdown
                        key="markdown"
                        className="markdown"
                        source={this.state.readme}
                    />
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
