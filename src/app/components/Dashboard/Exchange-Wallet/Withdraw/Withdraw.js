import React, {Component} from 'react';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import './Withdraw.css';
import {currencyOptions} from '../../fakeStore';
import {withRouter, Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withAlert} from 'react-alert';
import {withdrawApi} from './WithDraw_Api';
import NotAuthorized from '../../../Dashboard/NotAuthroized';
export class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyArrayForSelect: [],
      selectedCurrency: {},
    };
  }

  componentDidMount = () => {
    withdrawApi.getWithdraw('BTC');
    withdrawApi.getWithdraw('USDT');
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
    console.log('apicollection', this.state.currencyArrayForSelect);
    const {allWithdrawBTC} = this.props.withdraw;
    return (
      <>
        {this.props.profile.profile.enabled_2fa && (
          <div className="main d-flex justify-content-center mt-5">
            {' '}
            <NotAuthorized />
          </div>
        )}
        {!this.props.profile.profile.enabled_2fa && (
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
                            {item.availableBalanceExchange.toFixed(
                              item.toFixed,
                            )}
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
                  {allWithdrawBTC &&
                    allWithdrawBTC.map((item, index) => {
                      return (
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
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  withdraw: state.withdraw,
  profile: state.profile,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {}),
  withRouter,
)(Withdraw);
