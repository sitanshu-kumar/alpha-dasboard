import React, {Component} from 'react';
import Footer from '../../components/Footer';
import ForgotPassword from '../../components/Reset-Password/ResetPassword';
import Header from '../../components/login-header/login-header';
export class ForgotPasswordContent extends Component {
  render() {
    return (
      <div>
        <Header />
        <ForgotPassword />
        <Footer />
      </div>
    );
  }
}

export default ForgotPasswordContent;
