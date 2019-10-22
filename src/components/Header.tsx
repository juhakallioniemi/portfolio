import * as React from "react";
import * as ReactDOM from "react-dom";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";
import localesEn from "../locales/en.json";

interface HeaderProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

interface HeaderState {
    menuButtons: string[];
    activeButton: string;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            menuButtons: localesEn["menu-titles"].map(title =>
                title.replace(/\s/g, "")
            ),
            activeButton: location.hash.split("/")[1]
        };
    }

    componentDidMount() {
        if (this.state.activeButton) {
            this.props.history.push(
                "#" + this.props.i18n.language + "/" + this.state.activeButton
            );
        } else {
            this.props.history.push("#" + this.props.i18n.language);
        }
    }

    componentDidUpdate() {
        this.state.menuButtons.forEach(menuButton => {
            if (menuButton === this.state.activeButton) {
                (ReactDOM.findDOMNode(
                    this.refs[menuButton]
                ) as Element).classList.add("active");
            } else {
                (ReactDOM.findDOMNode(
                    this.refs[menuButton]
                ) as Element).classList.remove("active");
            }
        });
    }

    changeLanguage(lang: string) {
        this.props.i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    localeButton(): JSX.Element {
        if (this.props.i18n.language !== "en") {
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
        let currentLocale = location.hash.split("/")[0];
        this.props.history.push(currentLocale + "/" + linkName);
        this.setState({
            activeButton: location.hash.split("/")[1]
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="portfolio-title">
                    <h1 onClick={() => this.menuClick("")}>Portfolio</h1>
                </div>
                <a
                    href="https://github.com/juhakallioniemi/portfolio"
                    className="repository-link"
                    target="_blank"
                >
                    <span className="underline-animation">
                        {this.props.t("repository")}
                    </span>
                </a>
                <div className="menu-links">
                    {this.state.menuButtons.map((btn, i) => (
                        <button
                            id={btn}
                            key={btn}
                            type="button"
                            className="link-button"
                            ref={btn}
                            onClick={() => this.menuClick(btn)}
                        >
                            {this.props.t("menu-titles")[i]}
                        </button>
                    ))}
                </div>
                <div className="flag-icon">{this.localeButton()}</div>
            </React.Fragment>
        );
    }
}
