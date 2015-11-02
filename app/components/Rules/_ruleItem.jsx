import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './rules.scss';

export default class RuleItem extends Component{

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
  }

  render(){
    let rule = this.props.rule;

    let excerpt = rule.description.substr(0, 50);
    return(
      <li ref="item" className={styles.item}>
        <h5 className={styles.title}>{rule.name}</h5>
        <p className={styles.description}>{excerpt}</p>
      </li>
    )
  }
}
