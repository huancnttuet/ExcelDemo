import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import TopPage from './TopPage';
import Content from './Content'
import BottomPage from './BottomPage';
import ListData from './ListData';
import Details from './Details';
class App extends React.Component {


  render(){
    return (
      <div>
        <TopPage />
          <Router>
            <Route exact path="/" component={Content} />
            <Route path="/list" component={ListData} />
            <Route path="/details" component={Details} />
          </Router>
      

        <BottomPage />
      </div>
    );
  }
}

export default App;
