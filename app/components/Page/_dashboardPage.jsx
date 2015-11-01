import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSelect from '../Games/_gameSelect.jsx';
import { Alerts } from '../Alerts/alert.jsx';
import CreateRuleButton from '../Button/_CreateRuleButton.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';


const DashboardPage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentGame = this.props.currentGame;
		let gameSub = Meteor.subscribe('gameList');
		let rulesSub = Meteor.subscribe('rulesListByGameId', currentGame)

		return {
			loading: !rulesSub.ready(),
			games: Games.find().fetch(),
			rules: Rules.find({gameId: currentGame}).fetch()
		}
	},

	render(){

		let games = this.data.games;
		let rules = this.data.rules;
		let currentGame = this.props.currentGame;

		return (
			<div className={wrapperStyles.page}>
				<Page>
					<PageContent>
						<GameSelect games={games} actions={this.props.actions}/>

						{currentGame &&


							<div>
								<CreateRuleButton actions={this.props.actions}/>

							</div>
						}

						{this._showRules()}


					</PageContent>
				</Page>
			</div>
		)
	},

	_addRule(){
		let ruleName = $('.rule-name-field').val();
		let gameId = this.props.currentGame;

		Meteor.call('createRule', ruleName, gameId, function(err, res){
			if (err){
				Alerts.throw(err.reason, 'error')
			} else {
				Alerts.throw('Rule Addedd!', 'success')
			}
		})
	},

	_showRules(){

		let rules = this.data.rules;
		if (rules){
			return(
				<div>
					<h3>Rules:</h3>
						{rules.map( rule => {
							return(
								<div className="rule">
									<h5>{rule.name}</h5>
									<p>{rule.gameId}</p>
								</div>
							)
						})}
				</div>
			)
		}
	}
});

export default DashboardPage;
