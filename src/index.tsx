import * as React from "react";
import * as ReactDOM from "react-dom";
import "../src/styles/main.less";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as browserslist from "browserslist";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();

browserslist.clearCaches();
