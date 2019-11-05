import React, { Component } from 'react';

export default class Alert extends Component {
  handleClose(event) {
    event.preventDefault();

    this.props.setHidden(true);
  }

  render() {
    let alertType = "alert alert-" + this.props.type;
    if (this.props.hidden) {
      alertType = alertType + " alert-hidden";
    }

    return (
      <div className={alertType} role="alert">
        <button type="button" className="close" onClick={this.handleClose.bind(this)}>
          <span className="fui-cross" aria-hidden="true"/>
        </button>
        <small>{this.props.message}</small>
        <span> </span>
        <small>
          <a className=".alert-link"
          href={this.props.link ? this.props.link.href : ''}>
            {this.props.link ? this.props.link.value : ''}
          </a>
        </small>
      </div>
    )
  }
}