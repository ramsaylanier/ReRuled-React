import React from 'react';
import styles from './button.scss';

import CreateRulesetModal from '../Modal/_createRulesetModal.jsx';
import Button from './button.jsx';

const CreateRulesetButton = React.createClass({

  handleClick(){
    this.props.actions.setCurrentModal(<CreateRulesetModal/>);
  },

  render(){
    return(
      <Button action={this.handleClick} type='secondary'>Create Ruleset</Button>
    )
  }
})

export default CreateRulesetButton;
