import * as React from "react";
import * as ReactDOM from "react-dom";
import "../src/styles/main.less";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const browserslist = require("browserslist");

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();

browserslist.clearCaches();
