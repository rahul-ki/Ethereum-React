import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//FOLLOWING THE CONTAINER - PRESENTATION COMPONENT PATTERN. THIS IS PRESENTATION COMPONENT. - ONLY renders!
//this is a functional stateless component. can also be written as a function:
/*
export const App = () => {
	return ( ...... );
}
*/
export class App extends Component {
	
	render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React connected to Ethereum</h1>
        </header>
        
        <br />
        <br />
        <button onClick= {this.props.querySecret }> Query SC's Secret </button>
        <br />
        <br />
        <button onClick= {this.props.queryState }> Query SC's State </button>

        <br />
        <br />
        
        <form onSubmit= {this.props.handleSubmit}>
          <input
            type="text" //HTML Element. "text"-creates a one line text input field. Can be "radio"/"submit etc." 
            name="state-change" //like an id of the inpit field.
            placeholder="Enter new state.."  //comes in background
            value= { this.props.contractState }  //The value attribute specifies the initial value for an input field
            onChange={ this.props.handleChange } //- EVENT EXECUTED when a user changes the content of an input field ie runs on every keystroke. It passes an event object to this.props.handleChange.
          /> 
          <button type="submit"> Submit </button> 
        </form>           
        
        <br />
        <br />

        <button onClick= {this.props.queryResult}> Query the SC's conditional result </button>

        <br />
        <br />

        <button onClick = {this.props.activateExperiment}> Start Experiment </button>

      </div>
    );
  }
}