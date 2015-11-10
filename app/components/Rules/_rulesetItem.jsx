import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './rules.scss';

import EditRulesetModal from '../Modal/_editRulesetModal.jsx';
import Button from '../Button/button.jsx';
import { EditIcon, DeleteIcon } from '../Icons/icons.jsx';

const RulesetItem = React.createClass({

  componentDidMount(){
    TweenMax.staggerFromTo($('.rules__ruleset') ,1, {
      opacity: 0,
      y: 20
    },{
      opacity: 1,
      y: 0,
      ease: Power4.easeOut
    },
    .05);
  },

  render(){
    let ruleset = this.props.ruleset;
    let isCreator = this.props.ruleset.creator === Meteor.userId();

    return(
      <li ref="item" className={styles.ruleset}>
        <h5 className={styles.title}>{ruleset.name}</h5>

        {this._rulesetRules()}

          {isCreator &&
          <div ref="actions" className={styles.actions}>
            <Button action={this._editRuleset} type="icon">{ EditIcon }</Button>
            <Button action={this._deleteRuleset} type="icon">{ DeleteIcon }</Button>
          </div>
          }
      </li>
    )
  },

  _rulesetRules(){
    let rules = this.props.ruleset.rules;
    if (rules){
      return(
        <ul className={styles.list}>
          {rules.map( rule => {
            return(
              <li>{rule.name}</li>
            )
          })}
        </ul>
      )
    }
  },

  _editRuleset(e){
    e.preventDefault();

    FlowRouter.setQueryParams({rule: null, ruleset: this.props.ruleset._id})
    this.props.actions.setCurrentRuleset(this.props.ruleset._id);
    this.props.actions.setCurrentModal(<EditRulesetModal/>);
  },

  _deleteRuleset(){

  }
});

export default RulesetItem
