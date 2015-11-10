import React from 'react';
import Modal from './modal.jsx';
import RulesList from '../Rules/_rulesList.jsx';

const EditRulesetModal = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData(){
    return{
      ruleset: Rulesets.findOne(this.props.currentRuleset)
    }
  },

  componentWillUnmount(){
      FlowRouter.setQueryParams({ruleset: null})
  },

  render(){
    let ruleset = this.data.ruleset;

    if (ruleset){
      return(
        <Modal {...this.props}>
          <h5>{ruleset.name}</h5>

          {this._showRules()}

        </Modal>
      )
    } else {
      return(
        <Modal></Modal>
      )
    }
  },

  _showRules(){
    let ruleset = this.data.ruleset;
    if (ruleset.rules){
      return (
        <RulesList rules={ruleset.rules} excerptLength={1000} noHeading={true} actions={this.props.actions}/>
      )
    } else {
      return (
        <p>This ruleset has no rules!</p>
      )
    }
  }
})

export default EditRulesetModal;
