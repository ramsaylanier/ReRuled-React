import React from 'react';
import ReactDOM from 'react-dom';
import './index.jsx';


// import './router.jsx';

// import cheerio from 'cheerio';



// Meteor.startup(() => {
//   // React.initializeTouchEvents(true);
// 	// window.viewportUnitsBuggyfill.init({force:true});
//
// 	var loginStyle = "popup";
//
// 	// Meteor.call('serviceConfig', loginStyle, function(error){
// 	// 	if (error)
// 	// 		Errors.throw(error.reason, 'error')
// 	// });
//
// 	// Meteor.subscribe('userProfile');
//
// 	// twttr.events.bind(
// 	//   'tweet',
// 	//   function (event) {
// 	//     var quoteId = event.target.id
// 	//     Meteor.call('incTweets', quoteId, function(){
// 	//     	console.log("Incremented tweet")
// 	//     })
// 	//   }
// 	// );
//
// 	Accounts.onLogin(function(){
// 		var user = Meteor.user();
//
// 		//Set the currentUser in redux store
// 		var action = {
// 			type: 'SET_CURRENT_USER',
// 			userId: user._id
// 		}
//
// 		store.dispatch(action);
//
// 		//if user doesn't have avatar, user the default avatar
// 		if (!user.profile.avatar){
// 			Meteor.users.update(user._id, {$set: {'profile.avatar': '/img/default-avatar.png'}});
// 		}
// 	})
// });
