import * as React from "react";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";

export interface PortfolioProps {
    t: TFunction;
    i18n: i18n;
    history?: History<LocationState>;
}

export interface PortfolioState {}

export class Portfolio extends React.Component<PortfolioProps, PortfolioState> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    renderContext(): JSX.Element {
        if (this.props.i18n.language === "en") {
            return (
                <React.Fragment>
                    <h5 className="sub-title">Technologies used</h5>
                    <div className="context">
                        <div className="list">
                            <p>User interface</p>
                            <ul>
                                <li>GitHub</li>
                                <li>React</li>
                                <li>TypeScript</li>
                                <li>Less</li>
                                <li>i18next</li>
                                <li>webpack</li>
                                <li>jQuery</li>
                                <li>axios</li>
                            </ul>
                        </div>
                        <div className="list">
                            <p>Todo and Login (back end)</p>
                            <ul>
                                <li>Heroku</li>
                                <li>Node.js</li>
                                <li>Express</li>
                                <li>Jade</li>
                                <li>MySQL</li>
                                <li>Google Cloud Platform</li>
                            </ul>
                        </div>
                        <div className="list">
                            <p>Source Control</p>
                            <ul>
                                <li>Git</li>
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <h5 className="sub-title">Käytetyt teknologiat</h5>
                    <div className="context">
                        <div className="list">
                            <p>Käyttöliittymä</p>
                            <ul>
                                <li>GitHub</li>
                                <li>React</li>
                                <li>TypeScript</li>
                                <li>Less</li>
                                <li>i18next</li>
                                <li>webpack</li>
                                <li>jQuery</li>
                                <li>axios</li>
                            </ul>
                        </div>
                        <div className="list">
                            <p>Keskeneräiset ja Kirjautuminen (back end)</p>
                            <ul>
                                <li>Heroku</li>
                                <li>Node.js</li>
                                <li>Express</li>
                                <li>Jade</li>
                                <li>MySQL</li>
                                <li>Google Cloud Platform</li>
                            </ul>
                        </div>
                        <div className="list">
                            <p>Versionhallinta</p>
                            <ul>
                                <li>Git</li>
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

    closeProject() {
        this.props.history.push(
            location.hash.slice(0, location.hash.lastIndexOf("/"))
        );
    }

    render() {
        return (
            <React.Fragment>
                <button className="close" onClick={() => this.closeProject()}>
                    <span>&times;</span>
                </button>
                <h3 className="title">{this.props.t("projects.portfolio")}</h3>
                <div className="project-info">{this.renderContext()}</div>
            </React.Fragment>
        );
    }
}
