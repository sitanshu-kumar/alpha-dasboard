import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import A5Logo from '../../../lp-assets/a5-black-header-logo.svg';
import '../../../landing-page.scoped.css';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: false,
    };
  }

  componentDidMount = () => {
    document.body.addEventListener('click', this.bodyClickListener);
  };

  bodyClickListener = (e) => {
    this.setState({sidebarToggle: false});
  };

  toggleSidebar = () => {
    let sidebarToggle = !this.state.sidebarToggle;
    this.setState({sidebarToggle});
  };

  goToHome = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <>
        <>
          <header className="header d-flex align-items-center w-100">
            <div onClick={this.goToHome} className="logo ml-5">
              <img src={A5Logo} alt="Alpha5" />
            </div>
            <div
              style={
                this.state.sidebarToggle ? {right: '0px'} : {right: '-300px'}
              }
              className="header-right d-flex ml-auto mr-4"
            >
              <a className="exchange-btn-header ml-auto mr-5" href="/trade">
                Exchange
              </a>
              <div className="header-btn-holder d-flex align-items-center">
                <Link className="header-register" to="/register">
                  <span>Register</span>
                  <span className="skew"></span>
                </Link>
                <Link className="header-login" to="/login">
                  <span></span>
                  <span>Log in</span>
                </Link>
              </div>
            </div>
            <div onClick={this.toggleSidebar} className="menu-btn flex-column">
              <span className="menu-btn-bar"></span>
              <span className="menu-btn-bar"></span>
              <span className="menu-btn-bar"></span>
            </div>
          </header>
        </>
      </>
    );
  }
}

export default index;
