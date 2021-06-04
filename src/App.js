import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Account from "./pages/account/Account";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

import PrivateRoute from "./components/PrivateRoute";

import ProfileProvider from "./pages/profile/reducer/profileReducer";

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/:username" component={Profile} />
          <PrivateRoute exact path="/accounts/edit" component={Account} />
        </Switch>
      </Router>
    </ProfileProvider>
  );
}

export default App;
