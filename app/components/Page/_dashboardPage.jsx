import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import GameActions from '../Games/_gameActions.jsx';
import GameFilters from '../Games/_gameFilters.jsx';
import UserGameList from '../Games/_userGameList.jsx';
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
		let currentGame = this.props.params.game;
    this.props.actions.setCurrentGame(currentGame);
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
								<h2 className={gameStyles.title}>My Rulebook</h2>

								{this._showGamesList()}

								{currentGame &&
									<GameActions {...this.props} />
								}

								{currentGame &&
									<GameFilters {...this.props} />
								}
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
				<UserGameList games={games} actions={this.props.actions} />
			)
		}
	},

	_showGamesContent(){
		let content = this.props.gameContent;

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
