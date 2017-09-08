import React, { Component } from 'react';
import './CurrencyInputs.css';

const INITIAL_VALUE = 1;

class CurrencyInputs extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: INITIAL_VALUE,
      calcultedValue: '',
      searchTypeLeft: 'eur',
      searchTypeRight: 'rsd'
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      inputValue: INITIAL_VALUE,
      calcultedValue: (INITIAL_VALUE * nextProps.eur).toFixed(2),
      searchTypeLeft: 'eur'
    });
  }

  // CALCULATED REUSABLE FUNCTION
  calc(left, right){
    const { inputValue } = this.state;
    const { eur, usd } = this.props;

    let sameToSame = inputValue;
    let eur_rsd = (inputValue * eur).toFixed(2);
    let eur_usd = (inputValue * (eur / usd)).toFixed(2);
    let usd_rsd = (inputValue * usd).toFixed(2);
    let usd_eur = (inputValue * (usd / eur)).toFixed(2);
    let rsd_eur = (inputValue * (INITIAL_VALUE / eur)).toFixed(2);
    let rsd_usd = (inputValue * (INITIAL_VALUE / usd)).toFixed(2);

    if(left === right) {
      this.setState({calcultedValue: sameToSame}) 
    } else if(left === 'eur' && right === 'rsd'){
      this.setState({calcultedValue: eur_rsd}) 
    } else if(left === 'eur' && right === 'usd'){
      this.setState({calcultedValue: eur_usd}) 
    } else if(left === 'usd' && right === 'rsd') {
      this.setState({calcultedValue: usd_rsd}) 
    } else if(left === 'usd' && right === 'eur') {
      this.setState({calcultedValue: usd_eur}) 
    } else if(left === 'rsd' && right === 'eur') {
      this.setState({calcultedValue: rsd_eur}) 
    } else if(left === 'rsd' && right === 'usd') {
      this.setState({calcultedValue: rsd_usd}) 
    }
  }

  updateLeftSelect(e) {
    this.setState({
      searchTypeLeft: e.target.value,
    });

    const { searchTypeRight } = this.state;
    this.calc(e.target.value, searchTypeRight)
}

  updateRightSelect(e) {
    this.setState({
      searchTypeRight: e.target.value,
    });

    const { searchTypeLeft } = this.state;
    this.calc(searchTypeLeft, e.target.value);
  }

  resetButton(){
    this.setState({
      inputValue: INITIAL_VALUE,
      calcultedValue: (INITIAL_VALUE * this.props.eur).toFixed(2),
      searchTypeLeft: 'eur'
    });
  }

  warning(){
    if(isNaN(this.state.calcultedValue)) {
      return <p className="warning">Please enter a number</p>
    } else {
      return <p className="hide"></p>
    }
  }

  //  SELECT DISABLED FUNCTIONS 
  disableSelectRight(valueLeft){
    if(valueLeft !== this.state.searchTypeLeft) {
      return false;
    }
    return true;
  }
  disableSelectLeft(valueRight){
    if(valueRight !== this.state.searchTypeRight) {
      return false;
    }
    return true;
  }

  render() {
    return(
      <div>
        <section className="row">
        
          <div className="col-md-5 all-currency-inputs">
            <div className="form-group align">
              <select 
                className="styled-select" 
                defaultValue={this.state.searchTypeLeft}
                onChange={this.updateLeftSelect.bind(this)}
              >
                <option value="eur" disabled={this.disableSelectLeft('eur')}> EUR </option>
                <option value="rsd" disabled={this.disableSelectLeft('rsd')}> RSD </option>
                <option value="usd" disabled={this.disableSelectLeft('usd')}> USD </option>
              </select>
            </div>
            <div className="form-group align">
              <input 
                onChange={event => {this.setState({inputValue: event.target.value})}}
                onKeyUp={() => this.calc(this.state.searchTypeLeft, this.state.searchTypeRight)}
                type="text" 
                className="form-control currency-input"
                value={this.state.inputValue}
                />
            </div>

           {this.warning()}
          </div>

          <div className="col-md-2 swap all-currency-inputs"><img src={require('../swap.svg')}  alt="swap" />
          </div>

          <div className="col-md-5 all-currency-inputs">
            <div className="form-group align">
              <select 
                className="styled-select" 
                defaultValue={this.state.searchTypeRight}
                onChange={this.updateRightSelect.bind(this)}
              >
                  <option value="eur" disabled={this.disableSelectRight('eur')}> EUR </option>
                  <option value="rsd" disabled={this.disableSelectRight('rsd')}> RSD </option>
                  <option value="usd" disabled={this.disableSelectRight('usd')}> USD </option>
              </select>
            </div>
            <div className="form-group align">
              <input 
                type="text"
                value={this.state.calcultedValue}
                className="form-control currency-input" 
              />
            </div>
          </div>

        </section>

        <section className="row">
          <button onClick={() => this.resetButton()} className="reset-btn">Reset</button>
        </section>
      </div>
    );
  }
}
export default CurrencyInputs;