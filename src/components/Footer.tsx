import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface FooterProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

export class Footer extends React.Component<FooterProps, {}> {
    // TODO: this day should be a build day.
    updateTime: string = this.props.t("date", {
        date: new Date().toLocaleString(this.props.i18n.language)
    });

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.props.t("lastUpdate")}: {this.updateTime}
                </div>
            </React.Fragment>
        );
    }
}
