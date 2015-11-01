import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';


let attributes = {
  fields: [
    {type: 'text', label: 'Ruleset Name', name: 'ruleset-name', className:['field','full']},
    {type: 'submit', value: 'Create Ruleset', className: ['submit','full']}
  ],
  type: 'create-rule-form',
  animateIn: false
}

const CreateRulesetForm = React.createClass({

  render(){
    return(
      <Form attributes={attributes} onSubmit={this._onSubmit} />
    )
  },

  _onSubmit(e){
    e.preventDefault();
    let setCurrentModal = this.props.actions.setCurrentModal;


    var ruleset = {
      name: $(e.target).find('[name="ruleset-name"]').val(),
      game: this.props.currentGame
    }

    if (!ruleset.name)
      Alerts.throw("Please enter a name for your ruleset.", 'error');

    else (
      Meteor.call('createRuleset', ruleset, function(err, res){
        if (err){
          Alerts.throw(err.reason, 'error')
        } else {
          $('.modal__base').remove();
          $('body').removeClass('modal-active');
          setCurrentModal(null);
        }
      })
    )
  }
});

export default CreateRulesetForm;
