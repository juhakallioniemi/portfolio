import * as React from "react";
import { TFunction, i18n } from "i18next";
import axios from "axios";
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
                data: "",
                class: ""
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
            if (data[0].id) {
                localStorage.setItem(
                    "loginInfo",
                    JSON.stringify({
                        username: username,
                        timeStamp: new Date().getTime()
                    })
                );
                this.props.setLoginState(true);
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
                        data: this.props.t(
                            "login.account-created-successfully"
                        ),
                        class: "success"
                    }
                });
            } else if (response.data === "ER_DUP_ENTRY") {
                this.setState({
                    apiResponse: {
                        data: this.props.t("login.username-exists"),
                        class: "error"
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

    handleUsernameChange(e: any) {
        this.setState({ username: e.target.value });
    }
    handlePasswordChange(e: any) {
        this.setState({ password: e.target.value });
    }
    handleEmailChange(e: any) {
        this.setState({ email: e.target.value });
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

    logOut = (e: any) => {
        localStorage.removeItem("loginInfo");
        this.props.setLoginState(false);
    };

    formHeaderClick(id: string) {
        if (id !== "login-header") {
            this.setState({
                isCreateAccountForm: true
            });
        } else {
            this.setState({ isCreateAccountForm: false });
        }
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
                    onChange={(e: any) => this.handleEmailChange(e)}
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
                        onChange={(e: any) => this.handleUsernameChange(e)}
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
                        onChange={(e: any) => this.handlePasswordChange(e)}
                        required
                    />
                    <label htmlFor="password">
                        {this.props.t("login.password")}
                    </label>
                </div>
                <React.Fragment>{emailField}</React.Fragment>
                <button type="submit" className="form-submit-button">
                    {!this.state.isCreateAccountForm
                        ? this.props.t("login.log-in")
                        : this.props.t("login.create")}
                </button>
                <div id="api-response" className={this.state.apiResponse.class}>
                    {this.state.apiResponse.data}
                </div>
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
                        className="button"
                        onClick={(e: any) => this.logOut(e)}
                    >
                        {this.props.t("login.log-out")}
                    </button>
                </div>
            );
        }
    }
}
