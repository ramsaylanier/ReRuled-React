import React from 'react';
import Modal from './modal.jsx';

import { Alerts } from '../Alerts/alert.jsx';
import RuleItem from '../Rules/_ruleItem.jsx';
import styles from '../Rules/rules.scss';
import labelStyles from '../Form/label.scss';
import buttonStyles from '../Button/button.scss';

const AddToRulesetModal = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData(){
    let rule = this.props.currentRule;

    return{
      rule: Rules.findOne(rule)
    }
  },

  componentWillUnmount(){
      FlowRouter.setQueryParams({rule: null})
  },

  render(){
    let rule = this.data.rule;
    let rulesets = Rulesets.find({creator: Meteor.userId(), "rules._id": {$nin: [this.props.currentRule._id]}});

    if (rule){
      return(
        <Modal {...this.props}>
          <h5 className={styles.title}>{rule.name}</h5>
          <p className={styles.description}>{rule.description}</p>

          {this._rulesetsSelect()}
          <button onClick={this._onClick} className={buttonStyles.small_primary}>Add To Ruleset</button>
        </Modal>
      )
    } else {
      return(
        <Modal {...this.props}>
          <p>...loading</p>
        </Modal>
      )
    }
  },

  _rulesetsSelect(){
    let rulesets = Rulesets.find({creator: Meteor.userId(), "rules._id": {$nin: [this.data.rule._id]}}).fetch();

    if (rulesets.length > 0){
      return(
        <div className={styles.rulesets}>
          <label className={labelStyles.block}>Select A Ruleset</label>
          <select name="ruleset-select">
            {rulesets.map( ruleset => {
              return(
                <option value={ruleset._id}>{ruleset.name}</option>
              )
            })}
          </select>
        </div>
      )
    }
  },

  _onClick(){
    let rulesetId = $('[name=ruleset-select]').val();
    let rule = this.data.rule;

    Meteor.call('addRuleToRuleset', rule, rulesetId, function(err, res){
      if (err){
        Alerts.throw(err.reason, 'error')
      } else {
        Alerts.throw('rule added!', 'success');
      }
    })
  }


})

export default AddToRulesetModal;
