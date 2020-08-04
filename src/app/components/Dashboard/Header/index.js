import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../../redux/actions/authActions';
import {loginAPI} from '../../Login/Login_Api';
import _ from 'lodash';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutMenuOpen: false,
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    // this.bodyClickListener();
  };

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(nextProps.profile, this.props.profile)) {
      this.forceUpdate();
    }
  };

  componentDidUpdate = () => {
    console.log(this.props);
  };

  bodyClickListener = () => {
    document.body.addEventListener('click', () => {
      this.setState({logoutMenuOpen: false});
    });
  };

  toggleLogoutMenu = (e) => {
    e.stopPropagation();
    this.setState((p) => ({logoutMenuOpen: !p.logoutMenuOpen}));
  };

  render() {
    return (
      <>
        {/* <header className="a5-header d-flex p-4 align-items-center">
          <div
            onClick={() => {
              this.props.toggleSidebar();
            }}
            className="menu-trigger mr-4"
          >
            <img src={'db-assets/menu-icon.svg'} alt="menu" />
          </div>
          <div
            onClick={() => {
              this.props.history.push('/');
            }}
            className="logo"
          >
            <img src={'db-assets/a5-white-header-logo.svg'} alt="Alpha5" />
          </div>
          <div className="header-left d-none d-md-flex mr-auto">
            <a href="/trade/">Trade</a>
            <a href="/site/API">Resources</a>
          </div>
          <div className="header-rt d-none d-md-flex ml-auto">
           
            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Equity</span>
              <span className="value">5.0467</span>
            </div>
            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Available</span>
              <span className="value">5.0467</span>
            </div>
          </div>
          <div onClick={this.toggleLogoutMenu} className="header-profile">
            <img src={'db-assets/user-icon.svg'} alt="user" />
            <div
              className={`header-profile-menu  ${
                this.state.logoutMenuOpen ? 'd-block' : 'd-none'
              }`}
            >
              <h3>{this.props.profile.profile.email}</h3>

              <div className="header-rt-menu-item d-flex d-md-none header-rt-menu-equity">
                <span className="head">Equity</span>
                <span className="value">5.0467</span>
              </div>
              <div className="header-rt-menu-item d-flex d-md-none header-rt-menu-equity">
                <span className="head">Available</span>
                <span className="value">5.0467</span>
              </div>
              <div className="header-rt-menu-item d-flex d-md-none header-rt-menu-links">
                <a href="/trade/">Trade</a>
                <a href="/site/API">Resources</a>
              </div>
              <div onClick={this.props.logoutUser} className={`header-logout`}>
                <span>Logout</span>
                <span style={{marginLeft: '0.4rem'}}>
                  <i className="fa fa-sign-out"></i>
                </span>
              </div>
            </div>
          </div>
        </header> */}
        <header className="header d-flex align-items-center w-100">
          <div
            onClick={() => {
              this.props.toggleSidebar();
            }}
            className="menu-btn left flex-column"
          >
            <span className="menu-btn-bar"></span>
            <span className="menu-btn-bar"></span>
            <span className="menu-btn-bar"></span>
          </div>
          <div
            onClick={() => {
              this.props.history.push('/');
            }}
            className="logo ml-5"
          >
            <img src={'db-assets/a5-black-header-logo.svg'} alt="Alpha5" />
          </div>

          <div className="header-left hide-670 d-flex align-items-center">
            <a className="trade-btn-header ml-auto mr-5" href="/trade/">
              <img
                className="trade-btn-logo"
                src={'db-assets/android-icon-192x192.png'}
              />
              <span>Trade</span>
              <span className="arrow">{'>>'}</span>
            </a>
            <a href="/site/API" className="header-resources">
              Resources
            </a>
          </div>

          <div className="header-right d-flex ml-auto mr-4">
            <ul className="header-margins hide-670">
              <li>
                <span className="head">IM</span>
                <span className="bar">
                  <span className="bar-value"></span>
                </span>
                <span className="value">25%</span>
              </li>
              <li>
                <span className="head">MM</span>
                <span className="bar">
                  <span className="bar-value"></span>
                </span>
                <span className="value">25%</span>
              </li>
            </ul>

            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Equity</span>
              <span className="value">5.0467</span>
            </div>

            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Available</span>
              <span className="value">5.0467</span>
            </div>

            <div onClick={this.toggleLogoutMenu} className="header-profile">
              <img src="./db-assets/user-icon.svg" />
              {this.state.logoutMenuOpen ? (
                <div className="header-profile-menu  d-flex flex-column">
                  <a className="email">{this.props.profile.profile.email}</a>

                  <div className="equity d-flex from-ipad-flex justify-content-between">
                    <span className="head">Equity</span>
                    <span className="value">5.0467</span>
                  </div>

                  <div className="equity d-flex from-ipad-flex justify-content-between">
                    <span className="head">Available</span>
                    <span className="value">5.0467</span>
                  </div>

                  <a
                    style={{color: 'var(--gold-pop)'}}
                    className="from-phone"
                    href="/trade/"
                  >
                    Trade
                  </a>

                  <a
                    style={{color: 'var(--gold-pop)'}}
                    className="from-phone"
                    href="/site/API"
                  >
                    Resources
                  </a>

                  <a onClick={() => loginAPI.logout()} className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </a>
                </div>
              ) : (
                <></>
              )}{' '}
            </div>
          </div>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Header));
