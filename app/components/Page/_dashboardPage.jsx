import React from 'react';

//components
// import Decks from '../../collections/decks.js';
import { Page, PageContent } from '../Page/page.jsx';
import NotFoundPage from '../Page/_notFoundPage.jsx';

//styles
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const DashboardPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let username = FlowRouter.getParam('username');
		let deckQuery = {authorName: username};
		let subscription = Meteor.subscribe('deckList', deckQuery);

		return {
			loading: !subscription.ready(),
			decks: Decks.find({}, {sort: {createdOn: -1}}).fetch()
		};
	},

	componentDidMount(){
		this.setTitle();
	},

	setTitle(){
		$('.app-header .title').text('');
	},

	render(){
		if (!this.data.loading && this.data.decks.length == 0){
			console.log('not found');
			return <NotFoundPage/>
		} else if (!this.data.loading){
			return (
				<div className={wrapperStyles.page}>
					<Page>
						<PageContent>
							<h1>Hello</h1>
						</PageContent>
					</Page>
				</div>
			)
		} else {
			return (
				<Page>
					<PageContent>
						<p>Loading</p>
					</PageContent>
				</Page>
			)
		}
	}
});

const EditUserProfile = React.createClass({
	componentDidMount(){
		var container = $('.edit-profile-container');
		var form = this.getDOMNode();
		formHeight = $(form).outerHeight();

		SlideShowContent(container, formHeight);
	},
	render(){
		return (
			<Form attributes={profileFormAttributes} />
		)
	}
});


const UserProfile = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var avatar = "/images/default.jpg"
		if (Meteor.user())
			avatar = Meteor.user().profile.avatar;
		return {
			loading: !Meteor.user(),
			avatar: avatar
		}
	},
	renderEditProfile(){
		profileFormAttributes.fields[0].value = Meteor.user().username;
		profileFormAttributes.fields[1].value = Meteor.user().emails[0].address;

		React.render(
			<EditUserProfile/>,
			$('.edit-profile-container').get(0)
		)
	},
	render(){
		var username = FlowRouter.getParam('username');

		if (this.data.loading){
			return (
				<div>
					<p>Loading</p>
				</div>
			)
		} else {
			return(
				<div className="user-dashboard p-2">
					<Avatar image={this.data.avatar}/>
					<div className="flex-container column centered items-centered">
						<h5 className="user-name uppercase m-b-1">{username}</h5>
						<button className="btn primary-btn" onClick={this.renderEditProfile}>Edit Profile</button>
					</div>

					<div className="edit-profile-container slide-down-container"></div>
				</div>
			)
		}
	}
});

export default DashboardPage;
