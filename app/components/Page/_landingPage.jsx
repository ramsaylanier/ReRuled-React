import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import GameSearch from '../Games/_gameSearch.jsx';
import Loading from '../Loading/loading.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import gameStyles from '../Games/games.scss';


const LandingPage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let userSub = Meteor.subscribe('userProfile');

		return {
			loading: !userSub.ready()
		}
	},

	componentDidMount(){
		this.props.actions.setCurrentGame(null);
	},

	render(){

		if (this.data.loading){
			return (
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
								<GameSearch actions={this.props.actions} currentGame={this.props.currentGame} currentUser={this.props.currentUser}/>
							</header>
						</PageContent>
					</Page>
				</div>
			)
		}
	}
});

export default LandingPage;
