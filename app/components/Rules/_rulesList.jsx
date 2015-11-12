import React from 'react';
import RuleItem from './_ruleItem.jsx';
import styles from './rules.scss';
import { BookIcon } from '../Icons/icons.jsx';


const RulesList = React.createClass({

  render(){
    let rules = this.props.rules;
    return(
      <div className={styles.container}>
          {this._showRules()}
      </div>
    )
  },

  _showRules(){
    let rules = this.props.rules;
    if (this.props.rules.length > 0){
      return(
        <ul className={styles.list}>
          {rules.map( rule => {
            return(
              <RuleItem key={rule._id} rule={rule} {...this.props}/>
            )
          })}
        </ul>
      )
    } else {
        return this.props.public ?
          <p>There aren't any rules for this game.</p> :
          <p>You haven't created any rules for this game.</p>
    }
  }
});

export default RulesList;
