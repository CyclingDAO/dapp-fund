import React, { Component } from 'react';

export default class Rank extends Component {
  state = {
    members: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.contract !== state.prevContract) {
      return {
        members: null,
        prevContract: props.contract,
      };
    }

    // No state update necessary
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.members === null) {
      this._loadAsyncData(this.props.contract, this.props.memberAddrs);
    }
  }

  renderRank() {
    let members = this.state.members ? this.state.members : [];

    // clean old activity km
    members.map((member) => {
      if (member.updatedActivityID !== this.props.activityID) {
        member.activityKm = 0;
      }
    });

    // rank sort
    members.sort((a, b) => {
      if (~~b.activityKm === ~~a.activityKm) {
        return (~~b.usedKm - ~~a.usedKm)
      }
      return (~~b.activityKm - ~~a.activityKm)
    });

    let num = 0;
    return members.map((member) => {
      if (member.name === "") {
        return
      }

      num++;
      let liClass = "list-group-item";
      let iconClass = "rank-icon";
      let iconNum = "#" + num;
      if (num === 1) {
        liClass = "list-group-item rank-first";
        iconClass = "rank-icon fui-star";
        iconNum = "";
      }

      let checkClass = "rank-check fui-radio-unchecked";
      if (member.isClaimed) {
        checkClass = "rank-check fui-check-circle";
      }

      return (
        <li key={num} className={liClass}>
          <div className="rank-head">
            <div className={iconClass}>{iconNum}</div>
            <div className={checkClass} />
            <h5 className="rank-name">
              {member.name}
            </h5>
          </div>
          <div className="rank-body">
            <span>活动: </span>
            <span>{member.activityKm} km</span>
            <span className="rank-member-total">历史: </span>
            <span>{member.usedKm} km</span>
          </div>
        </li>);
    });

  }

  render() {
    return (
      <ul className="list-group rank-group">
        {this.renderRank()}
      </ul>
    );
  }

  _loadAsyncData = async (contract, members) => {
    let ms = [];
    if (contract) {
      const methods = contract.methods
      for (let member of members) {
        ms.push(await methods.members(member).call());
      }
    }

    this.setState({
      members: ms,
    });
  }

}