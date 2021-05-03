import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import UserSearchPage from "./components/UserSearchPage";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user/:username">
          <UserProfilePage />
        </Route>
        <Route path="/">
          <UserSearchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
