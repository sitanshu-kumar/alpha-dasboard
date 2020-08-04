import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../redux/actions/profileActions';
import {hideEmailVerification} from '../../redux/actions/authActions';
import {registerAPI} from '../Register/Register_Api';
import Header from './Header/index';
import routes from './routes';
import setAuthToken from '../../utils/setAuthToken';

const userInfo = {};

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                {...prop}
                routes={routes}
                {...userInfo}
              />
            )}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: false,
      hasError: null,
    };
  }

  componentDidMount = () => {
    this.checkLoginStatus();
    if (this.props.auth.isAuthenticated) {
      registerAPI.getCurrentProfile();
      this.props.hideEmailVerification();
    }
    this.adjustSideBarHeight();
  };

  componentDidUpdate = () => {
    this.checkLoginStatus();
  };

  checkLoginStatus = () => {
    if (this.props.auth.isAuthenticated) {
      document.title = this.props.profile.profile.email;
    } else if (this.props.auth.user.email === null) {
      document.title = 'ALPHA 5';
    }
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  };

  bodyClickListener = (e) => {
    this.setState({sidebarToggle: false});
    if (e.target.matches('.has-arrow')) {
      setTimeout(() => {
        this.setState({
          sidebarToggle: true,
        });
      });
    }
  };

  // componentDidCatch = (er, errInfo) => {
  //   console.log(errInfo, er);
  //   this.setState({hasError: er, errInfo});
  // };

  adjustSideBarHeight = () => {
    // let sidebar = document.getElementById('main-sidebar');
    // sidebar.style.top = 85;
    // document.onscroll = () => {
    //   sidebar.style.height = document.body.scrollHeight + 'px';
    // };
    document.body.addEventListener('click', this.bodyClickListener);
  };

  toggleSidebar = () => {
    let bool = !this.state.sidebarToggle;
    this.setState({sidebarToggle: bool});
  };

  render() {
    // if (!this.state.hasError)
    return (
      <>
        <link rel="stylesheet" type="text/css" href="dashboard.css"></link>
        <Header toggleSidebar={this.toggleSidebar} />
        {/* <div className="d-flex w-100 dashboard-container">
            <Sidebar routes={routes} sidebarToggle={this.state.sidebarToggle} />
            {switchRoutes}
          </div> */}
        <div class="d-flex dashboard-holder">
          <Sidebar routes={routes} sidebarToggle={this.state.sidebarToggle} />
          {switchRoutes}
        </div>
      </>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  hideEmailVerification,
})(Dashboard);
