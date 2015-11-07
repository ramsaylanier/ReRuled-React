import React from 'react';
import Modal from './modal.jsx';

import { Alerts } from '../Alerts/alert.jsx';
import RuleItem from '../Rules/_ruleItem.jsx';
import styles from '../Rules/rules.scss';
import labelStyles from '../Form/label.scss';
import buttonStyles from '../Button/button.scss';

const AddToRulesetModal = React.createClass({
  render(){
    let rule = this.props.currentRule;
    let rulesets = Rulesets.find({creator: Meteor.userId(), "rules._id": {$nin: [this.props.currentRule._id]}});

    return(
      <Modal {...this.props}>
        <h5 className={styles.title}>{rule.name}</h5>
        <p className={styles.description}>{rule.description}</p>

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
        <button onClick={this._onClick} className={buttonStyles.small_primary}>Add To Ruleset</button>
      </Modal>
    )
  },

  _onClick(){
    let rulesetId = $('[name=ruleset-select]').val();
    let rule = this.props.currentRule;

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
