import React from 'react';
import styles from './button.scss';

import AddRuleModal from '../Modal/_AddRuleModal.jsx';
import Button from './button.jsx';

const CreateRuleButton = React.createClass({

  handleClick(){
    console.log(this.props);
    this.props.actions.setCurrentModal(<AddRuleModal/>);
  },

  render(){
    return(
      <Button action={this.handleClick} type={styles.primary}>Create New Rule</Button>
    )
  }
})

export default CreateRuleButton;
