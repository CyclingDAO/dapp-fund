import React, { Component } from 'react';

export default class Claim extends Component {
  state = {
    isLoading: false,
  }

  handleClaim(event) {
    event.preventDefault();

    if(this.props.contract) {
      this.setState({isLoading: true});

      this.props.contract.methods.claim()
        .send({from: this.props.defaultAccount})
        .on('confirmation', (confirmationNumber, receipt) => {
          this.setState({isLoading: false});
        })
        .on('error', () => {
          this.setState({isLoading: false});
        });
    }
  }

  render() {
    let disabled = true;
    if (this.props.activityStatus === "Claim") {
      disabled = false;
    }

    if (this.state.isLoading) {
      disabled = true;
    }

    return (
      <div className="container">
        <button
          className="btn btn-block btn-lg btn-primary btn-claim"
          onClick={this.handleClaim.bind(this)}
          ref="btnClaim"
          disabled={disabled}
        >
          <strong>
            {this.state.isLoading ? 'Loading...' : 'Claim'}
          </strong>
        </button>
      </div>
    );
  }
}