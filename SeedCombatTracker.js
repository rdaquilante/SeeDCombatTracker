//Setting a namespace for this class so that I don't have to worry about compatability.
var SeeDCombatTrackerNamespace = SeeDCombatTrackerNamespace || {};

SeeDCombatTrackerNamespace.parseCommand = function(message) {
  if (message.type === "api") {
    if (message.content.indexOf("!init") != -1) {
      SeeDCombatTrackerNamespace.Commands.initiative();
    } else if (message.content.indexOf("!enterBattle") != -1) {
      SeeDCombatTrackerNamespace.Commands.enterBattle(message);
    }
  }
}

on("chat:message",SeeDCombatTrackerNamespace.parseCommand);
