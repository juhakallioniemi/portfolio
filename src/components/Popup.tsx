import React, { useContext } from "react";
import { TFunction, i18n } from "i18next";
import { MyContext, MyContextProvider } from "./MyContext";

interface FooterProps {
    isPopupVisible?: boolean;
    t?: TFunction;
    i18n?: i18n;
}

interface MyContextInteface {
    isPopupVisible: boolean;
    setVisibility: (isPopupVisible: boolean) => {};
}

export class Popup extends React.Component<FooterProps, {}> {
    // state = useContext(MyContext);
    // renderPopup(): JSX.Element {
    //     console.log("jojo: " + this.state.isPopupVisible);
    //     let el = this.state.isPopupVisible === true ? <Popup /> : null;
    //     return el;
    // }

    render() {
        let myContext: MyContextInteface = this.context;
        if (myContext.isPopupVisible) {
            return (
                <div id="popup">
                    <h3>
                        You can open the project in the main window or in a new
                        tab
                    </h3>
                    <button className="btn">Main</button>
                    <button className="btn">Tab</button>
                </div>
            );
        } else {
            return null;
        }
    }
}

Popup.contextType = MyContext;
