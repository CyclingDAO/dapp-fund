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
      <div className="tile">
        <h3>
          <img src="./img/icons/svg/map.svg" />
          {this.state.activityStatus}
        </h3>
        <span>
          <small>奖金: 
            <strong> {parseFloat(this.state.totalReward).toFixed(2)} ETH</strong>
          </small>
          <span> 	&#128692; </span>
          <small>总里程: 
            <strong> {this.state.activityTotalKm} km</strong>
          </small>
        </span>
      </div>
    );
  }

  _loadAsyncData = async (contract) => {
    if (contract) {
      const activityStatus = this._switchActivityStatus(
        await contract.methods.activityStatus().call()
      );
      this.setState({ activityStatus: activityStatus });

      const activityID = await contract.methods.activityID().call();
      this.props.changeAppState(activityID, activityStatus);

      const totalReward = this.props.web3.utils.fromWei(
        await contract.methods.totalReward().call(),
        'ether');
      this.setState({ totalReward: totalReward });

      const activityTotalKm = await contract.methods.activityTotalKm().call();
      this.setState({ activityTotalKm: activityTotalKm });
    }
  }

  _switchActivityStatus(status) {
    switch (status) {
      case "0": {
        return "结束";
      }
      case "1": {
        return "进行中";
      }
      case "2": {
        return "领奖";
      }
      default: {
        return "...";
      }
    }
  }

}