import React from 'react';
import styles from './button.scss';

import CreateRulesetModal from '../Modal/_createRulesetModal.jsx';
import Button from './button.jsx';

const CreateRulesetButton = (actions) => {
  const handleClick = () => {
    actions.setCurrentModal(<CreateRulesetModal/>);
  }

  return (
    <Button action={handleClick} type='secondary'>Create Ruleset</Button>
  )
}

export default CreateRulesetButton;
