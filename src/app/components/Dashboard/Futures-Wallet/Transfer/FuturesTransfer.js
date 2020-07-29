import React, {Component} from 'react';
import TransferModel from '../../Modals/TransferModal/TransferModal';
import './futures-wallet.css';

export class FuturesTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTransferBalModalVisible: false,
      toWallet: this.walletsObj.exchange,
      fromWallet: this.walletsObj.options,
    };
  }

  walletsObj = {
    exchange: 'EXCHANGE WALLET',
    options: 'OPTIONS WALLET',
    futures: 'FUTURES WALLET',
  };

  showTransferBalanceModal = (to, from) => {
    console.log(this.walletsObj[to], this.walletsObj[from]);
    this.setState({
      isTransferBalModalVisible: true,
      toWallet: this.walletsObj[to],
      fromWallet: this.walletsObj[from],
    });
  };

  hideTransferBalanceModal = () => {
    this.setState({isTransferBalModalVisible: false});
  };

  render() {
    return (
      <>
        {/* <div className="containment">
          <div className="balances pb-5">
            <h3>Futures Wallet</h3>
            <hr />
            <div className="left-sided">
              <div className="d-flex justify-content-start">
                <button
                  onClick={() => {
                    this.showTransferBalanceModal('exchange', 'futures');
                  }}
                  className="a5-button-primary transfer-balance"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
          <div className="balances mt-2">
            <div className="table-container contained futures-wallet-table pb-3">
              <div className="table-header">
                <h3>Futures Wallet Details</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>NAV</th>
                      <th>UPL</th>
                      <th>Available Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTC</td>
                      <td>0.000</td>
                      <td>0.000</td>
                      <td>0.000</td>
                    </tr>
                    <tr>
                      <td>USDT</td>
                      <td>0.000</td>
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
            <h3>Futures Wallet</h3>
            <div className="main-sub-header">
              <h3>Futures Wallet</h3>
              <hr />
            </div>
          </div>
          <div className="main-body">
            <div className="form-btn-holder align-items-center mt-5">
              <a
                onClick={() => {
                  this.showTransferBalanceModal('exchange', 'futures');
                }}
                className="form-register align-items-center"
              >
                Transfer Amount
              </a>
            </div>
            <div className="table-container w-80 pb-3">
              <div className="table-header">
                <h3>Balances</h3>
              </div>
              <div className="a5-table d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset Type</th>
                      <th>NAV</th>
                      <th>Available Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTC</td>
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

        <TransferModel
          toWallet={this.state.toWallet}
          fromWallet={this.state.fromWallet}
          show={this.state.isTransferBalModalVisible}
          hideTransferBalanceModal={this.hideTransferBalanceModal}
        />
      </>
    );
  }
}

export default FuturesTransfer;
