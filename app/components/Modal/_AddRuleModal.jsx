import React from 'react';
import Modal from './modal.jsx';

const AddRuleModal = React.createClass({
  render(){
    console.log('AddRuleModal:', this.props)
    return(
      <Modal {...this.props}>
        <p>Add Rule Modal</p>
      </Modal>
    )
  }
})

export default AddRuleModal;
