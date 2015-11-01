import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header/header.jsx';
import { AlertsComponent } from '../components/Alerts/alert.jsx';
import * as ReruledActions from '../actions/index'

import "./app.scss";

 class App extends Component {

   constructor(props){
     super();
     this._currentModal = this._currentModal.bind(this);
   }

  render() {
    const { currentModal, currentGame, actions } = this.props

    let view = React.cloneElement(this.props.view, this.props);

    return (
      <div className="application">
        <Header className="app-header">
          <div className="title-container">
            <span className="title"></span>
          </div>
        </Header>

        <AlertsComponent/>

        {view}

        {this._currentModal()}

      </div>

    )
  }

  _currentModal(){
    if (this.props.currentModal){
      let modal = React.cloneElement(this.props.currentModal, this.props);

      return(
        modal
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentGame: state.games.currentGame,
    rules: state.rules.rules,
    currentModal: state.ui.currentModal
  }
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators(ReruledActions, dispatch);
  return {
    actions: actions
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)