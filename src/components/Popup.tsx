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
    text: string;
}

export class Popup extends React.Component<PopupProps, PopupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: ""
        };
    }

    modalButton(id: string, value: string, className?: string): JSX.Element {
        let popupContext: PopupContext = this.context;
        return (
            <button
                id={id}
                type="button"
                className={className}
                onClick={(e: any) => this.buttonClicked(e, popupContext)}
            >
                {value !== "" ? this.props.t(value) : <span>&times;</span>}
            </button>
        );
    }

    buttonClicked = (e: any, popupContext: PopupContext) => {
        switch (e.target.id) {
            case "close":
                this.setState({
                    text: ""
                });
                popupContext.setContext(""); // Closes popup.
                break;
            case "popup-no":
                popupContext.setContext("");
                break;
            case "main-view":
                this.props.history.push(popupContext.locationHash);
                popupContext.setContext("");
                break;
            case "new-tab":
                window.open(popupContext.redirectUrl, "_blank");
                popupContext.setContext("");
                break;
            case "popup-yes":
                this.props.history.push(popupContext.redirectUrl);
                popupContext.setContext("");
                break;
            case "send":
                this.sendMail();
                break;
        }
    };

    sendMail() {
        let inputElement = document.getElementById("email") as HTMLInputElement;
        if (inputElement.value === "") {
            this.setState({
                text: this.props.t("popup.forgotten-credentials.empty")
            });
        } else {
            //axios
        }

        //if not found
    }

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
        } else if (popupContext.activeType === "forgotten-credentials") {
            return (
                <div id="popup">
                    <div className="popup-info">
                        {this.modalButton("close", "", "close popup-close")}
                    </div>
                    <h4 className="popup-subtitle">
                        {this.props.t("popup.forgotten-credentials.subtitle")}
                    </h4>
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder={this.props.t("login.email")}
                        autoComplete="off"
                    ></input>
                    <p className="popup-text">{this.state.text}</p>
                    <div className="button-container">
                        {this.modalButton("send", this.props.t("common.send"))}
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
