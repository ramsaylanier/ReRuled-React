import React from 'react';
import Modal from './modal.jsx';

import CreateRuleForm from '../Form/_createRuleForm.jsx';

const CreateRuleModal = React.createClass({
  render(){
    return(
      <Modal {...this.props}>
        <CreateRuleForm {...this.props}/>
      </Modal>
    )
  }
})

export default CreateRuleModal;
