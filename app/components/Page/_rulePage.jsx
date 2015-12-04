import React, { Component } from 'react';
import { Link } from 'react-router';

//components
import { Page, PageContent, PageHeader, PageTitle } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import GameActions from '../Games/_gameActions.jsx';
import RulesList from '../Rules/_rulesList.jsx';
import RulesetsList from '../Rules/_rulesetsList.jsx';
import Loading from '../Loading/loading.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import styles from '../Page/page.scss';


const RulePage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentRule = this.props.params.rule;
		let ruleSub = Meteor.subscribe('currentRule', currentRule);

		return {
			loading: !ruleSub.ready(),
			rule: Rules.findOne(currentRule)
		}
	},

  componentDidMount(){
    let currentRule = this.props.params.rule;
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

			let category = rule.category;

  		return (
  			<div className={wrapperStyles.page}>
  				<Page className={styles[category]}>
						<PageHeader wrapperType="tight">
							<PageTitle className={styles.title}>{rule.name}</PageTitle>
							<Link to={"/games/" + rule.game} className={styles.link}>{rule.game}</Link>
						</PageHeader>
  					<PageContent wrapperType="tight">
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
