import React, { Component } from 'react';
import CreateRuleButton from '../Button/_createRuleButton';
import CreateRulesetButton from '../Button/_CreateRulesetButton';

import styles from './games.scss';

export default class GameActions extends Component{

  render(){
    return(
      <div className={styles.actions}>
        <CreateRuleButton actions={this.props.actions}/>
        <CreateRulesetButton actions={this.props.actions}/>
      </div>
    )
  }
}
