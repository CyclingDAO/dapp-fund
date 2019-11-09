import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Alert from './Alert.jsx';
import Headline from './Headline.jsx';
import Rank from './Rank.jsx';
import Claim from './Claim.jsx';
import Donate from './Donate';
import Footer from './Footer.jsx';
import Web3 from 'web3';
import { getNetworkConfigs, fundAbi } from '../config'

class App extends Component {
  state = {
    networkType: null,
    etherscan: null,
    memberAddrs: [],
    web3: null,
    contract: null,
    defaultAccount: null,
    activityStatus: "End",
    noteHidden: true,
    noteMessage: "",
    donateAddr: "",
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
      const web3 = new Web3(provider);
      const defaultAccount = accounts[0];

      // networkType
      const networkType = await web3.eth.net.getNetworkType();
      const configs = getNetworkConfigs(networkType); 

      // contract
      let contract = new web3.eth.Contract(fundAbi, configs.fundAddr, {
        from: defaultAccount,
      });

      // network note
      let noteHidden = true;
      if (networkType !== "main") {
        noteHidden = false;
      }
      let noteMessage = "Note: Testnet Network";
      if (networkType !== "kovan") {
        noteMessage = "Note: Not Support Network";
      }

      this.setState({
        networkType: networkType,
        etherscan: configs.etherscan,
        memberAddrs: configs.memberAddrs,
        web3: web3,
        contract: contract,
        defaultAccount: defaultAccount,
        noteHidden: noteHidden,
        noteMessage: noteMessage,
        donateAddr: configs.fundAddr,
      });
    }
  }

  changeAppState = (id, status) => {
    this.setState({
      activityID: id,
      activityStatus: status,
    });
  }

  changeNoteHidden = (hidden) => {
    this.setState({noteHidden: hidden});
  }

  render() {

    return (
      <div>
        <Nav
          defaultAccount={this.state.defaultAccount} 
          injectWeb3={this.injectWeb3}
        />
        <div className="container">
          <Alert
            hidden={this.state.noteHidden}
            type="warning"
            message={this.state.noteMessage}
            setHidden={this.changeNoteHidden}
          />
          <Headline 
            web3={this.state.web3}
            contract={this.state.contract}
            changeAppState={this.changeAppState}
          />
          <Rank
            contract={this.state.contract}
            activityID={this.state.activityID}
            activityStatus={this.state.activityStatus}
            memberAddrs={this.state.memberAddrs}
          />
          <Claim
            etherscan={this.state.etherscan}
            contract={this.state.contract}
            defaultAccount={this.state.defaultAccount} 
            activityStatus={this.state.activityStatus}
          />
          <hr/>
          <Donate
            donateAddr={this.state.donateAddr}
            web3={this.state.web3}
            etherscan={this.state.etherscan}
            defaultAccount={this.state.defaultAccount} 
            activityStatus={this.state.activityStatus}
          />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
