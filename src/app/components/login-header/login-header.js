import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Logo from '../../../lp-assets/a5-white-header-logo.svg';

class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <header className="header dark-bg d-flex align-items-center w-100">
          <div className="logo ml-5">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
        </header>
      </>
    );
  }
}

export default LoginHeader;
