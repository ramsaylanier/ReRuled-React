import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';

import { animateModalOut } from '../Modal/modalAnimations.js';

let ruleCategories = () => {
  return [
    {value:'movement', text: 'movement'},
    {value:'gameplay', text: 'gameplay'},
    {value:'setup', text: 'setup'},
    {value:'endgame', text: 'other'}
  ]
}

let rulesets = () => {
  let rulesets = Rulesets.find().fetch();
  rulesets = _.map(rulesets, function(ruleset){
    return {value: ruleset._id, text: ruleset.name}
  })

  rulesets.unshift({value: null, text: 'none'})

  return rulesets;
}

let attributes = {
  fields: [
    {type: 'text', label: 'Rule Name', name: 'rule-name', className:['field','full']},
    {type: 'textarea', label: 'Rule Description', name: 'rule-description', className:['field','full']},
    {type: 'select', label: 'Category', name: 'rule-category', options: ruleCategories, className: ['field', 'full']},
    {type: 'select', label: 'Rulesets', name: 'rule-ruleset', options: rulesets, className: ['field', 'full']},
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

    let rule = {
      name: $(e.target).find('[name="rule-name"]').val(),
      description: $(e.target).find('[name="rule-description"]').val(),
      game: this.props.currentGame,
      category: $(e.target).find('[name="rule-category"]').val()
    }

    let rulesetId = $(e.target).find('[name="rule-ruleset"]').val();

    if (!rule.name)
      Alerts.throw("Please enter a name for your rule.", 'error');

    else if (!rule.description)
      Alerts.throw("Please enter a description for your rule.", 'error');

    else if (!rule.category)
      Alerts.throw("Please select a category for your rule.", 'error');

    else {
      Meteor.call('createRule', rule, rulesetId, function(err, res){
        if (err){
          Alerts.throw(err.reason, 'error')
        } else {
          animateModalOut();
          setTimeout( () => {
            setCurrentModal(null);
          }, 500);
        }
      })
    }
  }
});

export default CreateRuleForm;
