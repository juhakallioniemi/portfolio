import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";

interface MainProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

const brandGameTemplate = {
    __html: require("../../brand-game/index.html")
};

export class Main extends React.Component<MainProps, {}> {
    render() {
        if (location.hash === "#Projects") {
            return (
                <React.Fragment>
                    <span dangerouslySetInnerHTML={brandGameTemplate}></span>
                </React.Fragment>
            );
        }
        return this.props.t("noContent");
    }
}
