import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import GameActions from '../Games/_gameActions.jsx';
import RulesList from '../Rules/_rulesList.jsx';
import RulesetsList from '../Rules/_rulesetsList.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import gameStyles from '../Games/games.scss';


const GamePage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentGame = FlowRouter.getParam('game');
		let gameSub = Meteor.subscribe('currentGame', currentGame);
		let rulesSub = Meteor.subscribe('rulesListByGameId', currentGame)
		let rulesetsSub = Meteor.subscribe('rulesetsListByGameId', currentGame)

		return {
			loading: !rulesSub.ready() || !gameSub.ready() || !rulesetsSub.ready(),
			game: Games.findOne({title: currentGame}),
			rules: Rules.find({game: currentGame}).fetch(),
			rulesets: Rulesets.find({game: currentGame}).fetch()
		}
	},

  componentDidMount(){
    let currentGame = FlowRouter.getParam('game');
    this.props.actions.setCurrentGame(currentGame);
  },

	render(){

		let game = this.data.game;
		let rules = this.data.rules;
		let rulesets = this.data.rulesets;

    if (this.data.loading){
      return(
        <p>loading...</p>
      )
    } else {
  		return (
  			<div className={wrapperStyles.page}>
  				<Page>
  					<PageContent>
  						<header className={gameStyles.header}>
                  <h2>{game.title}</h2>
  								<GameActions {...this.props} />
  						</header>

  						<div className={gameStyles.main}>
  							<RulesList rules={this.data.rules} public={true} {...this.props}/>
  							<RulesetsList rulesets={this.data.rulesets} public={true} {...this.props}/>
  						</div>
  					</PageContent>
  				</Page>
  			</div>
  		)
    }
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

export default GamePage;