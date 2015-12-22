import React, { Component } from 'react';
import CreateRuleButton from '../Button/_createRuleButton';
import CreateRulesetButton from '../Button/_createRulesetButton';

import styles from './games.scss';

export default class GameActions extends Component{

  render(){
    return(
      <div className={styles.actions}>
        <CreateRuleButton {...this.props.actions}/>
        <CreateRulesetButton {...this.props.actions}/>
      </div>
    )
  }
}
