import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    let wallet = "connect wallet"
    if (this.props.defaultAccount !== null) {
      wallet = this.props.defaultAccount.substr(0, 5) + '...' + this.props.defaultAccount.substr(-4)
    }
    
    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
            </button>
            <a className="navbar-brand" href="#">CyclingFund</a>
          </div>
          <div className="navbar-collapse collapse">
            <button
              className="btn btn-primary navbar-btn navbar-right btn-sm"
              onClick={this.props.injectWeb3.bind(this)}>
              <strong>{wallet}</strong>
            </button>
          </div>
        </div>
      </div>
    );
  }
}