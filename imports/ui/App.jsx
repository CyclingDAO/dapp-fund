import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Headline from './Headline.jsx';
import Rank from './Rank.jsx';
import Claim from './Claim.jsx';
import Footer from './Footer.jsx';
import Web3 from 'web3';
import { fundAddr, fundAbi } from '../config'

class App extends Component {
  state = {
    web3: null,
    contract: null,
    defaultAccount: null,
    activityStatus: "End",
  }

  componentDidMount() {
    this.injectWeb3()
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (e) =>{
        this.injectWeb3()
      })
    }
  }

  injectWeb3 = async () => {
    if (typeof window.ethereum !== 'undefined'
    || (typeof window.web3 !== 'undefined')) {
      const accounts = await window.ethereum.enable();
      // Web3 browser user detected. You can now use the provider.
      const provider = window['ethereum'] || window.web3.currentProvider;

      // wallet
      let web3 = new Web3(provider);
      let defaultAccount = accounts[0];

      // contract
      let contract = new web3.eth.Contract(fundAbi, fundAddr, {
        from: defaultAccount,
      });

      this.setState({
        web3: web3,
        contract: contract,
        defaultAccount: defaultAccount,
      });
    }
  }

  changeAppState = (id, status) => {
    this.setState({
      activityID: id,
      activityStatus: status,
    });
  }

  render() {
    return (
      <div>
        <Nav
          defaultAccount={this.state.defaultAccount} 
          injectWeb3={this.injectWeb3}
        />
        <Headline 
          web3={this.state.web3}
          contract={this.state.contract}
          changeAppState={this.changeAppState}
        />
        <Rank
          contract={this.state.contract}
          activityID={this.state.activityID}
        />
        <Claim
          contract={this.state.contract}
          defaultAccount={this.state.defaultAccount} 
          activityStatus={this.state.activityStatus}
        />
        <Footer />
      </div>
    )
  }
}

export default App;
