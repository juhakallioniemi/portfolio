import * as React from "react";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    // const changeLanguage = (lang: any) => {
    //     i18n.changeLanguage(lang);
    // };

    return (
        <Router>
            <header>
                <Route
                    component={(props: any) => (
                        <Header t={t} i18n={i18n} {...props} />
                    )}
                />
            </header>
            <footer>Created by Juha Kallioniemi</footer>
        </Router>
    );
};

export default App;
