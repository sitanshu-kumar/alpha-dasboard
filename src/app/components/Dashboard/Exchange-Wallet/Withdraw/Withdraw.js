import React, {Component} from 'react';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import './Withdraw.css';
import {currencyOptions} from '../../fakeStore';

export class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyArrayForSelect: [],
      selectedCurrency: {},
    };
  }

  componentDidMount = () => {
    const {heading, routes, location} = this.props;
    const BTC = routes[4].layout + routes[4].path;
    const USDT = routes[5].layout + routes[5].path;

    let currencyArrayForSelect = this.currencyKeysArray.map((key) => ({
      ...currencyOptions[key],
    }));

    this.setState({currencyArrayForSelect});
  };

  currencyKeysArray = Object.keys(currencyOptions);

  handleSelect = (item) => {
    this.props.history.push(item.withdrawPath());
  };

  render() {
    const {heading, routes} = this.props;
    return (
      <>
        {/* <div className="containment">
          <div className="balances">
            <h3>Withdraw</h3>
            <hr />
            <div className="left-sided  d-flex flex-wrap">
              {this.currencyKeysArray.map((key, index) => {
                let currency = currencyOptions[key];
                return (
                  <div
                    onClick={() => this.handleSelect(currency)}
                    key={index}
                    className="show-total coin-holder "
                  >
                    <div className="coin-holder-details">
                      <img className="logo" src={currency.imgSrc()} />
                      <h4>{currency.fullName}</h4>
                    </div>
                    <p className="available-balance">
                      <span>Avl</span>{' '}
                      {currency.availableBalanceExchange.toFixed(
                        currency.toFixed,
                      )}
                    </p>
                  </div>
                );
              })}
            </div>{' '}
            <div className="left-sided">
              <div className="a5-form-field mt-5">
                <A5DBSelect
                  itemList={this.state.currencyArrayForSelect}
                  placeholder={'Select...'}
                  onChange={(item) => {
                    this.handleSelect(item);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="balances mt-2">
            <div className="table-container contained deposits pb-3">
              <div className="table-header">
                <h3>WithDrawal History</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Withdrawal</th>
                      <th>Withdrawal History</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTC</td>
                      <td>0.000</td>
                      <td>0.000</td>
                    </tr>
                    <tr>
                      <td>USDT</td>
                      <td>0.000</td>
                      <td>0.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
        <div className="main">
          <div className="main-header">
            <h3>Exchange Wallet</h3>
            <div className="main-sub-header">
              <h3>Deposit</h3>
              <hr />
            </div>
          </div>
          <div className="main-body">
            <div className="coin-collection">
              {this.state.currencyArrayForSelect.map((item, i) => {
                return (
                  <div
                    onClick={() => this.handleSelect(item)}
                    className="coin-holder d-flex"
                  >
                    <img src={item.imgSrc()} />
                    <div className="d-flex flex-column">
                      <h2>{item.fullName}</h2>
                      <div className="avl-bal">
                        <span>Avl Bal</span>{' '}
                        <span>
                          {' '}
                          {item.availableBalanceExchange.toFixed(item.toFixed)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="a5-login-field standalone-select">
              <A5DBSelect
                itemList={this.state.currencyArrayForSelect}
                placeholder={'Select...'}
                onChange={(item) => {
                  this.handleSelect(item);
                }}
              />
            </div>
            <div className="table-container deposit-history w-80 mt-5">
              <div className="table-header">
                <h3>Withdrawal History</h3>
              </div>
              <div className="a5-table d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Withdrawal</th>
                      <th>Withdrawal History</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>USDT</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                    </tr>
                    <tr>
                      <td>BTC</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Withdraw;
