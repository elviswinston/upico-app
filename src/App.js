import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Account from "./pages/account/Account";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/:username" component={Profile} />
        <PrivateRoute exact path="/accounts/edit" component={Account} />
      </Switch>
    </Router>
  );
}

export default App;
