import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./index.css";

Amplify.configure(awsExports);
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
