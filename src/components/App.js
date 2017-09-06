import React, { Component } from 'react';
import './App.css';

import CurrencyService from './Service';
import CurrencyInputs from './CurrencyInputs';

class App extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
      eur: {},
      usd: {}
    }
  }

  componentDidMount() {
    CurrencyService.getAllData().then(response => {
      this.setState({
        date: response.data.result.date,
        eur: response.data.result.eur,
        usd: response.data.result.usd,
      });
    });
  }

  render() {
    return (
      <div className="App container">
        <h1>Currency Converter</h1>
        <p>On day: {this.state.date}. </p>

        <CurrencyInputs 
          eur={this.state.eur.sre}
          usd={this.state.usd.sre}
        />
 
      </div>
    );
  }
}

export default App;
