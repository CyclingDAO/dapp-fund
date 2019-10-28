import React, { Component } from 'react';

export default class Headline extends Component {
  state = {
    activityStatus: null,
    totalReward: null,
    activityTotalKm: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.contract !== state.prevContract) {
      return {
        activityStatus: null,

        prevContract: props.contract,
      };
    }

    // No state update necessary
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activityStatus === null) {
      this._loadAsyncData(this.props.contract);
    }
  }

  render() {
    return (
      <div className="container">
          <div className="tile">
            <h2>
              <img src="./img/icons/svg/map.svg" />
              {this.state.activityStatus}
            </h2>
            <span>
              <small>Reward:
                <strong> {parseFloat(this.state.totalReward).toFixed(2)} ETH</strong>
              </small>
              <span> 	&#128692; </span>
              <small>Km:
                <strong> {this.state.activityTotalKm}</strong>
              </small>
            </span>
          </div>
      </div>
    );
  }

  _loadAsyncData = async (contract) => {
    if (contract) {
      const activityStatus = this._switchActivityStatus(
        await contract.methods.activityStatus().call()
        );
      this.setState({activityStatus: activityStatus});

      const activityID = await contract.methods.activityID().call();
      this.props.changeAppState(activityID, activityStatus);

      const totalReward = this.props.web3.utils.fromWei(
        await contract.methods.totalReward().call(), 
        'ether');
      this.setState({totalReward: totalReward});

      const activityTotalKm = await contract.methods.activityTotalKm().call();
      this.setState({activityTotalKm: activityTotalKm});
    }
  }

  _switchActivityStatus (status) {
    switch (status) {
      case "0": {
        return "End";
      }
      case "1": {
        return "Start";
      }
      case "2": {
        return "Claim";
      }
      default: {
        return "...";
      }
    }
  }

}