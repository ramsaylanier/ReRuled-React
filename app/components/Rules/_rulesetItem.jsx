import React, { Component } from 'react';

import styles from './rules.scss';

export default class RulesetItem extends Component{

  render(){
    let ruleset = this.props.ruleset;

    return(
      <li className={styles.item}>
        <h5 className={styles.title}>{ruleset.name}</h5>
      </li>
    )
  }
}
