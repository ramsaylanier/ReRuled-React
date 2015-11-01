import React, { Component } from 'react';

import styles from './rules.scss';

export default class RuleItem extends Component{

  render(){
    let rule = this.props.rule;

    let excerpt = rule.description.substr(0, 50);
    return(
      <li className={styles.item}>
        <h5 className={styles.title}>{rule.name}</h5>
        <p className={styles.description}>{excerpt}</p>
      </li>
    )
  }
}
