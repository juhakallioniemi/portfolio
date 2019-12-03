import * as React from "react";
import { TFunction, i18n } from "i18next";
import axios from "axios";
import { TextExpire } from "./TextExpire";
import { PopupContext } from "../context/PopupContext";
const appsettings: AppSettings = require("appsettings");

export interface LoginProps {
    t: TFunction;
    i18n: i18n;
    setLoginState: any;
}

export interface LoginState {
    username: string;
    password: string;
    email: string;
    isLoggedIn: boolean;
    loginInfo: LoginInfo;
    apiResponse: ApiResponse;
    isCreateAccountForm: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
    isComponentMounted: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            loginInfo: JSON.parse(localStorage.getItem("loginInfo")),
            isLoggedIn: false,
            apiResponse: {
                text: "",
                type: ""
            },
            isCreateAccountForm: false
        };
    }

    async apiLogin(username: string, password: string) {
        try {
            const response = await axios.post("/login", {
                username: username,
                password: password
            });
            let { data } = response;
            if (data[0].username) {
                localStorage.setItem(
                    "loginInfo",
                    JSON.stringify({
                        username: username,
                        timeStamp: new Date().getTime()
                    })
                );
                this.props.setLoginState(true);
            } else {
                this.setState({
                    apiResponse: {
                        text: this.props.t("login.not-found"),
                        type: "error"
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async apiCreateAccount(username: string, password: string, email?: string) {
        try {
            const response = await axios.post("/create", {
                username: username,
                password: password,
                email: email
            });
            if (response.data.affectedRows >= 1) {
                this.setState({
                    isCreateAccountForm: false,
                    username: "",
                    password: "",
                    email: "",
                    apiResponse: {
                        text: this.props.t(
                            "login.account-created-successfully"
                        ),
                        type: "success"
                    }
                });
            } else if (response.data === "ER_DUP_ENTRY") {
                this.setState({
                    apiResponse: {
                        text: this.props.t("login.username-exists"),
                        type: "error"
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.isComponentMounted = true;

        if (this.state.loginInfo) {
            this.setState({
                isLoggedIn: true
            });
        }
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    formInputHandler(e: any) {
        // This allows better localization for invalid email message.
        if (!e.target.validity.typeMismatch) e.target.setCustomValidity("");

        if (e.target.id === "username") {
            this.setState({
                username: e.target.value
            });
        } else if (e.target.id === "password") {
            this.setState({
                password: e.target.value
            });
        } else if (e.target.id === "email") {
            this.setState({
                email: e.target.value
            });
        }

        this.setState({
            apiResponse: {
                text: "",
                type: ""
            }
        });
    }

    loginHandler = (e: any) => {
        e.preventDefault();

        if (!this.state.isCreateAccountForm) {
            this.apiLogin(this.state.username, this.state.password);
        } else {
            this.apiCreateAccount(
                this.state.username,
                this.state.password,
                this.state.email
            );
        }
    };

    invalidMessage = ({ target }: any) => {
        const message = target.dataset.message;
        target.setCustomValidity(message);
    };

    logOut = (e: any) => {
        localStorage.removeItem("loginInfo");
        this.props.setLoginState(false);
    };

    forgotCredentials() {
        let popupContext: PopupContext = this.context;
        popupContext.setContext(popupContext.popupType.forgottenCredentials);
    }

    forgotCredentialsButton(): JSX.Element {
        if (!this.state.isCreateAccountForm) {
            return (
                <div className="form-group">
                    <button
                        type="button"
                        className="forgotten link-look-alike"
                        onClick={() => this.forgotCredentials()}
                    >
                        Forgot login credentials?
                    </button>
                </div>
            );
        }
        return null;
    }

    formHeaderClick(id: string) {
        if (id !== "login-header") {
            this.setState({
                isCreateAccountForm: true
            });
        } else {
            this.setState({ isCreateAccountForm: false });
        }
        this.setState({
            apiResponse: {
                text: "",
                type: ""
            }
        });
    }

    formHeader(): JSX.Element {
        return (
            <React.Fragment>
                <div
                    id="login-header"
                    className={this.state.isCreateAccountForm ? "" : "active"}
                    onClick={(e: any) => this.formHeaderClick(e.target.id)}
                >
                    {this.props.t("login.login")}
                </div>
                <div
                    id="create-account-header"
                    className={this.state.isCreateAccountForm ? "active" : ""}
                    onClick={(e: any) => this.formHeaderClick(e.target.id)}
                >
                    {this.props.t("login.create-account")}
                </div>
            </React.Fragment>
        );
    }

    formBody(): JSX.Element {
        let emailField: JSX.Element = this.state.isCreateAccountForm ? (
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder={this.props.t("login.email")}
                    value={this.state.email}
                    onChange={(e: any) => this.formInputHandler(e)}
                    data-message={this.props.t("login.invalid.email")}
                    onInvalid={(e: any) => this.invalidMessage(e)}
                    autoComplete="off"
                    title={this.props.t("login.email-title")}
                />
                <label htmlFor="email">{this.props.t("login.email")}</label>
            </div>
        ) : null;
        return (
            <div className="form-body">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder={this.props.t("login.username")}
                        value={this.state.username}
                        onChange={(e: any) => this.formInputHandler(e)}
                        data-message={this.props.t("login.invalid.username")}
                        onInvalid={(e: any) => this.invalidMessage(e)}
                        autoComplete="off"
                        title={this.props.t("login.required")}
                        required
                    />
                    <label htmlFor="username">
                        {this.props.t("login.username")}
                    </label>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder={this.props.t("login.password")}
                        value={this.state.password}
                        onChange={(e: any) => this.formInputHandler(e)}
                        data-message={this.props.t("login.invalid.password")}
                        onInvalid={(e: any) => this.invalidMessage(e)}
                        autoComplete="off"
                        title={this.props.t("login.required")}
                        required
                    />
                    <label htmlFor="password">
                        {this.props.t("login.password")}
                    </label>
                </div>
                <React.Fragment>{emailField}</React.Fragment>
                {/* <React.Fragment>
                    {this.forgotCredentialsButton()}
                </React.Fragment> */}
                <button type="submit" className="form-submit-button">
                    {!this.state.isCreateAccountForm
                        ? this.props.t("login.log-in")
                        : this.props.t("login.create")}
                </button>
                <TextExpire
                    text={this.state.apiResponse.text}
                    type={this.state.apiResponse.type}
                    delay={5000}
                />
            </div>
        );
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <form
                    className="login-form"
                    onSubmit={(e: any) => this.loginHandler(e)}
                >
                    {this.formHeader()}
                    {this.formBody()}
                </form>
            );
        } else {
            return (
                <div className="no-content">
                    {this.props.t("login.logged-in")}
                    {
                        <span style={{ color: "#FFF" }}>
                            {": " + this.state.loginInfo.username}
                        </span>
                    }
                    <button
                        className="button logout"
                        onClick={(e: any) => this.logOut(e)}
                    >
                        {this.props.t("login.log-out")}
                    </button>
                </div>
            );
        }
    }
}

Login.contextType = PopupContext;
