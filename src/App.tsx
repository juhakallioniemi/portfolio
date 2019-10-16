import * as React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./i18n";

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
        <Router>
            <header>
                <Route
                    component={(props: any) => (
                        <Header t={t} i18n={i18n} {...props} />
                    )}
                />
            </header>
            <footer>
                <Route component={() => <Footer t={t} i18n={i18n} />} />
            </footer>
        </Router>
    );
};

export default App;
