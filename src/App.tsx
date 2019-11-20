import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PopupContextProvider } from "./context/PopupContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { Popup } from "./components/Popup";
import { useTranslation } from "react-i18next";
import "./i18n";
import axios from "axios";

const appsettings: AppSettings = require("appsettings");

axios.defaults.baseURL = appsettings.apiUrl;

var isLangChanged = false;

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [initialized, setInitialized] = useState(false);
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);

        // Prevents loginTimeOut on lang change.
        if (initialized) isLangChanged = true;
    };
    if (!initialized) {
        changeLanguage(localStorage.getItem("lang") || "en");
        setInitialized(true);
    }

    var loginInfo: LoginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    const [loggedIn, setLoggedIn] = useState(false);
    const setLoginState = (value: boolean) => {
        setLoggedIn(value);
    };

    if (loginInfo && !loggedIn) setLoggedIn(true);

    useEffect(() => {
        loginTimeOut();
    });

    const loginTimeOut = () => {
        if (loginInfo && !isLangChanged) {
            let timeSinceLogin = new Date().getTime() - loginInfo.timeStamp;
            let minutes = Math.floor(timeSinceLogin / 1000 / 60);
            if (minutes >= 1) {
                localStorage.removeItem("loginInfo");
                setLoginState(false);
            }
        }
    };

    return (
        <PopupContextProvider>
            <Router>
                <Route
                    component={(props: any) => (
                        <Popup t={t} i18n={i18n} {...props} />
                    )}
                />
                <header>
                    <Route
                        component={(props: any) => (
                            <Header
                                t={t}
                                i18n={i18n}
                                changeLanguage={changeLanguage}
                                loginInfo={loginInfo}
                                {...props}
                            />
                        )}
                    />
                </header>
                <main>
                    <Route
                        component={(props: any) => (
                            <Main
                                t={t}
                                i18n={i18n}
                                setLoginState={setLoginState}
                                {...props}
                            />
                        )}
                    />
                </main>
                <footer>
                    <Route component={() => <Footer t={t} i18n={i18n} />} />
                </footer>
            </Router>
        </PopupContextProvider>
    );
};

export default App;
