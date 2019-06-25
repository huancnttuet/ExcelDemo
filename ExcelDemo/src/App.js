import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import TopPage from './TopPage';
import Content from './Content'
import BottomPage from './BottomPage';
import ListData from './ListData';

class App extends React.Component {


  render(){
    return (
      <div>
        <TopPage />
          <Router>
            <Route exact path="/" component={Content} />
            <Route path="/list" component={ListData} />
          </Router>
      

        <BottomPage />
      </div>
    );
  }
}

export default App;
