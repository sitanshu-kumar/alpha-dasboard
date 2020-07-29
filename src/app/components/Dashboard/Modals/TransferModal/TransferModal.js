import React, {Component} from 'react';
import {currencyOptions} from '../../fakeStore';
import './TransferModal.css';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import _ from 'lodash';

export class TransferModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_string: this.props.fromWallet,
      to_String: this.props.toWallet,
      currencyArrayForSelect: [],
      selectedCurrency: '',
      insufficientFundError: false,
      amountRequiredError: false,
    };
  }

  getBalance = () => {
    let slctdCurr = this.state.selectedCurrency;
    switch (this.state.from_string) {
      case 'EXCHANGE WALLET':
        return slctdCurr.availableBalanceExchange;
      case 'OPTIONS WALLET':
        return slctdCurr.availableBalanceOptions;
      case 'FUTURES WALLET':
        return slctdCurr.availableBalanceFutures;
    }
  };

  currencyKeys = Object.keys(currencyOptions);

  amountRef = React.createRef();

  componentDidMount = () => {
    console.log(this.props);
    let currencyArrayForSelect = this.currencyKeys.map((key) => ({
      ...currencyOptions[key],
    }));
    this.setState({
      currencyArrayForSelect,
      selectedCurrency: currencyArrayForSelect[0],
    });
  };

  componentDidUpdate = () => {
    // console.log(this.state, this.props);
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.fromWallet != this.props.fromWallet) {
      this.setState({
        from_string: newProps.fromWallet,
        to_String: newProps.toWallet,
      });
    }
  };

  handleError = () => {
    return <span className="form-field-error"></span>;
  };

  swapWallets = () => {
    this.setState((p) => ({
      from_string: p.to_String,
      to_String: p.from_string,
    }));
  };

  curtainClick = (e) => {
    this.closeModal();
  };

  closeModal = () => {
    this.props.hideTransferBalanceModal();
  };

  handleCoinSelect = (item) => {
    this.setState({selectedCurrency: item});
  };

  handleAmountInput = (e) => {
    let slctdCurr = this.state.selectedCurrency;
    let amount = this.getBalance();
    let val = e.target.value;
    let enteredSum = parseFloat(val);
    if (val.indexOf('e') != -1)
      this.amountRef.current.value = amount.toFixed(slctdCurr.toFixed);
    if (!enteredSum) {
      this.setState({amountRequiredError: true, insufficientFundError: false});
    } else if (enteredSum > amount) {
      this.setState({insufficientFundError: true, amountRequiredError: false});
    } else {
      this.setState({insufficientFundError: false, amountRequiredError: false});
    }
  };

  getErrorMsg = () => {
    return this.state.amountRequiredError ? (
      <span className="transfer-form-field-error">Amount Required !</span>
    ) : this.state.insufficientFundError ? (
      <span className="transfer-form-field-error">Insufficient Funds !</span>
    ) : (
      <></>
    );
  };

  render() {
    const {location} = this.props;
    const slctdCurr = this.state.selectedCurrency;

    return this.props.show ? (
      <>
        <div onClick={this.curtainClick} className="curtain">
          <div
            className="box-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="box-modal-header">
              <h3>
                Transfer
                <span onClick={this.closeModal} className="close-modal">
                  X
                </span>
              </h3>
            </div>
            <div className="box-modal-body">
              <div className="transfer-bubble-holder d-flex justify-content-center align-items-center">
                <div className="bubble-container">
                  <h3>From</h3>
                  <div className="bubble">{this.state.from_string}</div>
                </div>
                <img
                  onClick={this.swapWallets}
                  src="db-assets/transfer-icon.svg"
                />
                <div className="bubble-container">
                  <h3>To</h3>
                  <div className="bubble">{this.state.to_String}</div>
                </div>
              </div>
              <div className="transfer-form">
                <div className="transfer-form-field">
                  <label>Asset</label>
                  {/* <A5DBSelect
                    placeholder={'Select...'}
                    itemList={this.state.currencyArrayForSelect}
                    onChange={(item) => {
                      this.handleCoinSelect(item);
                    }}
                    defaultValue={slctdCurr}
                  /> */}
                  <input
                    placeholder={'BTC'}
                    style={{width: '100%'}}
                    readOnly
                    type="text"
                  />
                </div>
                <div className="transfer-form-field">
                  <input
                    placeholder={'Enter Amount'}
                    className="value"
                    onInput={this.handleAmountInput}
                    type="number"
                    ref={this.amountRef}
                    step={slctdCurr ? 10 ** (-1 * slctdCurr.toFixed) : 1}
                  />
                  <input
                    value={
                      'Avl Bal ' + this.getBalance() + ' ' + slctdCurr.symbol
                    }
                    onClick={() => {
                      this.amountRef.current.focus();
                    }}
                    className="info"
                    type="text"
                    readOnly
                  />
                  {this.getErrorMsg()}
                </div>
                <div className="transfer-center-button">
                  <button className="form-btn yellow send-button-modal">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <></>
    );
  }
}

export default TransferModel;
