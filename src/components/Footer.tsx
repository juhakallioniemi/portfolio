import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

const appEnvironment = process.env.NODE_ENV;

interface FooterProps {
    history?: History<LocationState>;
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
    }

    async componentDidMount() {
        const requestUrl =
            appEnvironment === "production"
                ? "https://api.github.com/repos/juhakallioniemi/portfolio/contents/docs/main.js"
                : "/docs/main.js";
        const response = await fetch(requestUrl);
        const lastModified = new Date(response.headers.get("Last-Modified"));
        this.setState({
            lastUpdate: lastModified.toLocaleString(this.props.i18n.language)
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.props.t("lastUpdate")}: {this.state.lastUpdate}
                </div>
            </React.Fragment>
        );
    }
}
