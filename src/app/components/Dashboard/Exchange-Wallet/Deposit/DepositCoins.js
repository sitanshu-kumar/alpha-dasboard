import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withAlert} from 'react-alert';
import {depositApi} from './Deposit_Api';
import QRCode from 'qrcode.react';

import {currencyOptions} from '../../fakeStore';

class DepositCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usdtQrCode: this.props.deposit.depositAddressUSDT.address || '',
      btcQrCode: this.props.deposit.depositAddressBTC.address || '',
      copied: false,
      defaultCurrency: '',
      activeQrCode: '',
    };
  }

  componentDidMount = () => {
    console.log('props', this.props);
    depositApi.getDepositAddress('BTC');
    depositApi.getDepositAddress('USDT');
    const {routes, location} = this.props;
    const BTC = routes[1].layout + routes[1].path;
    const USDT = routes[2].layout + routes[2].path;

    let currArray = Object.keys(currencyOptions);

    this.currencyArrayForSelect = currArray.map((symbol, index) => ({
      ...currencyOptions[symbol],
    }));

    switch (location.pathname) {
      case BTC:
        this.setState({
          defaultCurrency: currencyOptions['BTC'],
          activeQrCode: this.state.btcQrCode,
        });
        break;

      case USDT:
        this.setState({
          defaultCurrency: currencyOptions['USDT'],
          activeQrCode: this.state.usdtQrCode,
        });
        break;
    }
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextprops', nextProps);
    return {
      usdtQrCode: nextProps.deposit.depositAddressBTC.address,
      btcQrCode: nextProps.deposit.depositAddressUSDT.address,
    };
  }
  componentDidUpdate = (prevState) => {
    if (prevState.deposit !== this.props.deposit) {
      const {routes, location} = this.props;
      const BTC = routes[1].layout + routes[1].path;
      const USDT = routes[2].layout + routes[2].path;

      let currArray = Object.keys(currencyOptions);

      this.currencyArrayForSelect = currArray.map((symbol, index) => ({
        ...currencyOptions[symbol],
      }));
      switch (location.pathname) {
        case BTC:
          this.setState({
            defaultCurrency: currencyOptions['BTC'],
            activeQrCode: this.state.btcQrCode,
          });
          break;

        case USDT:
          this.setState({
            defaultCurrency: currencyOptions['USDT'],
            activeQrCode: this.state.usdtQrCode,
          });
          break;
      }
    }
  };
  copyRef = React.createRef();

  currencyArrayForSelect = [];

  handleSelect = (item) => {
    this.props.history.push(item.depositPath());
  };

  copyText = () => {
    this.copyRef.current.select();
    document.execCommand('copy');
    this.copyRef.current.focus();
    this.setState({copied: true});
    setTimeout(() => {
      this.setState({copied: false});
    }, 3000);
  };

  showCpyText = () =>
    this.state.copied ? <span className="text-success">Copied !!</span> : <></>;

  render() {
    const {routes, location} = this.props;
    const BTC = routes[1].layout + routes[1].path;
    const USDT = routes[2].layout + routes[2].path;
    const defaultCurrency = this.state.defaultCurrency;
    const {allDepositBTC, allDepositUSDT} = this.props.deposit;
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
            <div className="a5-login-field standalone-select">
              <A5DBSelect
                itemList={this.currencyArrayForSelect}
                placeholder={'Select...'}
                defaultValue={this.state.defaultCurrency}
                onChange={(item) => {
                  this.handleSelect(item);
                }}
              />
            </div>
            {this.state.activeQrCode && (
              <div className="qr-with-balance">
                <div className="qr-container for-deposit width-75 d-flex">
                  <QRCode
                    includeMargin={true}
                    size={200}
                    value={this.state.activeQrCode}
                  />
                  <div className="qr-result">
                    <p>
                      YOUR WALLET ADDRESS TO RECEIVE {defaultCurrency.symbol}
                    </p>
                    <div className="input-with-copy">
                      <input
                        value="237gj h64d1 5907 c694 02"
                        type="text"
                        readOnly
                        ref={this.copyRef}
                        value={this.state.activeQrCode}
                      />
                      <img
                        onClick={this.copyText}
                        src={'db-assets/copy-icon.svg'}
                        alt=""
                      />
                      {this.showCpyText()}
                    </div>
                    <h3>Note :</h3>
                    <ul>
                      <li>
                        <span className="diamond"></span>
                        Only 2 blockchain confirmations are required for a
                        successful deposit
                      </li>
                      <li>
                        <span className="diamond"></span>
                        You can track the deposit progress in the wallet history
                        section.
                      </li>
                      <li>
                        <span className="diamond"></span>
                        Do not deposit any other token to this address.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="currency-balance-details">
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
                          {defaultCurrency
                            ? (
                                defaultCurrency.availableBalanceExchange +
                                defaultCurrency.availableBalanceOptions +
                                defaultCurrency.availableBalanceFutures
                              ).toFixed(defaultCurrency.toFixed)
                            : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td>In Order</td>
                        <td>
                          {defaultCurrency
                            ? (
                                defaultCurrency.availableBalanceOptions +
                                defaultCurrency.availableBalanceFutures
                              ).toFixed(defaultCurrency.toFixed)
                            : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td>Available</td>
                        <td>
                          {defaultCurrency
                            ? defaultCurrency.availableBalanceExchange.toFixed(
                                defaultCurrency.toFixed,
                              )
                            : ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="table-container deposit-history w-80 mt-5">
              <div className="table-header">
                <h3>Deposit History</h3>
              </div>
              <div className="a5-table d-flex justify-content-center">
                {location.pathname == BTC ? (
                  <>
                    {allDepositBTC &&
                      allDepositBTC.map((item, index) => {
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
                    {allDepositUSDT &&
                      allDepositUSDT.map((item, index) => {
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
  deposit: state.deposit,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {}),
  withRouter,
)(DepositCoins);
