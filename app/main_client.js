import React from 'react';
import ReactDOM from 'react-dom';
import './index.jsx';


// import './router.jsx';

// import cheerio from 'cheerio';



Meteor.startup(() => {
  // React.initializeTouchEvents(true);
	// window.viewportUnitsBuggyfill.init({force:true});

	var loginStyle = "popup";

	// Meteor.call('serviceConfig', loginStyle, function(error){
	// 	if (error)
	// 		Errors.throw(error.reason, 'error')
	// });

	// Meteor.subscribe('userProfile');

	// twttr.events.bind(
	//   'tweet',
	//   function (event) {
	//     var quoteId = event.target.id
	//     Meteor.call('incTweets', quoteId, function(){
	//     	console.log("Incremented tweet")
	//     })
	//   }
	// );
});
