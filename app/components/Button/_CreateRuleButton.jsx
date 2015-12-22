import React from 'react';
import styles from './button.scss';

import CreateRuleModal from '../Modal/_createRuleModal.jsx';
import Button from './button.jsx';

const CreateRuleButton = (actions) => {
  const handleClick = () => {
    actions.setCurrentModal(<CreateRuleModal/>);
  }

  return(
    <Button action={handleClick} type='primary'>Create New Rule</Button>
  )
}

export default CreateRuleButton;
