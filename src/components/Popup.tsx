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

    modalButton(id: string, value: string, className?: string): JSX.Element {
        let popupContext: PopupContext = this.context;
        return (
            <button
                id={id}
                type="button"
                className={className}
                onClick={(e: any) =>
                    this.buttonClicked(e.target.id, popupContext)
                }
            >
                {value !== "" ? this.props.t(value) : <span>&times;</span>}
            </button>
        );
    }

    buttonClicked = (id: string, popupContext: PopupContext) => {
        switch (id) {
            case "close" || "popup-no":
                break;
            case "main-view":
                this.props.history.push(popupContext.locationHash);
                break;
            case "new-tab":
                window.open(popupContext.redirectUrl, "_blank");
                break;
            case "popup-yes":
                this.props.history.push(popupContext.redirectUrl);
                break;
        }
        popupContext.setContext("");
    };

    popupModal(): JSX.Element {
        let popupContext: PopupContext = this.context;
        if (popupContext.activeType === "project")
            return (
                <div id="popup">
                    <div className="popup-info">
                        {this.modalButton("close", "", "close popup-close")}
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
                        {this.modalButton(
                            "main-view",
                            this.props.t("popup.project.main-view")
                        )}
                        {this.modalButton(
                            "new-tab",
                            this.props.t("popup.project.new-tab")
                        )}
                    </div>
                </div>
            );
        else if (popupContext.activeType === "confirmation") {
            return (
                <div id="popup">
                    <div className="popup-info">
                        {this.modalButton("close", "", "close popup-close")}
                    </div>
                    <h3 className="popup-title">
                        {this.props.t("popup.confirmation.title")}
                    </h3>
                    <h4 className="popup-subtitle">
                        {this.props.t("popup.confirmation.subtitle")}
                    </h4>
                    <div className="button-container">
                        {this.modalButton(
                            "popup-yes",
                            this.props.t("common.yes")
                        )}
                        {this.modalButton(
                            "popup-no",
                            this.props.t("common.no")
                        )}
                    </div>
                </div>
            );
        }
    }

    render() {
        return <React.Fragment>{this.popupModal()}</React.Fragment>;
    }
}

Popup.contextType = PopupContext;
