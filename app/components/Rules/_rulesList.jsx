import React, { Component } from 'react';

import RuleItem from './_ruleItem.jsx';
import styles from './rules.scss';


export default class RulesList extends Component{

  render(){

    let rules = this.props.rules;

    return(
      <div className={styles.container}>
        <h5 className={styles.heading}>Rules:</h5>
          <ul className={styles.list}>
            {rules.map( rule => {
              return(
                <RuleItem rule={rule}/>
              )
            })}
          </ul>
      </div>
    )
  }
}
