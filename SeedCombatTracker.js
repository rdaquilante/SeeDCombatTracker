//Calling initiative adds all active tokens to the tracker
//ToDo: Have a "speed" parameter on the tokens for quick addition to the battle.
var initiative = function() {
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

//EnterBattle lets a character who came to the fight late enter with the provided
//speed value.
var enterBattle = function(message) {
  var turnOrder;
  if (Campaign().get("turnorder") == "") turnOrder = [];
  else turnOrder = JSON.parse(Campaign().get("turnorder"));

  var strSplit = message.content.split(" ");
  var speed = strSplit[1];
  //We expect the command to be like !enterBattle 5, and accept nothing else.
  if (strSplit.length != 2 || isNaN(speed)) {
    sendChat('SeeDCombatTracker API', '/w "' + message.who + '" !enterBattle takes a numeric parameter for speed and nothing else.');
  } else {
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

    var initEntry = {id:"-1",pr:0,custom:""};
    initEntry.id = characters[i].id;
    initEntry.pr = 30 - speed;
    initEntry.custom = message.who;
    turnOrder.push(initEntry);
    Campaign().set("turnorder",JSON.stringify(turnOrder));
  }
}

var parseCommand = function(message) {
  if (message.type === "api") {
    if (message.content.indexOf("!init") != -1) {
      initiative();
    } else if (message.content.indexOf("!enterBattle") != -1) {
      enterBattle(message);
    }
  }
}

on("chat:message",parseCommand);
