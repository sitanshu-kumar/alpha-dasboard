import React, {Component} from 'react';
import {balanceApi} from './Balance_Api';
export class Balances extends Component {
  componentDidMount = () => {
    // console.log(this.props);
  };

  navigateTo = (path) => {
    this.props.history.push(path);
  };

  render() {
    const {routes} = this.props;
    const Depositroute = routes[3].layout + routes[3].path;
    const withdrawroute = routes[6].layout + routes[6].path;

    return (
      <>
        {/* <div className="containment">
          <div className="balances">
            <h3>Balances</h3>
            <hr />
            <div className="table-container contained deposits pb-3">
              <div className="table-header">
                <h3>Balances</h3>
              </div>
              <div className="a5-table d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset Type</th>
                      <th>Total Balance</th>
                      <th>Locked</th>
                      <th>Available Balance</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTC</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                      <td>
                        <button
                          onClick={() => this.navigateTo('/dashboard/deposits')}
                          className="form-btn-yellow"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={() => this.navigateTo('/dashboard/withdraw')}
                          className="form-btn-gray ml-2"
                        >
                          Withdrawal
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>BTC</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                      <td>
                        <button
                          onClick={() => this.navigateTo('deposit')}
                          className="form-btn-yellow"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={() => this.navigateTo('withdraw')}
                          className="form-btn-gray ml-2"
                        >
                          Withdrawal
                        </button>
                      </td>
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
              <h3>Balances</h3>
              <hr />
            </div>
          </div>
          <div className="main-body">
            <div className="table-container contained deposits pb-3">
              <div className="table-header">
                <h3>Balances</h3>
              </div>
              <div className="a5-table d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset Type</th>
                      <th>Total Balance</th>
                      <th>Locked</th>
                      <th>Available Balance</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTC</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                      <td>
                        <button
                          onClick={() => this.navigateTo('/dashboard/deposits')}
                          className="form-btn yellow"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={() => this.navigateTo('/dashboard/withdraw')}
                          className="form-btn gray ml-2"
                        >
                          Withdrawal
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>BTC</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                      <td>
                        <button
                          onClick={() => this.navigateTo('deposit')}
                          className="form-btn yellow"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={() => this.navigateTo('withdraw')}
                          className="form-btn gray ml-2"
                        >
                          Withdrawal
                        </button>
                      </td>
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

export default Balances;
