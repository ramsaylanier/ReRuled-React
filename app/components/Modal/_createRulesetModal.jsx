import React from 'react';
import Modal from './modal.jsx';

import CreateRulesetForm from '../Form/_createRulesetForm.jsx';

const CreateRulesetModal = React.createClass({
  render(){
    return(
      <Modal {...this.props}>
        <CreateRulesetForm {...this.props}/>
      </Modal>
    )
  }
})

export default CreateRulesetModal;
