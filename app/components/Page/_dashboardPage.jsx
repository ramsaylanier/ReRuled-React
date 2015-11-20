import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import GameActions from '../Games/_gameActions.jsx';
import GameFilters from '../Games/_gameFilters.jsx';
import RulesList from '../Rules/_rulesList.jsx';
import RulesetsList from '../Rules/_rulesetsList.jsx';
import AddToRulesetModal from '../Modal/_addToRulesetModal.jsx';
import EditRulesetModal from '../Modal/_editRulesetModal.jsx';
import Loading from '../Loading/loading.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import gameStyles from '../Games/games.scss';


const DashboardPage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentGame = this.props.currentGame;
		let userSub = Meteor.subscribe('userProfile');
		let rulesSub = Meteor.subscribe('userRulesByGameId', currentGame);
		let rulesetSub = Meteor.subscribe('userRulesetsByGameId', currentGame);

		return {
			userLoading: !userSub.ready(),
			rulesLoading: !rulesSub.ready(),
			rulesetsLoading: !rulesetSub.ready(),
			rules: Rules.find({
				game: currentGame,
				creator: Meteor.userId()
			},{
				sort: { createdOn: -1}
			}).fetch(),
			rulesets: Rulesets.find({
				game: currentGame,
				creator: Meteor.userId()
			},{
				sort: { createdOn: 1 }
			}).fetch()
		}
	},

	componentDidMount(){

	},

	render(){
		let currentGame = this.props.currentGame;

		if (this.data.userLoading){
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
						<PageContent>
							<header className={gameStyles.header}>
								<h3>My Rulebook</h3>

								{currentGame &&
								<GameActions {...this.props} />
								}
								{this._showGamesList()}

								<GameFilters {...this.props} />
							</header>

							<div className={gameStyles.main}>
								{currentGame &&
									this._showGamesContent()
								}
							</div>
						</PageContent>
					</Page>
				</div>
			)
		}
	},

	_showGamesList(){
		let games = Meteor.user().games;

		if (games){
			return(
				<ul>
				{games.map( game => {
					return(
						<li className={gameStyles.inline_item}>
							<a className={gameStyles.link} onClick={this._setCurrentGame}>{game}</a>
						</li>
					)
				})}
				</ul>
			)
		}
	},

	_setCurrentGame(e){
		let gameName = $(e.currentTarget).text();
		this.props.actions.setCurrentGame(gameName);
	},

	_showGamesContent(){
		let content = FlowRouter.getQueryParam('content');

		if (this.data.rulesetsLoading || this.data.rulesLoading) {
			return (
				<Loading/>
			)
		}
		else if (content === 'rulesets'){
			return(
				<RulesetsList rulesets={this.data.rulesets} public={true} {...this.props}/>
			)
		} else {
			return (
				<RulesList rules={this.data.rules} public={true} {...this.props}/>
			)
		}
	}

});

export default DashboardPage;
