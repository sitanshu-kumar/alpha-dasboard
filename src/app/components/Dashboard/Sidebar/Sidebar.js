import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

const sidebarStructureObj = {
  exchangeWallet: ['Balances', 'Deposit', 'Withdraw'],
  optionsWallet: ['Options Wallet'],
  futuresWallet: ['Futures Wallet'],
  accountAndPrefs: [
    'My Profile',
    'Security',
    'Affiliate',
    'Get Api Secret',
    'Change Password',
    '2FA Configuration',
  ],
  history: ['Trade History', 'Order History'],
};

const sidebarKeys = Object.keys(sidebarStructureObj);

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchangeWalletExpanded: true,
      optionsWalletExpanded: true,
      futuresWalletExpanded: true,
      accountAndPrefsExpanded: true,
      historyExpanded: true,
      activeDashboard: '',
      sidebarToggle: false,
    };
  }

  componentDidMount = () => {
    let activeRoute = this.props.routes.filter(
      (el) => el.layout + el.path == this.props.location.pathname,
    )[0];
    if (
      activeRoute &&
      this.state.activeDashboard != activeRoute.activeDashboard
    ) {
      this.setState({activeDashboard: activeRoute.activeDashboard});
    } else {
      this.handleRouteChanged('Balances', '/dashboard/balances');
    }
  };

  componentDidUpdate = () => {
    let activeRoute = this.props.routes.filter(
      (el) => el.layout + el.path == this.props.location.pathname,
    )[0];
    if (
      this.state &&
      this.state.activeDashboard != activeRoute.activeDashboard
    ) {
      this.setState({activeDashboard: activeRoute.activeDashboard});
    }
  };

  handleRouteChanged = (activeDashboard, route) => {
    this.setState({activeDashboard});
    this.props.history.push(route);
  };

  ExchangewalletClick = () => {
    const currentState = this.state.exchangeWalletExpanded;
    this.setState({
      exchangeWalletExpanded: !currentState,
    });
  };

  accPrefencesClick = () => {
    const currentState = this.state.accountAndPrefsExpanded;
    this.setState({
      accountAndPrefsExpanded: !currentState,
    });
  };

  FuturesWalletClick = () => {
    const currentState = this.state.futuresWalletExpanded;
    this.setState({
      futuresWalletExpanded: !currentState,
    });
  };

  OptionsWalletClick = () => {
    const currentState = this.state.optionsWalletExpanded;
    console.log(currentState);
    this.setState({
      optionsWalletExpanded: !currentState,
    });
  };

  HistoryClick = () => {
    const currentState = this.state.historyExpanded;
    this.setState({
      historyExpanded: !currentState,
    });
  };

  render() {
    return (
      <>
        {/* <aside
          id="main-sidebar"
          style={this.props.sidebarToggle ? {left: '0'} : {}}
          className="aside"
        >
          <nav className="sidebar-nav">
            <ul>
              <li>
                <a
                  className={`has-arrow ${
                    this.state.exchangeWalletExpanded
                      ? 'arrow-up'
                      : 'arrow-down'
                  } 
                     ${
                       sidebarStructureObj.exchangeWallet.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
                  onClick={this.ExchangewalletClick}
                >
                  Exchange Wallet
                </a>
                <ul
                  style={
                    this.state.exchangeWalletExpanded
                      ? {height: '9rem'}
                      : {height: '0px'}
                  }
                  className="inner-nav"
                >
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Balances',
                          '/dashboard/balances',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Balances'
                          ? 'selected'
                          : ''
                      }
                    >
                      Balances
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Deposit',
                          '/dashboard/deposits',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Deposit'
                          ? 'selected'
                          : ''
                      }
                    >
                      Deposit
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Withdraw',
                          '/dashboard/withdraw',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Withdraw'
                          ? 'selected'
                          : ''
                      }
                    >
                      Withdraw
                    </a>
                  </li>
                </ul> 
              </li>
              <li>
                <a
                  className={`has-arrow ${
                    this.state.optionsWalletExpanded ? 'arrow-up' : 'arrow-down'
                  } 
                     ${
                       sidebarStructureObj.optionsWallet.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
                  onClick={this.OptionsWalletClick}
                >
                  Options Wallet
                </a>
                <ul
                  style={
                    this.state.optionsWalletExpanded
                      ? {height: '3rem'}
                      : {height: '0px'}
                  }
                  className="inner-nav"
                >
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Options Wallet',
                          '/dashboard/options',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Options Wallet'
                          ? 'selected'
                          : ''
                      }
                    >
                      Options Wallet
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  className={`has-arrow ${
                    this.state.futuresWalletExpanded ? 'arrow-up' : 'arrow-down'
                  } 
                     ${
                       sidebarStructureObj.futuresWallet.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
                  onClick={this.FuturesWalletClick}
                >
                  Futures Wallet
                </a>
                <ul
                  style={
                    this.state.futuresWalletExpanded
                      ? {height: '3rem'}
                      : {height: '0px'}
                  }
                  className="inner-nav"
                >
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Futures Wallet',
                          '/dashboard/futures',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Futures Wallet'
                          ? 'selected'
                          : ''
                      }
                    >
                      Futures Wallet
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  className={`has-arrow ${
                    this.state.accountAndPrefsExpanded
                      ? 'arrow-up'
                      : 'arrow-down'
                  } 
                     ${
                       sidebarStructureObj.accountAndPrefs.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
                  onClick={this.accPrefencesClick}
                >
                  Account & Preferences
                </a>
                <ul
                  style={
                    this.state.accountAndPrefsExpanded
                      ? {height: '12rem'}
                      : {height: '0px'}
                  }
                  className="inner-nav"
                >
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'My Profile',
                          '/dashboard/account',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'My Profile'
                          ? 'selected'
                          : ''
                      }
                    >
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Security',
                          '/dashboard/security',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Security'
                          ? 'selected'
                          : ''
                      }
                    >
                      Security
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Affiliate',
                          '/dashboard/affiliate',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Affiliate'
                          ? 'selected'
                          : ''
                      }
                    >
                      Affiliate
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Get Api Secret',
                          '/dashboard/apiSecret',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Get Api Secret'
                          ? 'selected'
                          : ''
                      }
                    >
                      Get API Secret
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  className={`has-arrow ${
                    this.state.historyExpanded ? 'arrow-up' : 'arrow-down'
                  } 
                     ${
                       sidebarStructureObj.history.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
                  onClick={this.HistoryClick}
                >
                  History{' '}
                </a>
                <ul
                  style={
                    this.state.historyExpanded
                      ? {height: '12rem'}
                      : {height: '0px'}
                  }
                  className="inner-nav"
                >
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Trade History',
                          '/dashboard/tradeHistory',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Trade History'
                          ? 'selected'
                          : ''
                      }
                    >
                      Trade History
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        this.handleRouteChanged(
                          'Order History',
                          '/dashboard/orderHistory',
                        );
                      }}
                      className={
                        this.state.activeDashboard == 'Order History'
                          ? 'selected'
                          : ''
                      }
                    >
                      Order History
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside> */}
        <aside
          className="sidebar"
          style={this.props.sidebarToggle ? {left: '0'} : {}}
        >
          <a
            onClick={this.ExchangewalletClick}
            className={`has-arrow ${
              this.state.exchangeWalletExpanded ? 'arrow-up' : 'arrow-down'
            } 
                     ${
                       sidebarStructureObj.exchangeWallet.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
          >
            <i className="fas fa-wallet"></i> Exchage Wallet
          </a>
          <ul
            style={
              this.state.exchangeWalletExpanded
                ? {height: 56 * 3 + 'px'}
                : {height: '0px'}
            }
          >
            <li>
              <a
                className={
                  this.state.activeDashboard == 'Balances' ? 'selected' : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged('Balances', '/dashboard/balances');
                }}
              >
                Balances
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.activeDashboard == 'Deposit' ? 'selected' : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged('Deposit', '/dashboard/deposits');
                }}
              >
                Deposits
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.activeDashboard == 'Withdraw' ? 'selected' : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged('Withdraw', '/dashboard/withdraw');
                }}
              >
                Withdraw
              </a>
            </li>
          </ul>
          <a
            onClick={this.FuturesWalletClick}
            className={`has-arrow ${
              this.state.futuresWalletExpanded ? 'arrow-up' : 'arrow-down'
            } 
                     ${
                       sidebarStructureObj.futuresWallet.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
          >
            <i className="fas fa-wallet"></i> Futures Wallet
          </a>
          <ul
            style={
              this.state.futuresWalletExpanded
                ? {height: 56 * 1 + 'px'}
                : {height: '0px'}
            }
          >
            <li>
              <a
                className={
                  this.state.activeDashboard == 'Futures Wallet'
                    ? 'selected'
                    : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged(
                    'Futures Wallet',
                    '/dashboard/futures',
                  );
                }}
              >
                Futures Wallet
              </a>
            </li>
          </ul>
          <a
            onClick={this.accPrefencesClick}
            className={`has-arrow ${
              this.state.accountAndPrefsExpanded ? 'arrow-up' : 'arrow-down'
            } 
                     ${
                       sidebarStructureObj.accountAndPrefs.indexOf(
                         this.state.activeDashboard,
                       ) != -1
                         ? 'selected'
                         : ''
                     }`}
          >
            <i className="fas fa-user-alt"></i> Account & Preferences
          </a>
          <ul
            style={
              this.state.accountAndPrefsExpanded
                ? {height: 56 * 4 + 'px'}
                : {height: '0px'}
            }
          >
            <li>
              <a
                className={
                  this.state.activeDashboard == 'My Profile' ? 'selected' : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged('My Profile', '/dashboard/account');
                }}
              >
                My Profile
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.activeDashboard == '2FA Configuration'
                    ? 'selected'
                    : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged(
                    '2FA Configuration',
                    '/dashboard/configure-2fa',
                  );
                }}
              >
                Change 2FA
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.activeDashboard == 'Change Password'
                    ? 'selected'
                    : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged(
                    'Change Password',
                    '/dashboard/change-password',
                  );
                }}
              >
                Change Password
              </a>
            </li>

            <li>
              <a
                className={
                  this.state.activeDashboard == 'Get Api Secret'
                    ? 'selected'
                    : ''
                }
                onClick={(e) => {
                  this.handleRouteChanged(
                    'Get Api Secret',
                    '/dashboard/apiSecret',
                  );
                }}
              >
                Get Api Secret
              </a>
            </li>
          </ul>
        </aside>
      </>
    );
  }
}

export default withRouter(Sidebar);
