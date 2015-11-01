import React, { Component } from 'react';

import RulesetItem from './_rulesetItem.jsx';
import styles from './rules.scss';


export default class RulesetsList extends Component{

  render(){

    let rulesets = this.props.rulesets;

    return(
      <div className={styles.container}>
        <h5 className={styles.heading}>Rulesets:</h5>
          <ul className={styles.list}>
            {rulesets.map( ruleset => {
              return(
                <RulesetItem ruleset={ruleset}/>
              )
            })}
          </ul>
      </div>
    )
  }
}
