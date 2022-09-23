import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import SubmissionForm from "./SubmissionForm";
import "./App.css";

const App = () => (
  <div className="App">
    <AmplifySignOut />
    <h1 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      Encryption Service
    </h1>
    <SubmissionForm />
  </div>
);
export default withAuthenticator(App);
