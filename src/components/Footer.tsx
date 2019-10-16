import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface FooterProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

export class Footer extends React.Component<FooterProps, {}> {
    fileWithDate = new File([], "/docs/main.js", {
        lastModified: new Date(2017, 1, 1) as any
    });

    lastUpdate = () => {
        return new Date(this.fileWithDate.lastModified).toLocaleDateString(
            this.props.i18n.language
        );
    };

    render() {
        console.log(document.lastModified);
        return (
            <React.Fragment>
                <div>
                    {this.props.t("lastUpdate")}: {this.lastUpdate()}
                </div>
            </React.Fragment>
        );
    }
}
