import * as React from "react";
import { TFunction, i18n } from "i18next";
import { PopupContext } from "../context/PopupContext";
import { History, LocationState } from "history";

interface PopupProps {
    history: History<LocationState>;
    t?: TFunction;
    i18n?: i18n;
}

interface PopupState {
    projectName: string;
}

export class Popup extends React.Component<PopupProps, PopupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            projectName: ""
        };
    }

    mainButtonClicked = (popupContext: PopupContext) => {
        this.props.history.push(popupContext.locationHash);
        popupContext.setContext("");
    };

    tabButtonClicked = (popupContext: PopupContext) => {
        window.open(popupContext.redirectUrl, "_blank");
        popupContext.setContext("");
    };

    yesButtonClicked = (popupContext: PopupContext) => {
        this.props.history.push(popupContext.redirectUrl);
        popupContext.setContext("");
    };

    noButtonClicked = (popupContext: PopupContext) => {
        popupContext.setContext("");
    };

    popupModal(): JSX.Element {
        let popupContext: PopupContext = this.context;

        if (popupContext.activeType === "project") {
            return (
                <div id="popup">
                    <div className="popup-info">
                        <button
                            type="button"
                            className="close popup-close"
                            onClick={() => this.noButtonClicked(popupContext)}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <h3 className="popup-title">
                        {this.props.t("popup.project.title", {
                            project: this.props.t(
                                "projects." +
                                    popupContext.locationHash.split("/").pop()
                            )
                        })}
                    </h3>
                    <div className="button-container">
                        <button
                            id="popup-button-main"
                            onClick={() => this.mainButtonClicked(popupContext)}
                        >
                            {this.props.t("popup.project.main-view")}
                        </button>
                        <button
                            id="popup-button-tab"
                            onClick={() => this.tabButtonClicked(popupContext)}
                        >
                            {this.props.t("popup.project.new-tab")}
                        </button>
                    </div>
                </div>
            );
        } else if (popupContext.activeType === "confirmation") {
            return (
                <div id="popup">
                    <div className="popup-info">
                        <button
                            type="button"
                            className="close popup-close"
                            onClick={() => this.noButtonClicked(popupContext)}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <h3 className="popup-title">
                        {this.props.t("popup.confirmation.title")}
                    </h3>
                    <h4 className="popup-subtitle">
                        {this.props.t("popup.confirmation.subtitle")}
                    </h4>
                    <div className="button-container">
                        <button
                            id="popup-button-main"
                            onClick={() => this.yesButtonClicked(popupContext)}
                        >
                            {this.props.t("common.yes")}
                        </button>
                        <button
                            id="popup-button-tab"
                            onClick={() => this.noButtonClicked(popupContext)}
                        >
                            {this.props.t("common.no")}
                        </button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return <React.Fragment>{this.popupModal()}</React.Fragment>;

        // } else if (popupContext.activeType === "confirmation") {
        //     return (
        //         <div id="popup">
        //             <h3>Are you sure you want to leave this page?</h3>
        //             <button
        //                 id="popup-button-main"
        //                 className="btn"
        //                 onClick={() => this.yesClicked(popupContext)}
        //             >
        //                 Yes
        //             </button>
        //             <button
        //                 id="popup-button-tab"
        //                 className="btn"
        //                 onClick={() => this.cancelClicked(popupContext)}
        //             >
        //                 Cancel
        //             </button>
        //         </div>
        //     );
        // } else {
        //     return null;
        // }
    }
}

Popup.contextType = PopupContext;
