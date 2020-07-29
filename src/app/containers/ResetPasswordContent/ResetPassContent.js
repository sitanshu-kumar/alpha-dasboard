import React, {Component} from 'react';
import ForgotHeader from '../../components/ForgotPassword/ForgotHeader';
import Footer from '../../components/Footer';
import ResetPassword from '../../components/Reset-Password/ResetPassword';

class ResetPassContent extends Component {
  render() {
    return (
      <div>
        <ForgotHeader />
        <ResetPassword />
        <Footer />
      </div>
    );
  }
}

export default ResetPassContent;
