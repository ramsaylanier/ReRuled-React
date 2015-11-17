Rules = new Mongo.Collection('rules');
Games = new Mongo.Collection('games');
Rulesets = new Mongo.Collection('rulesets');


Meteor.methods({
  createRule: function(name, description, game){
    check(name, String);
    check(description, String);
    check(game, String);

    if (!this.userId){
      throw new Meteor.Error(422, 'You must be logged in to create a rule');
    }

    var creator = this.userId;
    var creatorName = Meteor.users.findOne(this.userId).username;

    var ruleId = Rules.insert({name: name, description: description, game: game, creator: creator, creatorName: creatorName});

    Meteor.call('addGameToUser', game);
    return ruleId;
  },
  deleteRule: function(ruleId, creatorId){
    check(ruleId, String);
    check(creatorId, String);

    if (creatorId !== this.userId){
      throw new Meteor.Error(422, 'You are not the creator of this rule')
    }

    return Rules.remove(ruleId);
  },
  createRuleset: function(ruleset){
    check(ruleset, {
      name: String,
      game: String
    });

    if (!this.userId){
      throw new Meteor.Error(422, 'You must be logged in to create a ruleset');
    }

    var creator = this.userId;
    var creatorName = Meteor.users.findOne(this.userId).username;

    ruleset.creator = creator;
    ruleset.creatorName = creatorName;

    var rulesetId = Rulesets.insert(ruleset);

    Meteor.call('addGameToUser', ruleset.game);
    return rulesetId;
  },
  addRuleToRuleset: function(rule, rulesetId){
    console.log(rule);

    check( rule, {
      _id: String,
      name: String,
      description: String,
      category: Match.Optional([String]),
      creator: String,
      creatorName: String,
      game: String
    })

    check( rulesetId, String);

    if (!this.userId){
      throw new Meteor.Error(422, 'You must be logged in to add a rule to a ruleset');
    }

    if (!rulesetId){
        throw new Meteor.Error(422, 'You must be logged in to create a ruleset');
    }

    if (this.userId !== Rulesets.findOne(rulesetId).creator){
      throw new Meteor.Error(422, 'You are not the creator of this ruleset');
    }

    Rulesets.update( {_id: rulesetId}, {$addToSet: {rules: rule}} );
  },
  addGameToUser: function(gameName){
    check(gameName, String);
    if (!this.userId){
      console.log('Game not added to user because no user is logged in')
      return;
    }

    Meteor.users.update({_id: this.userId}, {$addToSet: {games: gameName}})

  },
  addGameToRecentGames: function(gameName){
    check(gameName, String);

    if (!this.userId){
      console.log('not added to recent games because no user is logged in')
      return;
    }

    var recentGames = Meteor.users.findOne(this.userId).recentGames;

    if (recentGames){
      var newRecentGames = _.without(recentGames, gameName).slice(0, 5);
      newRecentGames.unshift(gameName)
      Meteor.users.update({_id: this.userId}, {$set: {recentGames: newRecentGames}});
    } else{
      Meteor.users.update({_id: this.userId}, {$addToSet: {recentGames: gameName}});
    }

  },
  updateUserProfile: function(username, email){
    check(username, String);

    if (!this.userId){
      throw new Meteor.Error(422, 'You are not authorized to make this change. Make sure you are logged in.');
    }

    var existingUsername = Meteor.users.findOne({username: username});

    if (existingUsername && existingUsername._id !== this.userId ){
      throw new Meteor.Error(422, 'That username is already taken. Try again.');
    }

    var existingEmail = Meteor.users.findOne({'emails.address': email});

    if (existingEmail && existingEmail._id !== this.userId){
      throw new Meteor.Error(422, 'That email address is already taken. Try again.');
    }

    var newEmail = [{
      address: email,
      verified: false
    }]

    Meteor.users.update({_id: this.userId}, {$set: {username: username, emails:newEmail}});
  }
})
