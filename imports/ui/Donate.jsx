import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Alert from './Alert.jsx'

export default class Claim extends Component {
  state = {
    alertHidden: true,
    alertType: "success",
    alertMessage: "message",
    alertLink: null,
  }

  handleDonate(event) {
    event.preventDefault();

    if (this.props.web3) {
      const value = ReactDOM.findDOMNode(this.refs.ethDonate).value.trim();
      try {
        this.props.web3.eth
          .sendTransaction({
            from: this.props.defaultAccount,
            to: this.props.donateAddr,
            value: this.props.web3.utils.toWei(value, "ether"),
            gas: 50000,
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
              alertType: "info",
              alertMessage: "捐赠交易发送成功！",
              alertLink: {
                href: this.props.etherscan + "tx/" + hash,
                value: "查看交易",
              }
            });
          });
      } catch (error) {
        this.setState({
          alertHidden: false,
          alertType: "danger",
          alertMessage: error.message,
          alertLink: null,
        });
      }
    }
  }

  changeAlertHidden = (hidden) => {
    this.setState({ alertHidden: hidden });
  }

  render() {
    let disabled = true;
    if (this.props.activityStatus === "进行中") {
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
        <div className="form-group">
          <input type="text" className="form-control" placeholder="捐赠 ETH 额度" ref="ethDonate"></input>
        </div>
        <button
          className="btn btn-block btn-lg btn-primary btn-claim"
          onClick={this.handleDonate.bind(this)}
          disabled={disabled}
        >
          <strong>
            活 动 捐 赠
            </strong>
        </button>
      </div>
    );
  }
}