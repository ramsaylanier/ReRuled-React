import React, { Component } from 'react';

import RuleItem from './_ruleItem.jsx';
import styles from './rules.scss';


export default class RulesList extends Component{

  render(){
    let rules = this.props.rules;
    let actions = this.props.actions;
    let heading = this.props.public ? "Public Rules:" : "Your Rules:";

    return(
      <div className={styles.container}>
        <h5 className={styles.heading}>{heading}</h5>
          <ul className={styles.list}>
            {rules.map( rule => {
              return(
                <RuleItem rule={rule} {...this.props}/>
              )
            })}
          </ul>
      </div>
    )
  }
}
