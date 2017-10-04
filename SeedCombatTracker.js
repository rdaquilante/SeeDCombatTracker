//Setting a namespace for this class so that I don't have to worry about compatability.
var SeeDCombatTrackerNamespace = SeeDCombatTrackerNamespace || {};

SeeDCombatTrackerNamespace.parseCommand = function(message) {
  if (message.type === "api") {
    if (message.content.indexOf("!init") != -1) {
      SeeDCombatTrackerNamespace.Commands.initiative();
    } else if (message.content.indexOf("!enterBattle") != -1) {
      SeeDCombatTrackerNamespace.Commands.enterBattle(message);
    } else if (message.content.indexOf("!nextTurn") != -1) {
      SeeDCombatTrackerNamespace.Commands.nextTurn();
    } else if (message.content.indexOf("!delay") != -1) {
      SeeDCombatTrackerNamespace.Commands.delay(message);
    }
  }
}

on("ready",function() {
  sendChat('SeeDCombatTracker API', "SeeDCombatTracker API online.");
});
on("chat:message",SeeDCombatTrackerNamespace.parseCommand);
