import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import {currencyOptions} from '../../fakeStore';
import './deposits.css';

export class Deposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyArrayForSelect: [],
    };
  }

  componentDidMount = () => {
    let currencyArrayForSelect = this.currencyKeys.map((key) => ({
      ...currencyOptions[key],
    }));
    this.setState({currencyArrayForSelect});
  };

  currencyKeys = Object.keys(currencyOptions);

  handleSelect = (item) => {
    this.props.history.push(item.depositPath());
  };

  render() {
    return (
      <>
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
              })}{' '}
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
                <h3>Deposit History</h3>
              </div>
              <div className="a5-table d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Deposit</th>
                      <th>Deposit History</th>
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

export default withRouter(Deposit);
