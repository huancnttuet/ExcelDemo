import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TopPage from "./components/layout/TopPage";
import Content from "./components/excel/Content";
import BottomPage from "./components/layout/BottomPage";
import ListData from "./components/excel/ListData";
import Details from "./components/excel/Details";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import ForgottenAcc from "./components/user/ForgottenAcc";
import ChangePwd from "./components/user/ChangePwd";
import History from "./components/excel/History";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <TopPage />
          <Route exact path="/" component={Content} />
          <Route path="/history" component={History} />
          <Route path="/list" component={ListData} />
          <Route path="/details" component={Details} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/changepwd" component={ChangePwd} />
          <Route path="/forgottenacc" component={ForgottenAcc} />
        </Router>

        <BottomPage />
      </div>
    );
  }
}

export default App;
