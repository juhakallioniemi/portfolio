import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface FooterProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

export class Footer extends React.Component<FooterProps, {}> {
    render() {
        console.log(document.lastModified);
        return (
            <React.Fragment>
                <div>
                    {this.props.t("lastUpdate")}: {document.lastModified}
                </div>
            </React.Fragment>
        );
    }
}
