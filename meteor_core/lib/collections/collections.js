Rules = new Mongo.Collection('rules');
Games = new Mongo.Collection('games');
Rulesets = new Mongo.Collection('rulesets');


Meteor.methods({
  createRule: function(rule){
    var ruleId = Rules.insert(rule);
    return ruleId;
  },
  createRuleset: function(ruleset){
    var rulesetId = Rulesets.insert(ruleset);
    return rulesetId;
  }
})
