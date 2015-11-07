import React from 'react';
import Modal from './modal.jsx';
import RulesList from '../Rules/_rulesList.jsx';

const EditRulesetModal = React.createClass({
  render(){
    Session.set('ruleCount', 0);
    let ruleset = this.props.currentRuleset;

    return(
      <Modal {...this.props}>
        <h5>{ruleset.name}</h5>

        {this._showRules()}

      </Modal>
    )
  },

  _showRules(){
    let ruleset = this.props.currentRuleset;
    if (ruleset.rules){
      return (
        <RulesList rules={ruleset.rules} excerptLength={1000} noHeading={true}/>
      )
    } else {
      return (
        <p>This ruleset has no rules!</p>
      )
    }
  }
})

export default EditRulesetModal;
