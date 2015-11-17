import React, { Component } from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';
import ProfileForm from '../Form/_profileForm.jsx';
import Loading from '../Loading/loading.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import gameStyles from '../Games/games.scss';


const ProfilePage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let userSub = Meteor.subscribe('userProfile');
    let user = Meteor.user();

		return {
			userLoading: !userSub.ready(),
      user: user
		}
	},
	render(){
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
								<h3>{this.data.user.username}</h3>
							</header>

							<div className={gameStyles.main}>
                <ProfileForm/>
							</div>
						</PageContent>
					</Page>
				</div>
			)
		}
	}
});

export default ProfilePage;
