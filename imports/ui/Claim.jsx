import React, { Component } from 'react';
import Alert from './Alert.jsx'

export default class Claim extends Component {
  state = {
    alertHidden: true,
    alertType: "success",
    alertMessage: "message",
    alertLink: null,
  }

  handleClaim(event) {
    event.preventDefault();

    if(this.props.contract) {
      this.props.contract.methods.claim()
        .send({
          from: this.props.defaultAccount,
        }, (error, hash) => {
          if (error) {
            this.setState({
              alertHidden: false,
              alertType: error.code === 4001 ? "warning" : "danger",
              alertMessage: error.message,
              alertLink: null,
            });

            return
          }

          this.setState({
            alertHidden: false,
            alertType: "success",
            alertMessage: "交易发送成功！",
            alertLink: {
              href: this.props.etherscan + "tx/" + hash,
              value: "查看交易",
            },
          });
        });
    }
  }

  changeAlertHidden = (hidden) => {
    this.setState({alertHidden: hidden});
  }

  render() {
    let disabled = true;
    if (this.props.activityStatus === "领奖") {
      disabled = false;
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
            领 取
          </strong>
        </button>
      </div>
    );
  }
}