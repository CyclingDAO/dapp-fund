import React, { Component } from 'react';

export default class Claim extends Component {
  handleClaim(event) {
    event.preventDefault();

    if(this.props.contract) {
      this.props.contract.methods.claim().send({from: this.props.defaultAccount})
    }
  }

  render() {
    let disabled = true;
    if (this.props.activityStatus === "Claim") {
      disabled = false;
    }

    return (
      <div className="container">
        <button
          className="btn btn-block btn-lg btn-primary btn-claim"
          onClick={this.handleClaim.bind(this)}
          ref="btnClaim"
          disabled={disabled}
        >
          <strong>Claim</strong>
        </button>
      </div>
    );
  }
}