import * as React from "react";
import { TFunction, i18n } from "i18next";
const Appsettings: AppSettings = require("appsettings");

const appEnvironment = process.env.NODE_ENV;

interface FooterProps {
    t: TFunction;
    i18n: i18n;
}

interface FooterState {
    lastUpdate: string;
}

export class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props: any) {
        super(props);
        this.state = { lastUpdate: "" };
        this.lastModified();
    }

    async lastModified() {
        const requestUrl =
            appEnvironment === "production"
                ? "https://api.github.com/repos/juhakallioniemi/portfolio/contents/docs/main.bundle.js"
                : "/docs/main.bundle.js";
        const response = await fetch(requestUrl);
        const lastModified = new Date(response.headers.get("Last-Modified"));
        this.setState({
            lastUpdate: lastModified.toLocaleDateString(
                this.props.i18n.language
            )
        });
    }

    iconClicked(id: string) {
        let url = "";
        switch (id) {
            case "facebook":
                url = Appsettings.facebook;
                break;
            case "linkedin":
                url = Appsettings.linkedin;
                break;
            case "github":
                url = Appsettings.github;
                break;
        }
        window.open(url, "_blank");
    }

    render() {
        return (
            <React.Fragment>
                <div className="last-updated">
                    <span className="underline-animation">
                        {this.props.t("footer.last-update")}:{" "}
                        {this.state.lastUpdate}
                    </span>
                </div>
                <div className="icon-container">
                    <i
                        id="facebook"
                        className="icon-facebook"
                        onClick={(e: any) => this.iconClicked(e.target.id)}
                    ></i>
                    <i
                        id="linkedin"
                        className="icon-linkedin"
                        onClick={(e: any) => this.iconClicked(e.target.id)}
                    ></i>
                    <i
                        id="github"
                        className="icon-github"
                        onClick={(e: any) => this.iconClicked(e.target.id)}
                    ></i>
                </div>
            </React.Fragment>
        );
    }
}
