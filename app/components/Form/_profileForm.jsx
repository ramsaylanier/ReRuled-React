import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';

let attributes = {
  fields: [
    {type: 'text', label: 'Username', name: 'username-field', className:['field','full']},
    {type: 'email', label: 'Email', name: 'email-field', className: ['field, full']},
    {type: 'submit', value: 'Update Profile', className: ['submit','full']}
  ],
  type: 'create-rule-form',
  animateIn: false
}

const ProfileForm = React.createClass({

  componentWillMount(){
    attributes.fields[0].value = Meteor.user().username;
    attributes.fields[1].value = Meteor.user().emails[0].address;
  },

  render(){
    return(
      <Form attributes={attributes} onSubmit={this._onSubmit} />
    )
  },

  _onSubmit(e){
    e.preventDefault();

    var username = $(e.target).find('[name="username-field"]').val();
    var email = $(e.target).find('[name="email-field"]').val();

    if (!username)
      Alerts.throw("Please enter a username.", 'error');

    else (
      Meteor.call('updateUserProfile', username, email, function(err, res){
        if (err){
          Alerts.throw(err.reason, 'error')
        } else {
          Alerts.throw('Profile Updated!', 'success')
        }
      })
    )
  }
});

export default ProfileForm;
