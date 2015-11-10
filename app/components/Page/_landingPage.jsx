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


const LandingPage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let gameSub = Meteor.subscribe('gameList');

		return {
			games: Games.find().fetch()
		}
	},

	render(){
		let games = this.data.games;

		return (
			<div className={wrapperStyles.page}>
				<Page>
					<PageContent>
						<header className={gameStyles.header}>
							<GameSearch games={games} actions={this.props.actions} currentGame={this.props.currentGame}/>
						</header>
					</PageContent>
				</Page>
			</div>
		)
	}
});

export default LandingPage;