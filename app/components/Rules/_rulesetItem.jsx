import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './rules.scss';

export default class RulesetItem extends Component{

  componentDidMount(){
    let count = Session.get('rulesetCount') || 0;
    count = count + 1;
    Session.set('rulesetCount', count );
    let item = $(ReactDOM.findDOMNode(this.refs.item));
    TweenMax.fromTo(item ,1, {
      opacity: 0,
      y: 20
    },{
      opacity: 1,
      y: 0,
      ease: Power4.easeOut,
      delay: count / 30
    })
  }

  render(){
    let ruleset = this.props.ruleset;

    return(
      <li ref="item" className={styles.item}>
        <h5 className={styles.title}>{ruleset.name}</h5>
      </li>
    )
  }
}
