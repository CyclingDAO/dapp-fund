import React, { Component } from 'react';

export default class Claim extends Component {
  handleClaim(event) {
    event.preventDefault();

    if(this.props.contract) {
      this.props.contract.methods.claim().send({from: this.props.defaultAccount})
    }
  }

  render() {
    let btnClass = "btn btn-block btn-lg btn-primary disabled btn-claim";
    if (this.props.activityStatus === "Claim") {
      btnClass = "btn btn-block btn-lg btn-primary btn-claim";
    }

    return (
      <div className="container">
        <button
          className={btnClass}
          onClick={this.handleClaim.bind(this)}
        >
          <strong>Claim</strong>
        </button>
      </div>
    );
  }
}