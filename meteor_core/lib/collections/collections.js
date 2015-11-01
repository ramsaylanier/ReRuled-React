Rules = new Mongo.Collection('rules');
Games = new Mongo.Collection('games');


Meteor.methods({
  createRule: function(rule){
    var ruleId = Rules.insert(rule);
    return ruleId;
  }
})
