Rules = new Mongo.Collection('rules');
Games = new Mongo.Collection('games');


Meteor.methods({
  createRule: function(name, gameId){
    var ruleId = Rules.insert({name: name, gameId: gameId});
    return ruleId;
  }
})
