import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import GameActions from '../Games/_gameActions.jsx';
import RulesList from '../Rules/_rulesList.jsx';
import RulesetsList from '../Rules/_rulesetsList.jsx';
import AddToRulesetModal from '../Modal/_addToRulesetModal.jsx';
import EditRulesetModal from '../Modal/_editRulesetModal.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import gameStyles from '../Games/games.scss';


const DashboardPage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentGame = this.props.currentGame;
		let gameSub = Meteor.subscribe('gameList');
		let rulesSub = Meteor.subscribe('userRulesByGameId', currentGame)
		let rulesetsSub = Meteor.subscribe('userRulesetsByGameId', currentGame)

		return {
			rulesLoading: !rulesSub.ready(),
			rulesetsLoading: !rulesetsSub.ready(),
			games: Games.find().fetch(),
			rules: Rules.find({game: currentGame}).fetch(),
			rulesets: Rulesets.find({game: currentGame}).fetch()
		}
	},

	componentDidMount(){
		let currentGame = this.props.currentGame;
		let currentRule = FlowRouter.getQueryParam('rule');
		let currentRuleset = FlowRouter.getQueryParam('ruleset');

		if (currentGame){
			FlowRouter.setQueryParams({'game': currentGame})
		} else {
			currentGame = FlowRouter.getQueryParam('game');
			this.props.actions.setCurrentGame(currentGame);
		}

		if (currentRule){
			this.props.actions.setCurrentRule(currentRule);
			this.props.actions.setCurrentModal(<AddToRulesetModal/>);
		}

		if (currentRuleset){
			this.props.actions.setCurrentRuleset(currentRuleset);
			this.props.actions.setCurrentModal(<EditRulesetModal/>);
		}
	},

	render(){
		console.log('dashboard render');
		let games = this.data.games;
		let rules = this.data.rules;
		let rulesets = this.data.rulesets;
		let currentGame = this.props.currentGame;

		return (
			<div className={wrapperStyles.page}>
				<Page>
					<PageContent>
						<header className={gameStyles.header}>
							<GameSearch games={games} actions={this.props.actions} currentGame={this.props.currentGame}/>
							{ currentGame && <GameActions {...this.props} /> }
							<p className={gameStyles.link}><a href={"/games/" +  currentGame}>{currentGame}</a></p>
						</header>

						<div className={gameStyles.main}>
							{!this.data.rulesLoading &&
								<RulesList rules={this.data.rules} actions={this.props.actions}/>
							}

							{!this.data.rulesetsLoading &&
								<RulesetsList rulesets={this.data.rulesets} actions={this.props.actions}/>
							}
						</div>
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
	}
});

export default DashboardPage;
