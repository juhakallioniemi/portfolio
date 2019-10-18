import * as React from "react";
import { History, LocationState } from "history";
import { TFunction, i18n } from "i18next";
import localesEn from "../locales/en.json";

const appEnvironment = process.env.NODE_ENV;
const brandGameUrl =
    appEnvironment === "production"
        ? "brand-game/index.html"
        : "docs/brand-game/index.html";

interface MainProps {
    history?: History<LocationState>;
    t: TFunction;
    i18n: i18n;
}

export class Main extends React.Component<MainProps, {}> {
    render() {
        console.log("wat");
        console.log(appEnvironment + " url: " + brandGameUrl);
        if (location.hash === "#" + localesEn["menu-titles"][1]) {
            return (
                <React.Fragment>
                    <a href={brandGameUrl}>Brand game</a>
                </React.Fragment>
            );
        }
        return this.props.t("noContent");
    }
}
