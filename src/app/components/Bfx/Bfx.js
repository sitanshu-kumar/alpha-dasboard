import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import './Bfx.css';
import CoinGecko from '../../../assets/img/CoinGecko.png';
import coinmarketcap from '../../../assets/img/coinmarketcap.png';

class Bfx extends Component {
  render() {
    return (
      <div>
        {/*Banner Start*/}
        <section className="main-banner">
          <div className="banner-content d-flex">
            <div className="banner-left">
              <h1>
                <span> BFX - Bitfex Exchange Token</span>
              </h1>
              <p>An ERC-20 utility token powering the Bitfex Ecosystem</p>
              <div className="view-exchange-btn">
                <Link
                  to="https://etherscan.io/token/0xdb096cc19b8227e2115855c5b39dcc247470013c"
                  target="_blank"
                >
                  View on Etherscan
                </Link>
              </div>
            </div>
            <div className="banner-right">
              <div
                className="coinmarketcap-currency-widget"
                data-currencyid="4785"
                data-base="USD"
                data-secondary="BTC"
                data-ticker="true"
                data-rank="true"
                data-marketcap="true"
                data-volume="true"
                data-statsticker="true"
                data-stats="USD"
              >
                <div
                  style={{
                    border: '2px solid #e1e5ea',
                    borderRadius: '10px',
                    fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                    minWidth: '285px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        float: 'right',
                        width: '67%',
                        border: 'none',
                        textAlign: 'left',
                        padding: '5px 0px',
                        lineHeight: '25px',
                      }}
                    >
                      <span style={{fontSize: '18px'}}>
                        <Link
                          to="https://coinmarketcap.com/currencies/bitfex/?utm_medium=widget&amp;utm_campaign=cmcwidget&amp;utm_source=&amp;utm_content=bitfex"
                          target="_blank"
                          style={{
                            textDecoration: 'none',
                            color: 'rgb(16, 112, 224)',
                          }}
                        >
                          Bitfex (BFX)
                        </Link>
                      </span>
                      <br />
                      <span style={{fontSize: '16px'}}>
                        0.005456 USD
                        <span style={{color: '#d94040'}}>(-2.35%)</span>
                      </span>
                      <br />
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'rgba(39, 52, 64, 0.5)',
                        }}
                      >
                        0.00000076 BTC
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '5px 0px',
                        width: '33%',
                      }}
                    >
                      <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/4785.png" />
                    </div>
                  </div>
                  <div style={{borderTop: '1px solid #e1e5ea', clear: 'both'}}>
                    <div
                      style={{
                        textAlign: 'center',
                        float: 'left',
                        width: '33%',
                        fontSize: '12px',
                        padding: '12px 0',
                        borderRight: '1px solid #e1e5ea',
                        lineHeight: '1.25em',
                      }}
                    >
                      RANK <br />
                      <br />
                      <span style={{fontSize: '17px'}}>973</span>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        float: 'left',
                        width: '33%',
                        fontSize: '12px',
                        padding: '12px 0 16px 0',
                        borderRight: '1px solid #e1e5ea',
                        lineHeight: '1.25em',
                      }}
                    >
                      MARKET CAP <br />
                      <br />
                      <span style={{fontSize: '14px'}}>
                        $616.60 K <span style={{fontSize: '9px'}}>USD</span>
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        float: 'left',
                        width: '33%',
                        fontSize: '12px',
                        padding: '12px 0 16px 0',
                        lineHeight: '1.25em',
                      }}
                    >
                      VOLUME <br />
                      <br />
                      <span style={{fontSize: '14px'}}>
                        $38.17 K <span style={{fontSize: '9px'}}>USD</span>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: '1px solid #e1e5ea',
                      textAlign: 'center',
                      clear: 'both',
                      fontSize: '10px',
                      fontStyle: 'italic',
                      padding: '5px 0',
                    }}
                  >
                    <Link
                      to="https://coinmarketcap.com?utm_medium=widget&amp;utm_campaign=cmcwidget&amp;utm_source=&amp;utm_content=bitfex"
                      target="_blank"
                      style={{
                        textDecoration: 'none',
                        color: 'rgb(16, 112, 224)',
                      }}
                    >
                      Powered by CoinMarketCap
                    </Link>
                  </div>
                </div>
              </div>
              <div className="banner-row-3">
                <h3>Buy, Sell and Trade BFX on</h3>
                <br />
                <p></p>
                <div className="banner-tagline">
                  <div className="view-exchange-btn">
                    <Link
                      to="https://www.probit.com/app/exchange/BFX-BTC"
                      target="_blank"
                    >
                      ProBit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*About BFX*/}
        <section className="about-BFX-section" id="about-BFX">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>BFX Utility & Benefits</h3>
                <div className="tag-content">
                  Integral to the exchange, the BFX demand is fuelled by the
                  various utilities it provides to its holders and its
                  diminishing circulating supply.
                </div>
                <div className="row BFX-benefits">
                  <div className="col-sm-12">
                    <ul className="d-flex flex-wrap">
                      <li>
                        <strong>For Retail Traders:</strong> HODL a minimum
                        number of BFX and get rewarded with Zero-Fee Trading
                      </li>
                      <li>
                        <strong>For Institutional Clients:</strong> HODL BFX and
                        get rewarded with Free Master Account
                      </li>
                      <li>
                        <strong>Disinflationary token supply:</strong> BFX
                        equivalent to 20% of revenue will be burnt till supply
                        reaches 500 mn BFX
                      </li>
                      <li>
                        HODL BFX and get early access to various exchange
                        events, referral programs and more
                      </li>
                      <li>USE BFX to pay trading fees and get 50% discount</li>
                      <li>
                        Stake BFX on Bitfex exchange to unlock exclusive
                        benefits and rewards
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Track BFX*/}
        <section className="crypto-derivatives-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Track BFX</h3>
                <p></p>
                <div className="buy-BFX-CTA text-center">
                  <Link
                    to="https://www.coingecko.com/en/coins/bitfex/"
                    target="_blank"
                  >
                    <img
                      src={CoinGecko}
                      width="200"
                      alt="CoinGecko"
                      border="0"
                    />
                  </Link>
                  <Link
                    to="https://coinmarketcap.com/currencies/bitfex/"
                    target="_blank"
                  >
                    <img src={coinmarketcap} width="200" alt="CMC" border="0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Token Burning*/}
        <section className="live-trading-steps-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Burning of BFX</h3>
                <div className="tag-content">
                  BFX is disinflationary, i.e. its total supply will decrease
                  over time.
                  <br />
                  As per the tokenomics, BFX supply will decrease from 1 billion
                  until it reaches 500 million.
                  <br />
                  This will be achieved by burning BFX equivalent to 20% of
                  revenue collected at regular intervals.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Bfx;
