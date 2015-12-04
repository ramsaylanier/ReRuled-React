import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import styles from './rules.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';

import AddToRulesetModal from '../Modal/_addToRulesetModal.jsx';
import Button from '../Button/button.jsx';
import { DeleteIcon, EditIcon } from '../Icons/icons.jsx';
import { Alerts } from '../Alerts/alert.jsx';

injectTapEventPlugin();

const RuleItem = React.createClass({

  componentDidMount(){
    let rules = $('.rules__rule');

    _.each(rules, (rule, index) => {
      if (rule == this.refs.item){
        TweenMax.fromTo($(this.refs.item) ,1, {
          opacity: 0,
          y: 10
        },{
          opacity: 1,
          y: 0,
          ease: Power4.easeOut,
          delay: index / 20
        });
      }
    })

  },

  render(){
    let rule = this.props.rule;
    let category = rule.category;
    let isCreator = this.props.rule.creator === Meteor.userId();

    return(
      <li ref="item" className={styles.rule + ' ' + styles[category]}>
        <h5 className={styles.title}><Link to={"/rules/" + rule._id}>{rule.name}</Link>{this._showCreator()} </h5>

        {isCreator &&
        <div ref="actions" className={styles.actions}>
          <Button action={this._editRule} type="icon">{ EditIcon }</Button>
          <Button action={this._deleteRule} type="icon">{ DeleteIcon }</Button>
        </div>
        }

        <div className={styles.meta}>
          {this._showExcerpt()}

          <span className={styles.category + ' ' + styles[category]}>{category}</span>
        </div>
      </li>
    )
  },

  _editRule(e){
    e.preventDefault();
    FlowRouter.setQueryParams({rule: this.props.rule._id, ruleset: null})
    this.props.actions.setCurrentRule(this.props.rule._id);
    this.props.actions.setCurrentModal(<AddToRulesetModal/>);
  },

  _deleteRule(e){
    this.props.actions.setCurrentRule(this.props.rule);
    let ruleId = this.props.rule._id;
    let creatorId = this.props.rule.creator;

    Meteor.call('deleteRule', ruleId, creatorId, function(err,res){
      if (err){
        Alerts.throw(err.reason, 'error')
      } else {
        Alerts.throw('Rule deleted', 'success')
      }
    })
  },

  _showCreator(){
    let rule = this.props.rule;
    if (Meteor.userId() !== rule.creator){
      return(
        <span className={styles.creator}>by {rule.creatorName}</span>
      )
    }
  },

  _showExcerpt(){
    if (!this.props.hideExcerpt){
      let excerptLength = this.props.excerptLength || 100;
      let excerpt = this.props.rule.description.substr(0, excerptLength);

      return(
          <p className={styles.description}>{excerpt}</p>
      )
    }
  },

  _showCategory(){
    let category = this.props.rule.category;
    if (category){
      return(
        <span className={styles[category]}>{category}</span>
      )
    }
  }
});

export default RuleItem;
