import React from 'react';
import styles from './button.scss';
import Button from './button.jsx';

const LogoutButton = (actions) => {
  const handleClick = () => {
    Meteor.logout( error => {
      
    });
  }

  return(
    <Button action={handleClick} type='none'>Logout</Button>
  )
}

export default LogoutButton;
