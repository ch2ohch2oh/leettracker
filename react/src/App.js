import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

import HomePage from "./components/HomePage";
import UserProfilePage from "./components/UserProfilePage";
import ExplorePage from "./components/ExplorePage";
import CssBaseline from "@material-ui/core/CssBaseline";

import SimpleAppBar from "./components/SimpleAppBar";

function App() {
  return (
    <Router>
      {console.log("env:", process.env.NODE_ENV)}
      <CssBaseline />
      <SimpleAppBar />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/user/:username">
            <UserProfilePage />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
