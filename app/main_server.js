var cheerio = require('cheerio');

Meteor.startup(function(){
	ServiceConfiguration.configurations.remove();
	// Push.debug = true
	// Meteor.call('loadGames');
})

Meteor.methods({

	serviceConfig(loginStyle){
		try{
			ServiceConfiguration.configurations.upsert(
				{ service: "twitter" },
				{
					$set: {
					  consumerKey: Meteor.settings.twitter.public,
					  loginStyle: loginStyle,
					  secret: Meteor.settings.twitter.private
					}
				}
			);

			ServiceConfiguration.configurations.upsert(
				{ service: "facebook" },
					{
					$set: {
					  appId: Meteor.settings.facebook.appId,
					  loginStyle: "popup",
					  secret: Meteor.settings.facebook.appSecret
					}
				}
			);
		} catch(e) {
			console.log("Error with account configuration")
			console.log(e)
		}
	},

  loadGames(){
		console.log('loading games');
		let index = 0;
		while (index < 800){
			index++;
			HTTP.get('https://boardgamegeek.com/browse/boardgame/page/' + index, (err, res) => {
				if (res.statusCode === 200){
					let $ = cheerio.load(res.content);
					let scrapedGames = $('.collection_objectname').find('a');

					_.each(scrapedGames, (game, index) => {
						let title = $(game).text();
						Games.update({title: title}, {$set: {title: title}}, {upsert: true})
					})
				}
			});
		}
	}
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

Accounts.config(function(){

})

var forbiddenUsernames = [

]


Accounts.validateNewUser(function(user){
	var existingUsername = Meteor.users.findOne({username: user.username}) || forbiddenUsernames.indexOf(user.username) != -1;
	if (existingUsername){
		throw new Meteor.Error(403, "Username already exists");
	} else if (user.username < 4){
		throw new Meteor.Error(403, "Username must have at least 4 characters");
	} else{
		return true;
	}
})

Accounts.onCreateUser(function(options, user){
	if (options.profile){
		if (user.services.twitter){
			user.username = user.services.twitter.screenName;
			user.profile = options.profile;
			user.profile.avatar = user.services.twitter.profile_image_url;
		} else if (user.services.facebook){
			user.username = user.services.facebook.name;
			user.profile = {};
			user.profile.avatar = "/img/default-avatar.jpg";
		}
	} else {
		user.profile = {};
		user.profile.avatar = "/img/default-avatar.jpg";
	}

	return user;
});

// smoke test that these are present
Npm.require;
Assets;
require('fs').readFile.call;

// console.log('\n\nRunning on server only');
// console.log('There are # posts:', Posts.find().fetch().length);
