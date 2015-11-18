import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';

import { animateModalOut } from '../Modal/modalAnimations.js';

let ruleCategories = [
  'movement', 'gameplay', 'setup', 'endgame', 'other'
]

let attributes = {
  fields: [
    {type: 'text', label: 'Rule Name', name: 'rule-name', className:['field','full']},
    {type: 'textarea', label: 'Rule Description', name: 'rule-description', className:['field','full']},
    {type: 'select', label: 'Category', name: 'rule-category', options: ruleCategories, className: ['field', 'full']},
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

    let name = $(e.target).find('[name="rule-name"]').val();
    let description = $(e.target).find('[name="rule-description"]').val();
    let category = $(e.target).find('[name="rule-category"]').val();
    let game = this.props.currentGame;

    console.log('category:', category)

    if (!name)
      Alerts.throw("Please enter a name for your rule.", 'error');

    else if (!description)
      Alerts.throw("Please enter a description for your rule.", 'error');

    else if (!category)
      Alerts.throw("Please select a category for your rule.", 'error');

    else (
      Meteor.call('createRule', name, description, category, game, function(err, res){
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
