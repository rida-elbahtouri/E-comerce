import React from 'react';
import './App.css';
import ShowProducts from './Component/Products/showProducts';

class App extends React.Component {
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
        <ShowProducts />
      </header>
    </div>
  );
  }
}

export default App;
