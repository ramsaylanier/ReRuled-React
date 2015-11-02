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
    return ruleId;
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
  }
})
