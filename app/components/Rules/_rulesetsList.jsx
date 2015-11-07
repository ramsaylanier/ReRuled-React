import React, { Component } from 'react';

import RulesetItem from './_rulesetItem.jsx';
import styles from './rules.scss';


const RulesetsList = React.createClass({

  render(){
    let heading = this.props.public ? "Public Rulesets:" : "Your Rulesets:";

    return(
      <div className={styles.container}>
        <h5 className={styles.heading}>{heading}</h5>
          <ul className={styles.list}>

            {this._showRulesets()}

          </ul>
      </div>
    )
  },

  _showRulesets(){
    let rulesets = this.props.rulesets;

    if (rulesets.length > 0){
      return (
        rulesets.map( ruleset => {
          return(
            <RulesetItem ruleset={ruleset} {...this.props}/>
          )
        })
      )
    } else {
      return this.props.public ?
        <p>There aren't any rulesets for this game.</p> :
        <p>You haven't created any rulesets for this game.</p>
    }
  }
});


export default RulesetsList;
