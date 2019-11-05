import React, { Component } from 'react';
import Alert from './Alert.jsx'

export default class Claim extends Component {
  state = {
    isLoading: false,

    alertHidden: true,
    alertType: "success",
    alertMessage: "message",
    alertLink: null,
  }

  handleClaim(event) {
    event.preventDefault();

    if(this.props.contract) {
      this.setState({isLoading: true});

      this.props.contract.methods.claim()
        .send({from: this.props.defaultAccount})
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(receipt);
          this.setState({
            isLoading: false,
            alertHidden: false,
            alertType: "success",
            alertMessage: "Claim Success!",
            alertLink: {
              href: this.props.etherscan + "tx/" + receipt.transactionHash,
              value: "tx link",
            },
          });
        })
        .on('error', (e) => {
          let alertType = "danger"
          let alertMessage = "Claim Failed!"
          if (e.code === 4001) {
            alertType = "warning"
            alertMessage = "Claim Cancelled!"
          }
          this.setState({
            isLoading: false,
            alertHidden: false,
            alertType: alertType,
            alertMessage: alertMessage,
            alertLink: null,
          });
        });
    }
  }

  changeAlertHidden = (hidden) => {
    this.setState({alertHidden: hidden});
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
      <div>
        <Alert
          hidden={this.state.alertHidden}
          type={this.state.alertType}
          message={this.state.alertMessage}
          link={this.state.alertLink}
          setHidden={this.changeAlertHidden}
        />
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