import React, { useContext } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./i18n";
import { MyContext, MyContextProvider } from "./components/MyContext";
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
    const state = useContext(MyContext);

    function renderPopup(): JSX.Element {
        console.log("jojo: " + state.isPopupVisible);
        let el = state.isPopupVisible === true ? <Popup /> : null;
        return el;
    }

    return (
        <MyContextProvider>
            {/* <button onClick={() => state.setVisibility(true)}>
                Current Language is: {String(state.isPopupVisible)}
            </button>
            {renderPopup()} */}
            <Popup />
            <Router>
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
        </MyContextProvider>
    );
};

export default App;
