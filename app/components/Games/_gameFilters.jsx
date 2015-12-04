import React from 'react';
import ReactDOM from 'react-dom';

import { updatePath } from 'redux-simple-router';

import Button from '../Button/button.jsx';
import styles from './games.scss';
import { BookIcon, SetIcon } from '../Icons/icons.jsx';

const GameFilters = React.createClass({
  _setContentToRules(){
    // console.log(this.props);
    let ruleFilter = $(this.ruleFilter);
    let rulesetFilter = $(this.rulesetFilter);

    this.props.actions.updatePath(this.props.location.pathname + '?content=rules' );
    this.props.actions.setGameContentType('rules');

    ruleFilter.addClass(styles.filter_active);
    rulesetFilter.removeClass(styles.filter_active);

  },
  _setContentToRulesets(){
    let ruleFilter = $(this.ruleFilter);
    let rulesetFilter = $(this.rulesetFilter);

    this.props.actions.updatePath(this.props.location.pathname + '?content=rulesets' );
    this.props.actions.setGameContentType('rulesets');

    ruleFilter.removeClass(styles.filter_active);
    rulesetFilter.addClass(styles.filter_active);
  },

  componentDidMount(){

    // console.log(this.props.actions);
    // let contentQuery = this.props.location.query.content;
    // if (contentQuery == undefined || contentQuery == 'rules' ){
    //   this._setContentToRules();
    // } else {
    //   this._setContentToRulesets();
    // }
  },

  render(){

    return(
      <div className={styles.filters}>
        <div className={styles.filter} ref={ (c)=> this.ruleFilter = c} >
          <span className={styles.filter_name}>Rules</span>
          <Button type="icon" action={this._setContentToRules}>{BookIcon}</Button>
        </div>
        <div className={styles.filter} ref={ (c)=> this.rulesetFilter = c}>
          <span className={styles.filter_name}>Sets</span>
          <Button type="icon" action={this._setContentToRulesets}>{SetIcon}</Button>
        </div>
      </div>
    )
  }
})

export default GameFilters;
