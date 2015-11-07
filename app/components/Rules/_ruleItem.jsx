import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './rules.scss';
import actionStyles from './actions.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';

import RuleActions from './_ruleActions.jsx';
import AddToRulesetModal from '../Modal/_addToRulesetModal.jsx';
import Button from '../Button/button.jsx';
import { DeleteIcon, EditIcon } from '../Icons/icons.jsx';
import { Alerts } from '../Alerts/alert.jsx';

injectTapEventPlugin();

const RuleItem = React.createClass({

  componentDidMount(){
    TweenMax.staggerFromTo($('.rules__rule') ,1, {
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
    let rule = this.props.rule;
    let isCreator = this.props.rule.creator === Meteor.userId();

    return(
      <li ref="item" className={styles.rule} onMouseEnter={this._showActions} onMouseLeave={this._hideActions}>
        <h5 className={styles.title}>{rule.name}</h5>

        {isCreator &&
        <div ref="actions" className={actionStyles.container}>
          <Button action={this._editRule} type="icon">{ EditIcon }</Button>
          <Button action={this._deleteRule} type="icon">{ DeleteIcon }</Button>
        </div>
        }

        <div className={styles.meta}>
          {this._showCreator()}
          {this._showExcerpt()}
        </div>
      </li>
    )
  },

  _editRule(e){
    e.preventDefault();
    this.props.actions.setCurrentRule(this.props.rule);
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
        <p className={styles.creator}>by: {rule.creatorName}</p>
      )
    }
  },

  _showExcerpt(){
    if (!this.props.hideExcerpt){
      let excerptLength = this.props.excerptLength || 50;
      let excerpt = this.props.rule.description.substr(0, excerptLength);

      return(
          <p className={styles.description}>{excerpt}</p>
      )
    }
  },

  _showActions(e){
    let buttons = $(this.refs.actions).children('.button__icon');

    if (buttons.length){
      TweenMax.to(this.refs.actions, 0, {
        y: 60,
        ease: Power4.easeOut
      })

      TweenMax.staggerFromTo(buttons, 1, {
        opacity: 0
      },{
        opacity: 1,
        ease: Power4.easeOut,
      }, 0)
    }
  },

  _hideActions(){

    let buttons = $(this.refs.actions).children('.button__icon');

    if (buttons.length){
      TweenMax.to(this.refs.actions, 0, {
        y: 0,
        ease: Power4.easeOut
      })

      TweenMax.staggerTo(buttons, 1, {
        opacity: 0,
        ease: Power4.easeOut
      }, .1)
    }
  }
});

export default RuleItem;
