import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <header className="md-header" data-md-component="header">
        <nav className="md-header-nav md-grid">
          <div className="md-flex">
            <div className="md-flex__cell md-flex__cell--shrink">
              <a
                href="."
                title="Bitfex Documentation"
                className="md-header-nav__button md-logo"
              >
                <i className="md-icon"></i>
              </a>
            </div>
            <div className="md-flex__cell md-flex__cell--shrink">
              <label
                className="md-icon md-icon--menu md-header-nav__button"
                htmlFor="__drawer"
              />
            </div>
            <div className="md-flex__cell md-flex__cell--stretch">
              <div
                className="md-flex__ellipsis md-header-nav__title"
                data-md-component="title"
              >
                <span className="md-header-nav__topic">
                  Bitfex Documentation
                </span>
                <span className="md-header-nav__topic">
                  Welcome to Bitfex Documentation
                </span>
              </div>
            </div>
            <div className="md-flex__cell md-flex__cell--shrink">
              <label
                className="md-icon md-icon--search md-header-nav__button"
                htmlFor="__search"
              />
              <div
                className="md-search"
                data-md-component="search"
                role="dialog"
              >
                <label className="md-search__overlay" htmlFor="__search" />
                <div className="md-search__inner" role="search">
                  <form className="md-search__form" name="search">
                    <input
                      type="text"
                      className="md-search__input"
                      name="query"
                      placeholder="Search"
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="off"
                      spellCheck="false"
                      data-md-component="query"
                      data-md-state="active"
                    />
                    <label
                      className="md-icon md-search__icon"
                      htmlFor="__search"
                    />
                    <button
                      type="reset"
                      className="md-icon md-search__icon"
                      data-md-component="reset"
                      tabIndex={-1}
                    >
                      
                    </button>
                  </form>
                  <div className="md-search__output">
                    <div className="md-search__scrollwrap" data-md-scrollfix>
                      <div
                        className="md-search-result"
                        data-md-component="result"
                      >
                        <div className="md-search-result__meta">
                          Type to start searching
                        </div>
                        <ol className="md-search-result__list" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
