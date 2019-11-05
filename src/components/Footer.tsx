import * as React from "react";
import { TFunction, i18n } from "i18next";
const Appsettings: AppSettings = require("appsettings");

interface FooterProps {
    t: TFunction;
    i18n: i18n;
}

interface FooterState {
    lastUpdate: string;
}

export class Footer extends React.Component<FooterProps, FooterState> {
    isComponentMounted: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = { lastUpdate: "" };
        this.lastModified();
    }

    componentDidMount() {
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    async lastModified() {
        const requestUrl = Appsettings.lastModified;
        const response = await fetch(requestUrl);
        const lastModified = new Date(response.headers.get("Last-Modified"));
        if (this.isComponentMounted) {
            this.setState({
                lastUpdate: lastModified.toLocaleDateString(
                    this.props.i18n.language
                )
            });
        }
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
                    {this.props.t("footer.last-update")}:{" "}
                    {this.state.lastUpdate}
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
