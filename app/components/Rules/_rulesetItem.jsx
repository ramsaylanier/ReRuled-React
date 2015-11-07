import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './rules.scss';

import EditRulesetModal from '../Modal/_editRulesetModal.jsx';

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
    let ruleCount = ruleset.rules ? ruleset.rules.length : 0;

    return(
      <li ref="item" className={styles.ruleset}>
        <h5 className={styles.title}><a href="#" onClick={this._onClick}>{ruleset.name}</a></h5>
        <p>{ruleCount}</p>
      </li>
    )
  },

  _onClick(e){
    e.preventDefault();
    let ruleset = this.props.ruleset;
    this.props.actions.setCurrentRuleset(ruleset);
    this.props.actions.setCurrentModal(<EditRulesetModal/>);
  }
});

export default RulesetItem
