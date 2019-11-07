import * as React from "react";
import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n";
import { PopupContextProvider } from "./context/PopupContext";
import { Popup } from "./components/Popup";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [initialized, setInitialized] = useState(false);
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    if (!initialized) {
        changeLanguage(localStorage.getItem("lang") || "en");
        setInitialized(true);
    }

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
                                {...props}
                            />
                        )}
                    />
                </header>
                <main>
                    <Route
                        component={(props: any) => (
                            <Main t={t} i18n={i18n} {...props} />
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
