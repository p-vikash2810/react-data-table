// App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import TableOne from "./components/TableOne";
import TableTwo from "./components/TableTwo";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={TableOne} />
          <Route exact path="/second" component={TableTwo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
