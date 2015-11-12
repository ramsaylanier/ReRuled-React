import React, { Component } from 'react';

import RulesetItem from './_rulesetItem.jsx';
import styles from './rules.scss';
import { SetIcon } from '../Icons/icons.jsx';


const RulesetsList = React.createClass({

  render(){
    return(
      <div className={styles.container}>
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
