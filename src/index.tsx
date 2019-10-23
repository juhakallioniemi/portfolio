import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../src/styles/less/main.less";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
