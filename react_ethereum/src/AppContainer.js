import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {App} from './App.js';

//FOLLOWING THE CONTAINER - PRESENTATION COMPONENT PATTERN. THIS IS CONTAINER COMPONENT. - Doesn't render!
class AppContainer extends Component {
  constructor(props) {
    super(props);

    const MyContract = window.web3.eth.contract
      ([{"constant":true,"inputs":[],"name":"pseudoRandomResult","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"ExperimentComplete","type":"event"},{"constant":true,"inputs":[],"name":"getSecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newState","type":"string"}],"name":"setState","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"setExperimentInMotion","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);

    this.state = {
      ContractInstance: MyContract.at ('0xa464e91ade43494531729d80909ad31d332a5288'), //address
      contractState: ''
      //contractState is added to React component state for controlled input, which is triggered anytime the user adds or delete in the input field
      //Above is a React Controlled Input, which sets us up for entering a new state for our smart contract.

      /* form elements have their own state. But you can change React's state only using setState(). combine the two. the React component that renders a form also controls what happens in that form on subsequent user input

      */
    }

    this.querySecret = this.querySecret.bind(this);
    this.queryState = this.queryState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.queryResult = this.queryResult.bind(this);
    this.activateExperiment = this.activateExperiment.bind(this);
    
    this.state.event = this.state.ContractInstance.ExperimentComplete();
    //^ listen to the event emitted by SC.
  }

  querySecret() {
    const {getSecret} = this.state.ContractInstance; //extract getSecret() from SC

    getSecret ((err, secret) => {
      //save result in secret var.
      if (err) console.error ('An error occured:::', err);
      console.log ("The secret is:", secret);
    })
  }

  queryState() {
    const {getState} = this.state.ContractInstance; //extract getState() from SC

    getState ((err, state) => {
      if (err) console.error ('An error occured', err);
      console.log ("The state of SC is: ", state);
    })
  }

  handleSubmit(event) { //on submitting form.    
    
    event.preventDefault ();

      const { setState } = this.state.ContractInstance; //extract setState() from SC
      const { contractState: newState } = this.state;
      //newState is the new value inputted after submitting and after handleChange() updates this.state.

      let valueToGive = window.web3.toWei (0.01, 'ether');
      //calling the contract's setState()
      setState (newState, {gas: 300000, from: window.web3.eth.accounts[0], value: valueToGive}, (err, res) => {
        /**
         * setState - 3 params.
         * 1st -> newState
         * 2nd -> web3 object containing payment info since setState() is payable
         * 3rd -> callback ().
         */
          console.log ('Smart contract state is changing.'); 
          //since transaction takes time to occur!
      }
    )
  }

  handleChange(e) {
    //When user does  change - also change the React Component State- ContractState React.
    const changedState = e.target.value;
	this.setState({ contractState: changedState })
  }

  queryResult() {
    //extract the automatically created getter function for pseudoRandomResult
    const { pseudoRandomResult } = this.state.ContractInstance;

    pseudoRandomResult ((err, result) => {
      console.log ('This is the smart contract conditional::::', result);
    })
  }

  activateExperiment() {
    const { setExperimentInMotion } = this.state.ContractInstance;

    setExperimentInMotion ({gas: 300000, from: window.web3.eth.accounts[0], value: window.web3.toWei (0.01, 'ether')}, (err, result) => {
      console.log ('Experiment to determine true or false set in motion.');
    })
  }

  render() {
    
    this.state.event.watch ((err, event) => {
      if (err) console.error ('An error occured::::', err);
      console.log ('This is the event::::', event); //logfs the event.
      console.log ('This is the experiment result::::', event.args.result);
      //because we defined result as the bool for the event..

      //NOW if event.args.result == true do something..... TYPE..
    });     

     
    
    return <App 
		querySecret= {this.querySecret }
		queryState= {this.queryState }
		handleSubmit = { this.handleSubmit }
		handleChange = { this.handleChange } //receives an event object.
		contractState = { this.state.contractState }
		queryResult = { this.queryResult }
		activateExperiment = { this.activateExperiment }/>;
  }
}

export default AppContainer;
