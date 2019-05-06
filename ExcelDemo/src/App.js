import React from 'react';

import TopPage from './TopPage';
import Content from './Content'
import BottomPage from './BottomPage';

class App extends React.Component {


  render(){
    return (
      <div>
        <TopPage />

        <Content />

        <BottomPage />
      </div>
    );
  }
}

export default App;
