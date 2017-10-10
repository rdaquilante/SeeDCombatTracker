//This technique is called out in https://wiki.roll20.net/API:A_Guide_to_the_API#Namespaces
//It should make it safe to 'redefine' namespaces by not actually redefining them.
var SeeDCombatTrackerNamespace = SeeDCombatTrackerNamespace || {};
SeeDCombatTrackerNamespace.Commands = SeeDCombatTrackerNamespace.Commands || {};

//Sort the turns ascending
SeeDCombatTrackerNamespace.Commands.compare = function(a,b) {
  if (a.pr < b.pr)
    return -1;
  if (a.pr > b.pr)
    return 1;
  return 0;
}

SeeDCombatTrackerNamespace.Commands.nextTurn = function() {
  if (message.content.indexOf("help") != -1) {
    sendChat('SeeDCombatTracker API', '/w '+ message.who.split(" ")[0] + "Use !nextTurn to advance the initiative tracker to the next player(s).");
    return;
  }

  var turnOrder;
  if (Campaign().get("turnorder") == "") turnOrder = [];
  else turnOrder = JSON.parse(Campaign().get("turnorder"));
  log(turnOrder);
  //Sort ascending
  turnOrder = turnOrder.sort(SeeDCombatTrackerNamespace.Commands.compare);
  //The first person in the order will always have the lowest delay because of the sorting.
  var timeElapsed = turnOrder[0].pr;
  var message = "The next turn is";
  var characters = findObjs({_type: 'graphic', _subtype: 'token'});
  turnOrder.forEach(function(element) {
    //move each character down the amount of delay passed between turns.
    //This guarantees the next turn is 0.
    element.pr -= timeElapsed;
    //Do this check within the forEach because multiple characters can act simultaneously.
    if (element.pr == 0) {
      message += " " + characters.find(function(token) { return token.get("id") == element.id;}).get("name");
    }
  });

  Campaign().set("turnorder",JSON.stringify(turnOrder));
  sendChat('', "/desc " + message);
}
