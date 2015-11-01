import React from 'react';
import styles from './button.scss';

import CreateRuleModal from '../Modal/_createRuleModal.jsx';
import Button from './button.jsx';

const CreateRuleButton = React.createClass({

  handleClick(){
    this.props.actions.setCurrentModal(<CreateRuleModal/>);
  },

  render(){
    return(
      <Button action={this.handleClick} type={styles.primary}>Create New Rule</Button>
    )
  }
})

export default CreateRuleButton;
