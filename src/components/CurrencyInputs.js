import React, { Component } from 'react';
import './CurrencyInputs.css';

const INITIAL_VALUE = 1;

class CurrencyInputs extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: INITIAL_VALUE,
      calcultedValue: '',
      searchType: 'eur'
    }
  }

  componentWillReceiveProps(nextProps) {
    switch(this.state.searchType) {
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

    switch(this.state.searchType) {
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

  updateSelect(e) {
    let usd = (this.state.inputValue * this.props.usd).toFixed(2);
    let eur = (this.state.inputValue * this.props.eur).toFixed(2);
    let rsd = (this.state.inputValue * INITIAL_VALUE).toFixed(2);

    this.setState({
      searchType: e.target.value,
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

  test(){
    let x;
    switch(this.state.searchType) {
      case 'eur':
        x = (this.state.inputValue * this.props.eur).toFixed(2);
        break;
      case 'usd':
        x = (this.state.inputValue * this.props.usd).toFixed(2);
        break;
      case 'rsd':
        x = (this.state.inputValue * INITIAL_VALUE).toFixed(2);
        break;
      default:
        return x
    }
    return x
  }

  resetButton(){
    this.setState({
      inputValue: INITIAL_VALUE,
      calcultedValue: (INITIAL_VALUE * this.props.eur).toFixed(2),
      searchType: 'eur'
    });
  }

  warning(){
    if(isNaN(this.state.calcultedValue)) {
      return <p className="warning">Please enter a number</p>
    } else {
      return <p className="hide"></p>
    }
  }

  render() {

    return(
      <div>
        <section className="row col-md-12">

          <div className="col-md-5 all-currency-inputs">
            <div className="form-group align">
              <select 
                className="styled-select" 
                defaultValue="EUR"
                onChange={this.updateSelect.bind(this)}
              >
                <option value="eur">EUR</option>
                <option value="rsd">RSD</option>
                <option value="usd">USD</option>
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
              <select className="styled-select" defaultValue="RSD">
                <option>EUR</option>
                <option>RSD</option>
                <option>USD</option>
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