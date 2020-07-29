import React, {Component} from 'react';
import Header from '../../components/login-header/login-header';
import Footer from '../../components/Footer';
import ChangePassword from '../../components/Reset-Password/Reset-Password-form';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <ChangePassword />
        <Footer />
      </div>
    );
  }
}

export default ResetPassword;
