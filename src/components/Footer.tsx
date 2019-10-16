import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface FooterProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

export class Footer extends React.Component<FooterProps, {}> {
    lastUpdate = (url: string, wch: string) => {
        try {
            var req = new XMLHttpRequest();
            req.open("HEAD", url, false);
            req.send(null);
            if (req.status == 200) {
                return req.getResponseHeader(wch);
            } else return false;
        } catch (er) {
            return er.message;
        }
    };

    render() {
        console.log("fetchHeader implemented.");
        console.log(this.lastUpdate);
        return (
            <React.Fragment>
                <div>
                    {this.props.t("lastUpdate")}:{" "}
                    {this.lastUpdate(location.href, "Last-Modified")}
                </div>
            </React.Fragment>
        );
    }
}
