import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app.jsx';
import configureStore from './store/store.js';

let store = configureStore();

export default class Root extends Component{
  render(){

    return(
      <Provider store={store}>
        <App view={this.props.view}/>
      </Provider>
    )
  }
}
