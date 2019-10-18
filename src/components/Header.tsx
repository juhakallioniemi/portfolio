import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface HeaderProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

interface HeaderState {
    menuButtons: string[];
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            menuButtons: ["About Me", "Projects", "Contact"]
            // menuButtons: this.props.t("menu-titles")
        };
    }

    componentDidMount() {
        if (location.hash) {
            document.getElementById(location.hash.substr(1)).focus();
        }
    }

    changeLanguage = (lang: string) => {
        this.props.i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    renderLocaleButton(): JSX.Element {
        if (this.props.i18n.language != "en") {
            return (
                <i
                    className="flag-en"
                    onClick={() => this.changeLanguage("en")}
                ></i>
            );
        } else {
            return (
                <i
                    className="flag-fi"
                    onClick={() => this.changeLanguage("fi")}
                ></i>
            );
        }
    }

    menuClick = (linkName: string) => {
        this.props.history.push("#" + linkName.replace(/\s/g, ""));
    };

    render() {
        return (
            <React.Fragment>
                <div className="portfolio-title">
                    <h1
                        onClick={() =>
                            this.props.history.push(window.location.pathname)
                        }
                    >
                        Portfolio
                    </h1>
                </div>
                <div className="menu-links">
                    {this.state.menuButtons.map((btn, i) => (
                        <button
                            id={this.state.menuButtons[i].replace(/\s/g, "")}
                            key={btn}
                            type="button"
                            className="link-button"
                            onClick={() => this.menuClick(btn)}
                        >
                            {this.props.t("menu-titles")[i]}
                        </button>
                    ))}
                </div>
                <div className="flag-icon">{this.renderLocaleButton()}</div>
            </React.Fragment>
        );
    }
}