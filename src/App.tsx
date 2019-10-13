import * as React from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";

const App: React.FC = () => {
    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <Home compiler="TypeScript" framework="React" />
            <footer>Created by Juha Kallioniemi</footer>
        </React.Fragment>
    );
};

export default App;
