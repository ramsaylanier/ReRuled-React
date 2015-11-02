import React, { Component } from 'react';

import RulesetItem from './_rulesetItem.jsx';
import styles from './rules.scss';


export default class RulesetsList extends Component{

  componentDidMount(){
    Session.set('rulesetCount', 0);
  }

  render(){
    let rulesets = this.props.rulesets;
    let heading = this.props.public ? "Public Rulesets:" : "Your Rulesets:";

    return(
      <div className={styles.container}>
        <h5 className={styles.heading}>{heading}</h5>
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
