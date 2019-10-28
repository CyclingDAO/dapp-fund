import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <div className="container">
        <hr/>
        <small>@outprog</small>
        <a 
          className="pull-right" 
          href="https://github.com/cyclingdao"
          target="_blank">
          <span className="fui-github"></span>
        </a>
      </div>
    );
  }
}