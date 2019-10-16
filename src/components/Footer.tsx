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
        const response = await fetch(
            "/docs/main.js" ||
                "https://raw.githubusercontent.com/juhakallioniemi/portfolio/master/docs/main.js" ||
                "https://api.github.com/repos/juhakallioniemi/portfolio/contents/docs/main.js" ||
                "https://github.com/juhakallioniemi/portfolio/blob/master/docs/main.js"
        );
        console.log("jepjep");
        console.log(
            fetch(
                "https://raw.githubusercontent.com/juhakallioniemi/portfolio/master/docs/main.js"
            )
        );
        console.log(
            fetch(
                "https://api.github.com/repos/juhakallioniemi/portfolio/contents/docs/main.js"
            )
        );
        console.log(
            fetch(
                "https://github.com/juhakallioniemi/portfolio/blob/master/docs/main.js"
            )
        );
        const headers = new Date(response.headers.get("Last-Modified"));
        this.setState({
            lastUpdate: headers.toLocaleString(this.props.i18n.language)
        });
    }

    // https://raw.githubusercontent.com/juhakallioniemi/portfolio/master/docs/main.js
    // https://api.github.com/repos/juhakallioniemi/portfolio/contents/docs/main.js
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
