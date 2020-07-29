import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import greendotLeft from '../../../lp-assets/dreen-dot-left.svg';
import greendotRight from '../../../lp-assets/green-dot-rght.svg';
import smartCryptoLaptop from '../../../lp-assets/smart-crypto-laptop.png';
import smartProduct1 from '../../../lp-assets/smart-prod-1.svg';
import smartProduct2 from '../../../lp-assets/smart-product-2.png';
import greenDownArrow from '../../../lp-assets/green-down-arrow.svg';
import riskIcon from '../../../lp-assets/risk-icon.svg';
import pipelineIcon from '../../../lp-assets/pipline-icon.svg';
import portfolioIcon from '../../../lp-assets/portfolio-icon.svg';
import A5TIcon from '../../../lp-assets/a5t-icon.svg';
import gravityDeviceUIMockup from '../../../lp-assets/Gravity-Devices-UI-Mockup-Set-Scene.png';
import gravityDeviceUIMockupIpad from '../../../lp-assets/Gravity-Devices-UI-Mockup-Set-Scene.png';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import '../../../landing-page.scoped.css';

class HomePage extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  };

  render() {
    return (
      <>
        <section className="section smart-crypto">
          <div className="smart-crypto-notice ml-auto mr-auto">
            <h3>A Smart Crypto</h3>
            <h3>Derivatives Exchange</h3>
            <p>
              Access a completely new orderbook technology and a brand new suite
              of features on crypto’s most sophisticated liquidity engine.
            </p>
            <div className="smart-crypto-register d-flex justify-content-center align-items-center">
              <div className="green-left">
                <img src={greendotLeft} alt="" />
              </div>
              <div className="smart-crypto-register">
                <Link to="/register">Register</Link>
              </div>
              <div className="green-right">
                <img src={greendotRight} alt="" />
              </div>
            </div>
          </div>
          <div className="image-holder">
            <img src={smartCryptoLaptop} alt="" />
          </div>
        </section>

        <section className="section smart-prod-suite dark-bg">
          <h3>Smart Product Suite</h3>
          <div className="smart-prod-container d-flex justify-content-center">
            <div className="img-holder-rt">
              <img src={smartProduct1} alt="" />
            </div>
            <div className="smart-prod-desc right mr-auto">
              <h3>FUTURES SWAPS</h3>
              <p>
                Trade basis (cash & carry), roll positions, and see the futures
                curve come to life, with a single click.
              </p>
              <a href="site/Futures Swaps/index.html" className="contracts-btn">
                CONTRACTS
              </a>
              <ul>
                <li>Powered by implied orderbook logic</li>
                <li>Standalone products with aggregated liquidity</li>
                <li>Seamless risk management with portfolio margining</li>
              </ul>
            </div>
          </div>
          <div className="smart-prod-container d-flex justify-content-center">
            <div className="smart-prod-desc left ml-auto">
              <h3>EXOTIC OPTIONS</h3>
              <p>
                Digital exposures to markets via a new range of options
                products. Simplified, for everyone.
              </p>
              <a
                href="site/Product Pipeline/index.html"
                className="contracts-btn"
              >
                CONTRACTS
              </a>

              <ul>
                <li>Parimutuels with odds determined by the traders</li>
                <li>
                  European Digitals with pre-determined risk-reward profiles
                </li>
                <li>Easy interface, with no complex risk management</li>
              </ul>
            </div>
            <div className="img-holder-lt">
              <img src={smartProduct2} alt="" />
            </div>
          </div>
          <div className="img-bottom-bg">
            <div className="reg-an-account">
              <h3>Register For an Account</h3>
              <p>It only takes 60 Seconds</p>
              <div className="smart-crypto-register pt-3">
                <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section driving-change">
          <h3>
            Driving Change in <br />
            Derivatives Trading
          </h3>
          <div className="down-arrow">
            <img src={greenDownArrow} alt="" />
          </div>

          <div className="features d-flex flex-wrap">
            <div className="feature left top">
              <div className="derivatives-icon">
                <img src={riskIcon} alt="" height="50" width="50" />
              </div>
              <h3>No Custodial Risk</h3>
              <p>
                Alpha5 works with multi-sig deep cold storage, with
                industry-leading security standards. Further it is integrated on
                top of a leading global custodian, with a strong insurance
                policy to help protect against extreme circumstances.
              </p>
              <div className="learn-more-btn">
                <a className="contracts-btn" href="site/Custody/index.html">
                  Learn more
                </a>
              </div>
            </div>
            <div className="feature right top">
              <div className="derivatives-icon">
                <img src={pipelineIcon} alt="" height="50" width="50" />
              </div>
              <h3>product pipeline</h3>
              <p>
                The Alpha5 system is configured for seamless scaling and
                introduction of new products that have relevance to traders of
                all types.
              </p>
              <div className="learn-more-btn">
                <a
                  className="contracts-btn"
                  href="site/Product Pipeline/index.html"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div className="feature left bottom">
              <div className="derivatives-icon">
                <img src={portfolioIcon} alt="" height="50" width="50" />
              </div>
              <h3>OES</h3>
              <p>
                Trade with no capital posted on the exchange and benefit from
                the services of a licensed, trusted 3rd party arranging
                calculations and settlement.
              </p>
              <div className="learn-more-btn">
                <a className="contracts-btn" href="site/OES/">
                  Learn more
                </a>
              </div>
            </div>
            <div className="feature right bottom">
              <div className="derivatives-icon">
                <img src={A5TIcon} alt="" height="50" width="50" />
              </div>
              <h3>A5T</h3>
              <p>
                A5T is a unit token of the A5T ecosystem, which collectively
                owns the Alpha5 insurance fund - an industry first.
              </p>
              <div className="learn-more-btn">
                <a className="contracts-btn" href="site/A5T/index.html">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="section start-trading-now">
          <div className="containment d-flex justify-content-center">
            <div className="login-reg">
              <h3>Start Trading Now.</h3>
              <p>It only takes 60 seconds.</p>
              <div className="btns d-flex">
                <Link className="register" to="/register">
                  <span>Register</span>
                  <span></span>
                </Link>
                <Link className="login" to="/login">
                  <span></span>
                  <span>Log in</span>
                </Link>
              </div>
            </div>
            <div className="img-holder">
              <img src={gravityDeviceUIMockup} alt="" />
            </div>
            <div className="img-holder-ipad">
              <img src={gravityDeviceUIMockupIpad} alt="" />
            </div>
          </div>
        </section>
        <script src={this.animateSrc}></script>
      </>
    );
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(HomePage));
