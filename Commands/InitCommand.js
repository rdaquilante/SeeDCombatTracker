//This technique is called out in https://wiki.roll20.net/API:A_Guide_to_the_API#Namespaces
//It should make it safe to 'redefine' namespaces by not actually redefining them.
var SeeDCombatTrackerNamespace = SeeDCombatTrackerNamespace || {};
SeeDCombatTrackerNamespace.Commands = SeeDCombatTrackerNamespace.Commands || {};

//Calling initiative adds all active tokens to the tracker
//ToDo: Have a "speed" parameter on the tokens for quick addition to the battle.
SeeDCombatTrackerNamespace.Commands.initiative = function(message) {
  if (message.content.indexOf("help") != -1) {
    sendChat('SeeDCombatTracker API', '/w '+ message.who.split(" ")[0] + " Use !init to give everyone 30 delay, as that is how battles in SeeD start.");
    return;
  }

  //Clear the init tracker
  Campaign().set("turnorder",JSON.stringify(""));

  var characters = findObjs({_type: 'graphic', _subtype: 'token'});
  var turnOrder = [];

  characters.forEach(function(element) {
    //toss out things like dragged dice and whatnot
      if (element.name == "") return;
      var initEntry = {id:"-1",pr:0,custom:""};
      initEntry.id = element.id;
      initEntry.pr = 30;
      initEntry.custom = element.name;
      turnOrder.push(initEntry);
    });
    log(turnOrder);
    Campaign().set("turnorder",JSON.stringify(turnOrder));
}
