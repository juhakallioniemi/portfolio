import * as React from "react";
import * as ReactDOM from "react-dom";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";
import localesEn from "../locales/en.json";

interface HeaderProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
    changeLanguage: any;
}

interface HeaderState {
    menuButtons: string[];
    activeButton: string;
    activeProject: string;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            menuButtons: localesEn["menu-titles"].map(title =>
                title.replace(/\s/g, "")
            ),
            activeButton: location.hash.split("/")[1],
            activeProject: location.hash.split("/")[2]
        };
    }

    componentDidMount() {
        this.urlHandler();
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

    urlHandler(): void {
        let url = "#" + this.props.i18n.language;
        if (this.state.activeButton) {
            url += "/" + this.state.activeButton;
        }
        if (this.state.activeProject) {
            url += "/" + this.state.activeProject;
        }
        this.props.history.push(url);
    }

    changeLanguage(lang: string) {
        this.props.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    localeButton(lang: string): JSX.Element {
        let isActiveProject: boolean =
            location.hash.split("/")[2] !== undefined;
        let newLang = lang === "en" ? "fi" : "en";
        return (
            <button
                className={"flag-" + newLang}
                title={
                    isActiveProject
                        ? this.props.t("locale-button-disabled")
                        : ""
                }
                disabled={isActiveProject}
                onClick={() => this.changeLanguage(newLang)}
            ></button>
        );
    }

    menuClick = (btnName: string) => {
        let currentLocale = location.hash.split("/")[0];
        this.props.history.push(currentLocale + "/" + btnName);
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
                <div className="flag-icon">
                    {this.localeButton(this.props.i18n.language)}
                </div>
            </React.Fragment>
        );
    }
}
