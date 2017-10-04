//This technique is called out in https://wiki.roll20.net/API:A_Guide_to_the_API#Namespaces
//It should make it safe to 'redefine' namespaces by not actually redefining them.
var SeeDCombatTrackerNamespace = SeeDCombatTrackerNamespace || {};
SeeDCombatTrackerNamespace.Commands = SeeDCombatTrackerNamespace.Commands || {};

SeeDCombatTrackerNamespace.Commands.delay = function(message) {
  var turnOrder;
  if (Campaign().get("turnorder") == "") turnOrder = [];
  else turnOrder = JSON.parse(Campaign().get("turnorder"));

  var strSplit = message.content.split(" ");
  var delay = strSplit[1];
  //We expect the command to be like !enterBattle 5, and accept nothing else.
  if (strSplit.length != 2 || isNaN(delay)) {
    sendChat('SeeDCombatTracker API', '/w "' + message.who + '" !delay takes a numeric parameter for the delay and nothing else. ' +
    'For now, calculate your final delay by subtracting speed and applying any status effects manually.');
  } else {
    //ToDo: Extract this into a method since it's being used here and in enterBattle.
    var characters = findObjs({_type: 'graphic', _subtype: 'token'})
    var i;

    for (i = 0; i < characters.length; i++) {
      //naive matching of character names. This could be problematic if characters have
      //very similar names.
      //ToDo: Make a stricter algorithm
      if (message.who.indexOf(characters[i].get("name")) != -1) {
        break;
      }
    }

    if (i >= characters.length) {
      //Use the first name of the user for the whisper interface, using longer names seems to cause issues.
      sendChat('SeeDCombatTracker API', '/w "' + message.who.split(" ")[0] + '" No matching token for user ' + message.who + ' found.');
      return;
    }

    //set the delay of only the right token
    turnOrder.forEach(function(element) {
      if (element.id == characters[i].id) {
        element.pr = delay;
      }
    });

    Campaign().set("turnorder",JSON.stringify(turnOrder));
  }
}
