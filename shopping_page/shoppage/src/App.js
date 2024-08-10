import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import EventSlide from './components/EventSlide';
import ShopHomepage from './components/ShopHomepage';
import Food from './components/Food';
import CheckBill from './components/CheckBill';
import ShoppingCart from './components/ShoppingCart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/Test" component={ShoppingCart} exact />

            <Route path="/" component={EventSlide} exact />
            <Route path="/Shop" component={ShopHomepage} exact />
            <Route path="/Shop/Food" component={Food} exact />
            <Route path="/Shop/CheckBill" component={CheckBill} exact />

            {/* <Route path="/Todo/Create" component={TodoCreate} /> */}
            {/* <Route path="/Todo/Edit/:id" component={TodoEdit} /> */}
            {/* <Route path="/Todo/Delete/:id" component={TodoDelete} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
