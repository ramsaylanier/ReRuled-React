import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './rules.scss';

import AddToRulesetModal from '../Modal/_addToRulesetModal.jsx';

const RuleItem = React.createClass({

  componentDidMount(){
    let count = Session.get('ruleCount') || 0;
    count = count + 1;
    Session.set('ruleCount', count );
    let item = $(ReactDOM.findDOMNode(this.refs.item));
    TweenMax.fromTo(item ,1, {
      opacity: 0,
      y: 20
    },{
      opacity: 1,
      y: 0,
      ease: Power4.easeOut,
      delay: count / 20
    })
  },

  render(){
    let rule = this.props.rule;
    console.log(rule);

    let excerpt = rule.description.substr(0, 50);
    return(
      <li ref="item" className={styles.item}>
        <h5 className={styles.title}><a href="#" onClick={this._onClick}>{rule.name}</a></h5>
        <div className={styles.meta}>
          <p className={styles.creator}>by: {rule.creatorName}</p>
          <p className={styles.description}>{excerpt}</p>
        </div>
      </li>
    )
  },

  _onClick(e){
    e.preventDefault();
    this.props.actions.setCurrentRule(this.props.rule);
    this.props.actions.setCurrentModal(<AddToRulesetModal/>);
  }
});

export default RuleItem;
