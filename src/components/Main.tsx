import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";
import localesEn from "../locales/en.json";

const appEnvironment = process.env.NODE_ENV;
const brandGameTemplate = {
    __html:
        appEnvironment === "production"
            ? require("../../brand-game/dist/index.html")
            : require("../../brand-game/public/index.html")
};

interface MainProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

export class Main extends React.Component<MainProps, {}> {
    render() {
        if (location.hash === "#" + localesEn["menu-titles"][1]) {
            return (
                <React.Fragment>
                    <span dangerouslySetInnerHTML={brandGameTemplate}></span>
                </React.Fragment>
            );
        }
        return this.props.t("noContent");
    }
}
