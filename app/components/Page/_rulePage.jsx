import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import GameActions from '../Games/_gameActions.jsx';
import RulesList from '../Rules/_rulesList.jsx';
import RulesetsList from '../Rules/_rulesetsList.jsx';
import Loading from '../Loading/loading.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import styles from '../Rules/rules.scss';


const RulePage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentRule = FlowRouter.getParam('rule');
		let ruleSub = Meteor.subscribe('currentRule', currentRule);

		return {
			loading: !ruleSub.ready(),
			rule: Rules.findOne(currentRule)
		}
	},

  componentDidMount(){
    let currentRule = FlowRouter.getParam('game');
    this.props.actions.setCurrentRule(currentRule);
		this.props.actions.setCurrentModal(null);
  },

	render(){

		let rule = this.data.rule;

    if (this.data.loading){
      return(
				<Page>
					<PageContent>
						<Loading/>
					</PageContent>
				</Page>
      )
    } else {
  		return (
  			<div className={wrapperStyles.page}>
  				<Page>
  					<PageContent wrapperType="tight">
  						<header className={styles.header}>
                <h3 className={styles.title}>{rule.name}</h3>
                <h5><a href={"/games/" + rule.game} className={styles.game_link}>{rule.game}</a></h5>
  						</header>

  						<div className={styles.container}>
                <p className={styles.description}>{rule.description}</p>
  						</div>
  					</PageContent>
  				</Page>
  			</div>
  		)
    }
	}
});

export default RulePage;
