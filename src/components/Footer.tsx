import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

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
        const response = await fetch("/docs/main.js");
        const headers = new Date(response.headers.get("Last-Modified"));
        this.setState({
            lastUpdate: headers.toLocaleString(this.props.i18n.language)
        });
    }

    render() {
        console.log("Hello from footer.");
        return (
            <React.Fragment>
                <div>
                    {this.props.t("lastUpdate")}: {this.state.lastUpdate}
                </div>
            </React.Fragment>
        );
    }
}
