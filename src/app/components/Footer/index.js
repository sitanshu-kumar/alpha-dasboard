import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import a5whiteLogo from '../../../lp-assets/a5-white-header-logo.svg';
import mediumMonogram from '../../../lp-assets/medium-monogram.svg';
import linkedinIcon from '../../../lp-assets/LinkedIN.svg';
import telegram from '../../../lp-assets/telegram.svg';
import twitter from '../../../lp-assets/Twitter.svg';
import weibo from '../../../lp-assets/weibo-icon.svg';

class index extends Component {
  render() {
    return (
      <>
        {' '}
        <footer className="footer dark-bg">
          <div className="footer-center">
            <div className="footer-logo">
              <img src={a5whiteLogo} alt="" />
            </div>
            <div className="footer-main d-flex">
              <div className="footer-links-container d-flex">
                <ul className="footer-list products">
                  <li>Products</li>
                  <li>
                    <a href="site/Perpetual Swaps/index.html">Perpetual Swap</a>
                  </li>
                  <li>
                    <a href="site/Futures/index.html">Futures</a>
                  </li>
                  <li>
                    <a href="site/Futures Swaps/index.html">Futures Swaps</a>
                  </li>
                  <li>
                    <a href="site/Product Pipeline/index.html">
                      Exotic Options
                    </a>
                  </li>
                </ul>
                <div className="footer-column-2 d-flex flex-column">
                  <ul className="footer-list about-us">
                    <li>About us</li>
                    <li>
                      <a href="terms/about-us.html">About</a>
                    </li>
                    <li>
                      <a href="terms/terms-of-use.html">Terms and Conditions</a>
                    </li>
                    <li>
                      <a href="terms/privacy-policy.html">Privacy Policy</a>
                    </li>
                  </ul>
                  <ul className="footer-list support">
                    <li>Support</li>
                    <li>
                      <a href="mailto:support@alpha5.io">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-column-3 d-flex flex-column">
                  <ul className="footer-list resources">
                    <li>Resources</li>

                    <li>
                      <a href="site/General/index.html">Documentation</a>
                    </li>
                    <li>
                      <a href="media.html">Media</a>
                    </li>
                  </ul>
                  <ul className="footer-list follow-us">
                    <li>Need help? Get in touch</li>
                    <li className="d-flex">
                      <a
                        className="medium"
                        href="https://medium.com/@alpha5_io"
                      >
                        <img src={mediumMonogram} alt="" />
                      </a>
                      <a href="https://LinkedIn.com/company/alpha5exchange">
                        <img src={linkedinIcon} />
                      </a>
                      <a href="https://t.me/Alpha5_en/2">
                        <img src={telegram} />
                      </a>
                      <a href="https://twitter.com/alpha5_io">
                        <img src={twitter} />
                      </a>
                      <a
                        className="weibo"
                        href="https://weibo.com/u/7426297907"
                      >
                        <img src={weibo} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="api">
                <h3>API</h3>
                <p>A powerful API designed to handle the hardest of moments.</p>
                <a href="site/API/index.html">DOCUMENTATION</a>
              </div>
              <ul className="footer-list follow-us-ipad">
                <li>Need help? Get in touch</li>
                <li className="d-flex">
                  <a className="medium" href="https://medium.com/@alpha5_io">
                    <img src={mediumMonogram} alt="" />
                  </a>
                  <a href="https://LinkedIn.com/company/alpha5exchange">
                    <img src={linkedinIcon} />
                  </a>
                  <a href="https://twitter.com/alpha5_io">
                    <img src={twitter} />
                  </a>
                  <a className="weibo" href="https://weibo.com/u/7426297907">
                    <img src={weibo} alt="" />
                  </a>
                  <a href="https://t.me/Alpha5_en/2">
                    <img src={telegram} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default index;
