import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';

import { animateModalOut } from '../Modal/modalAnimations.js';

let attributes = {
  fields: [
    {type: 'text', label: 'Rule Name', name: 'rule-name', className:['field','full']},
    {type: 'textarea', label: 'Rule Description', name: 'rule-description', className:['field','full']},
    {type: 'submit', value: 'Create Rule', className: ['submit','full']}
  ],
  type: 'create-rule-form',
  animateIn: false
}

const CreateRuleForm = React.createClass({

  render(){
    return(
      <Form attributes={attributes} onSubmit={this._onSubmit} />
    )
  },

  _onSubmit(e){
    e.preventDefault();
    let setCurrentModal = this.props.actions.setCurrentModal;

    var rule = {
      name: $(e.target).find('[name="rule-name"]').val(),
      description: $(e.target).find('[name="rule-description"]').val(),
      game: this.props.currentGame
    }

    if (!rule.name)
      Alerts.throw("Please enter a name for your rule.", 'error');

    else if (!rule.description)
      Alerts.throw("Please enter a description for your rule.", 'error');

    else (
      Meteor.call('createRule', rule, function(err, res){
        if (err){
          Alerts.throw(err.reasons, 'error')
        } else {
          animateModalOut();
          setTimeout( () => {
            setCurrentModal(null);
          }, 500);
        }
      })
    )
  }
});

export default CreateRuleForm;