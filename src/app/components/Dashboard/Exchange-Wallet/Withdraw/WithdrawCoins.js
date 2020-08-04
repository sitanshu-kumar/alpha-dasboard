import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import {currencyOptions} from '../../fakeStore';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withAlert} from 'react-alert';
import './Withdraw.css';

class WithdrawCoins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyArrayForSelect: [],
      selectedCurrency: '',
      fundsInsufficientBy: 0,
      insufficientFundsError: false,
      amountRequired: false,
      addressRequired: false,
    };
  }

  componentDidMount = () => {
    const {heading, routes, location} = this.props;
    const BTC = routes[4].layout + routes[4].path;
    const USDT = routes[5].layout + routes[5].path;

    let currencyArrayForSelect = this.currencyKeysArray.map((key) => ({
      ...currencyOptions[key],
    }));

    console.log(location);
    switch (location.pathname) {
      case BTC:
        this.setState({
          currencyArrayForSelect,
          selectedCurrency: currencyOptions['BTC'],
        });
        break;

      case USDT:
        this.setState({
          currencyArrayForSelect,
          selectedCurrency: currencyOptions['USDT'],
        });
        break;
    }
  };

  amountRef = React.createRef();

  getAmountError = () => {
    return this.state.amountRequired ? (
      <span className="a5-login-error">Amount Required !</span>
    ) : this.state.insufficientFundsError ? (
      <span className="a5-login-error">Insufficient Funds !</span>
    ) : (
      <></>
    );
  };

  getAddressError = () => {
    return this.state.addressRequired ? (
      <span className="a5-login-error">Address Required !</span>
    ) : (
      <></>
    );
  };

  addressInputHandler = (e) => {
    if (!e.target.value) {
      this.setState({addressRequired: true});
    } else {
      this.setState({addressRequired: false});
    }
  };

  amountInputHandler = (e) => {
    let val = e.target.value;
    let slctdCurr = this.state.selectedCurrency;
    let amount = parseFloat(e.target.value);
    let avlBal = slctdCurr.availableBalanceExchange;
    // avoid exponentials
    if (e.target.value.indexOf('e') != -1)
      this.amountRef.current.value = amount.toFixed(slctdCurr.toFixed);
    // amount required
    if (!amount) {
      this.setState({amountRequired: true, insufficientFundsError: false});
    }
    //  insufficient funds
    else if (amount > avlBal) {
      this.setState({amountRequired: false, insufficientFundsError: true});
    }
    // everything fine with funds
    else {
      this.setState({amountRequired: false, insufficientFundsError: false});
    }
  };

  currencyKeysArray = Object.keys(currencyOptions);

  handleSelect = (item) => {
    this.props.history.push(item.withdrawPath());
  };

  render() {
    const {heading, routes, location} = this.props;
    const BTC = routes[4].layout + routes[4].path;
    const USDT = routes[5].layout + routes[5].path;
    const slctdCurr = this.state.selectedCurrency;
    const {allWithdrawBTC, allWithdrawUSDT} = this.props.withdraw;
    return (
      <>
        <div className="main">
          <div className="main-header">
            <h3>Account & Preferences</h3>
            <div className="main-sub-header">
              <h3>Withdraw Coin</h3>
              <hr />
            </div>
          </div>
          <div className="main-body">
            <div className="withdrwal-form-holder">
              <div className="form-body white-bg">
                <h3>Withdrawal Details</h3>
                <div className="form-container">
                  <div className="a5-login-field">
                    <A5DBSelect
                      itemList={this.state.currencyArrayForSelect}
                      placeholder={'Select Currency'}
                      defaultValue={slctdCurr}
                      onChange={(item) => {
                        this.handleSelect(item);
                      }}
                    />
                  </div>
                  <div className="a5-login-field">
                    <input
                      placeholder="Address"
                      onInput={this.addressInputHandler}
                      type="text"
                    />
                    {this.getAddressError()}
                  </div>
                  <div className="a5-login-field">
                    <input
                      onInput={this.amountInputHandler}
                      min={0}
                      step={10 ** (-1 * slctdCurr.toFixed)}
                      type="number"
                      placeholder="Amount"
                      ref={this.amountRef}
                    />
                    <span className="form-field-info">
                      Avl Bal :{' '}
                      {slctdCurr
                        ? slctdCurr.availableBalanceExchange.toFixed(
                            slctdCurr.toFixed,
                          )
                        : ''}{' '}
                      {slctdCurr.symbol}
                    </span>
                    {this.getAmountError()}
                  </div>
                  <div class="form-btn-holder align-items-center send-button-withdraw">
                    <a class="form-register align-items-center" href="#">
                      Send
                    </a>
                  </div>
                </div>
              </div>
              <div className="diamond-list">
                <div className="currency-balance-details withdraw-coins-details">
                  <h3>
                    {location.pathname == BTC
                      ? 'BTC'
                      : location.pathname == USDT
                      ? 'USDT'
                      : ''}{' '}
                    Balance Details
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Total</td>
                        <td>
                          {slctdCurr
                            ? (
                                slctdCurr.availableBalanceExchange +
                                slctdCurr.availableBalanceOptions +
                                slctdCurr.availableBalanceFutures
                              ).toFixed(slctdCurr.toFixed)
                            : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td>In Order</td>
                        <td>
                          {slctdCurr
                            ? (
                                slctdCurr.availableBalanceOptions +
                                slctdCurr.availableBalanceFutures
                              ).toFixed(slctdCurr.toFixed)
                            : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td>Available</td>
                        <td>
                          {slctdCurr
                            ? slctdCurr.availableBalanceExchange.toFixed(
                                slctdCurr.toFixed,
                              )
                            : ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="diamond-list">
              <h2>Note :</h2>
              <ul>
                <li>
                  <span className="diamond"></span>
                  Please verify your email after succesfully submitting the
                  withdrawal request
                </li>
                <li>
                  <span className="diamond"></span>
                  You can track the withdrawal progress in the transaction
                  history section
                </li>
                <li>
                  <span className="diamond"></span>
                  Please do not withdraw this token to any ICO address directly
                </li>
              </ul>
            </div>
            <div className="table-container contained deposits mt-5 w-80 pb-3">
              <div className="table-header">
                <h3>Withdrawal History</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                {location.pathname == BTC ? (
                  <>
                    {allWithdrawBTC &&
                      allWithdrawBTC.map((item, index) => {
                        return (
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1000</td>
                                <td>24th july 2020</td>
                                <td>16:00:00</td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {' '}
                    {allWithdrawUSDT &&
                      allWithdrawUSDT.map((item, index) => {
                        return (
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Tme</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1000</td>
                                <td>24th july 2020</td>
                                <td>16:00:00</td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  withdraw: state.withdraw,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {}),
  withRouter,
)(WithdrawCoins);
