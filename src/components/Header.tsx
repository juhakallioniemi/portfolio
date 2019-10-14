import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface HeaderProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
    isEnglish: boolean;
}

export class Header extends React.Component<HeaderProps, {}> {
    changeLanguage = (lang: string) => {
        this.props.i18n.changeLanguage(lang);
    };

    isLangEnglish: boolean = this.props.i18n.language == "en" ? true : false;

    renderLocaleButton(): JSX.Element {
        if (!this.isLangEnglish) {
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

    menuButtons: string[] = ["AboutMe", "Projects", "Contact"];

    menuClick = (linkName: string) => {
        this.props.history.push("#" + linkName);
    };

    render() {
        return (
            <React.Fragment>
                <div className="portfolio-title">
                    <h1 onClick={() => this.props.history.push("/")}>
                        Portfolio
                    </h1>
                </div>
                <div className="flag-icon">{this.renderLocaleButton()}</div>
                <div className="menu-links">
                    {this.menuButtons.map(btn => (
                        <button
                            key={btn}
                            type="button"
                            className="btn btn-info link"
                            onClick={() => this.menuClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}
