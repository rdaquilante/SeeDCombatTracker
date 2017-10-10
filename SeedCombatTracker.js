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
    } else if (message.content.indexOf("!help") != -1) {
      sendChat('SeeDCombatTracker API',"/w " + message.who.split(" ")[0] + "Welcome to the SeeDCombatTracker API!"
      + "Using the commands, you can run combat. Use !init to add every token on the field to the tracker. Use !nextTurn to advance to the next player. "
      + "Use !delay to insert the delay of your attack while speaking as the token. If a token enters battle, use !enterBattle with their speed to insert them into the order."
      + "Use -help on any command to learn more.");
    }
  }
}

on("ready",function() {
  sendChat('SeeDCombatTracker API', "SeeDCombatTracker API online.");
});
on("chat:message",SeeDCombatTrackerNamespace.parseCommand);
