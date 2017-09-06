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

  componentWillReceiveProps(nextProps) {
    switch(this.state.searchTypeLeft) {
      case 'eur':
        this.setState({
          //nextProps = this.props.eur
          calcultedValue: (INITIAL_VALUE * nextProps.eur).toFixed(2)
        });
        break;
      case 'usd':
        this.setState({
          calcultedValue: (INITIAL_VALUE * nextProps.usd).toFixed(2)
        });
        break;
      case 'rsd':
        this.setState({
          calcultedValue: INITIAL_VALUE * 1
        });
        break;
      default:
        return null
    }
  }
  
  calc() {
    let eurToRsd = (this.state.inputValue * this.props.eur).toFixed(2);
    let usdToRsd = (this.state.inputValue * this.props.usd).toFixed(2);
    let rsdToRsd = this.state.inputValue * 1;

    switch(this.state.searchTypeLeft) {
      case 'eur':
        this.setState({
          calcultedValue: eurToRsd
        });
        break;
      case 'usd':
        this.setState({
          calcultedValue: usdToRsd
        });
        break;
      case 'rsd':
        this.setState({
          calcultedValue: rsdToRsd
        });
        break;
      default:
        return null
    }

  }

  updateLeftSelect(e) {
    let usd = (this.state.inputValue * this.props.usd).toFixed(2);
    let eur = (this.state.inputValue * this.props.eur).toFixed(2);
    let rsd = (this.state.inputValue * INITIAL_VALUE).toFixed(2);

    this.setState({
      searchTypeLeft: e.target.value,
      inputValue: this.state.inputValue
    });

    if(e.target.value === 'eur') {
      this.setState({
        calcultedValue: eur
      });
    } else if(e.target.value === 'usd') {
      this.setState({
        calcultedValue: usd
      });
    } else if(e.target.value === 'rsd') {
      this.setState({
        calcultedValue: rsd
      });
  }
}

updateRightSelect(e) {
  this.setState({
    searchTypeRight: e.target.value,
  });
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
        <section className="row col-md-12">

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
                onKeyUp={() => this.calc()}
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
                onChange={() => null}
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