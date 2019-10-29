import React, { useContext } from "react";
import { TFunction, i18n } from "i18next";
import { History, LocationState } from "history";
import { Popup } from "./Popup";
import * as ReactDOM from "react-dom";
import { MyContext, MyContextProvider } from "./MyContext";

const appEnvironment = process.env.NODE_ENV;
const brandGameUrl =
    appEnvironment === "production"
        ? "brand-game/index.html"
        : "docs/brand-game/index.html";

interface ProjectProps {
    projectName?: string;
    clickedProject?: any;
    t?: TFunction;
    i18n?: i18n;
    history?: History<LocationState>;
    isProjectActive?: boolean;
}

interface ProjectState {
    projectInfo: string;
    isPopupVisible: boolean;
    setPopupVisibility: any;
}

interface MyContextInteface {
    isPopupVisible: boolean;
    setVisibility: (isPopupVisible: boolean) => {};
}

export class Project extends React.Component<ProjectProps, ProjectState> {
    constructor(props: any) {
        super(props);
        this.state = {
            projectInfo: this.props.projectName,
            isPopupVisible: false,
            setPopupVisibility: null
        };
    }

    // context = useContext(MyContext);

    openProject = () => {
        if (this.props.projectName === this.props.t("projects.brand-game")) {
            this.props.history.push(location.hash + "/" + "Brand-game");
            let myContext: MyContextInteface = this.context;
            myContext.setVisibility(true);
            // <MyContextProvider value={this.valleros}></MyContextProvider>;
        } else {
            this.setState({
                projectInfo: this.props.t("main.noContent")
            });
        }
    };

    // setVisibility = (isPopupVisible: boolean) => {
    //     this.setState({ isPopupVisible });
    // };

    // valleros = {
    //     isPopupVisible: true,
    //     setVisibility: this.setVisibility
    // };

    render() {
        if (this.props.isProjectActive) {
            return (
                <React.Fragment>
                    <object
                        className="active-project"
                        type="text/html"
                        data={brandGameUrl}
                    ></object>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {/* <MyContextProvider>
                        <button
                            onClick={() => this.valleros.setVisibility(true)}
                        >
                            Current Language is:
                            {String(this.state.isPopupVisible)}
                        </button>
                    </MyContextProvider> */}
                    <div className="project" onClick={this.openProject}>
                        <div className="project-content">
                            {this.state.projectInfo}
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

Project.contextType = MyContext;
