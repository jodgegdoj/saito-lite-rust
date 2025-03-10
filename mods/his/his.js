const GameTemplate = require('../../lib/templates/gametemplate');
const JSON = require('json-bigint');

//////////////////
// CONSTRUCTOR  //
//////////////////
class HereIStand extends GameTemplate {

  constructor(app) {

    super(app);

    this.app             = app;

    this.name  		 = "HereIStand";
    this.gamename        = "Here I Stand";
    this.slug		 = "his";
    this.description     = `Here I Stand is a boardgame based on the military, political and religious conflicts within Europe at the outbreak of the Protestant Reformation (1517-1555). Each player controls one or more major powers that dominated Europe: the Ottoman Empire, the Hapsburgs, England, France, the Papacy and the Protestant states.`;
    this.publisher_message = "Here I Stand is owned by GMT Games. This module is made available under an open source license provided by GMT Games that permits usage provided that at least one player per game has purchased a copy of the game.";
    this.categories      = "Games Arcade Entertainment";

    this.interface = 1; // graphical interface

    //
    // this sets the ratio used for determining
    // the size of the original pieces
    //
    this.boardWidth  = 5100;

    //
    // newbie mode
    //
    this.confirm_moves = 1;


    //
    //
    // players
    this.minPlayers 	 = 2;
    this.maxPlayers 	 = 6;

    this.type       	 = "Strategy Boardgame";
    this.categories 	 = "Bordgame Game"

  }



  ////////////////
  // initialize //
  ////////////////
  initializeGame(game_id) {

    //
    // check user preferences to update interface, if text
    //
    if (this.app?.options?.gameprefs) {
      if (this.app.options.gameprefs.his_expert_mode == 1) {
        this.confirm_moves = 0;
      } else {
        this.confirm_moves = 1;
      }
    }

    //
    // re-fill status and log
    //
    if (this.game.status != "") { this.updateStatus(this.game.status); }
    this.restoreLog();

    //
    // initialize game objects
    //
    this.factions = {};
    this.units = {};
    this.deck = this.returnDeck();




    this.importFaction('faction2', {
      id		:	"faction2" ,
      key		:	"england" ,
      name		: 	"English",
      nickname		: 	"English",
      img		:	"england.png",
      cards_bonus	:	1,
      marital_status    :       0,
      returnCardsDealt  :	function(game_mod) {

        let kc = game_mod.returnNumberOfKeysControlledByFaction("england");
        let base = 0;

	switch (kc) {
	  case 1: { base = 1; break; }
	  case 2: { base = 1; break; }
	  case 3: { base = 2; break; }
	  case 4: { base = 2; break; }
	  case 5: { base = 3; break; }
	  case 6: { base = 3; break; }
	  case 7: { base = 4; break; }
	  case 8: { base = 4; break; }
	  case 9: { base = 5; break; }
	  case 10: { base = 5; break; }
	  case 11: { base = 6; break; }
	  case 12: { base = 6; break; }
	  default: { base = 1; break; }
	}

	// TODO - bonus for home spaces under protestant control
	return base;

      },
    });
 


    this.importFaction('faction3', {
      id		:	"faction3" ,
      key		: 	"france",
      name		: 	"French",
      nickname		: 	"French",
      img		:	"france.png",
      cards_bonus	:	1,
      returnCardsDealt  :       function(game_mod) {
        
        let kc = game_mod.returnNumberOfKeysControlledByFaction("france");
        let base = 0;
        
        switch (kc) {
          case 1: { base = 1; break; }
          case 2: { base = 1; break; }
          case 3: { base = 1; break; }
          case 4: { base = 2; break; }
          case 5: { base = 2; break; }
          case 6: { base = 3; break; }
          case 7: { base = 3; break; }
          case 8: { base = 4; break; }
          case 9: { base = 4; break; }
          case 10: { base = 5; break; }
          case 11: { base = 6; break; }
          case 12: { base = 6; break; }
          default: { base = 0; break; }
        }
        
        // TODO - bonus for home spaces under protestant control
        return base;

      },
    });
 



    this.importFaction('faction1', {
      id		:	"faction1" ,
      key		: 	"hapsburg",
      name		: 	"Hapsburg",
      nickname		: 	"Hapsburg",
      img		:	"hapsburgs.png",
      cards_bonus	:	0,
      returnCardsDealt  :       function(game_mod) {
        
        let kc = game_mod.returnNumberOfKeysControlledByFaction("hapsburg");
        let base = 0;
        
        switch (kc) {
          case 1: { base = 1; break; }
          case 2: { base = 2; break; }
          case 3: { base = 2; break; }
          case 4: { base = 3; break; }
          case 5: { base = 3; break; }
          case 6: { base = 4; break; }
          case 7: { base = 4; break; }
          case 8: { base = 5; break; }
          case 9: { base = 5; break; }
          case 10: { base = 6; break; }
          case 11: { base = 6; break; }
          case 12: { base = 7; break; }
          case 13: { base = 7; break; }
          default: { base = 0; break; }
        }
        
        // TODO - bonus for home spaces under protestant control
        return base;

      },
    });
 



    this.importFaction('faction5', {
      id		:	"faction5" ,
      key		: 	"ottoman",
      name		: 	"Ottoman Empire",
      nickname		: 	"Ottoman",
      img		:	"ottoman.png",
      cards_bonus	:	0,
      returnCardsDealt  :       function(game_mod) {
        
        let kc = game_mod.returnNumberOfKeysControlledByFaction("england");
        let base = 0;
        
        switch (kc) {
          case 1: { base = 2; break; }
          case 2: { base = 2; break; }
          case 3: { base = 3; break; }
          case 4: { base = 3; break; }
          case 5: { base = 4; break; }
          case 6: { base = 4; break; }
          case 7: { base = 5; break; }
          case 8: { base = 5; break; }
          case 9: { base = 6; break; }
          case 10: { base = 6; break; }
          default: { base = 0; break; }
        }
        
        // TODO - bonus for home spaces under protestant control
        return base;

      },

    });
 



    this.importFaction('faction4', {
      id		:	"faction4" ,
      key		: 	"papacy",
      name		: 	"Papacy",
      nickname		: 	"Papacy",
      img		:	"papacy.png",
      cards_bonus	:	0,
      returnCardsDealt  :       function(game_mod) {
        
        let kc = game_mod.returnNumberOfKeysControlledByFaction("england");
        let base = 0;
        
        switch (kc) {
          case 1: { base = 2; break; }
          case 2: { base = 3; break; }
          case 3: { base = 3; break; }
          case 4: { base = 4; break; }
          case 5: { base = 4; break; }
          case 6: { base = 4; break; }
          default: { base = 0; break; }
        }
        
        // TODO - bonus for home spaces under protestant control
        return base;

      },
    });
 



    this.importFaction('faction6', {
      id		:	"faction6" ,
      key		: 	"protestant",
      name		: 	"Protestant",
      nickname		: 	"Protestant",
      img		:	"protestant.png",
      cards_bonus	:	0,
      returnCardsDealt  :       function(game_mod) {
        
        let kc = game_mod.returnNumberOfElectoratesControlledByProtestants();
        if (kc > 4) { return 5; }

	return 4;
        
      },

    });
 



    this.importUnit('regular', {
      type		:	"regular" ,
      name		: 	"Regular",
    });
 
    this.importUnit('mercenary', {
      type		:	"mercenary" ,
      name		: 	"Mercenary",
    });
 
    this.importUnit('cavalry', {
      type		:	"cavalry" ,
      name		: 	"Cavalry",
    });
 
    this.importUnit('squadron', {
      type		:	"squadron" ,
      name		: 	"Squadron" ,
    });

    this.importUnit('corsair', {
      type		:	"corsair" ,
      name		: 	"Corsair" ,
    });

    this.importUnit('debater', {
      type		:	"debater" ,
      name		: 	"Debater",
      debater		:	true,
    });
 

    this.importUnit('suleiman', {
      type		:	"suleiman" ,
      name		: 	"Suleiman",
      personage		:	true,
      army_leader	:	true,
      img		:	"Suleiman.svg",
      battle_rating	:	2,
      command_value	:	10,
    });
 
    this.importUnit('ibrahim-pasha', {
      type		:	"ibrahim-pasha" ,
      name		: 	"Ibrahim Pasha",
      personage		:	true,
      army_leader	:	true,
      img		:	"Ibrahim.svg",
      battle_rating	:	1,
      command_value	:	6,
    });
 
  
    this.importUnit('charles-v', {
      type		:	"charles-v" ,
      name		: 	"Charles V",
      personage		:	true,
      army_leader	:	true,
      img		:	"Charles_V.svg",
      battle_rating	:	2,
      command_value	:	10,
    });
 
    this.importUnit('duke-of-alva', {
      type		:	"duke-of-alva" ,
      name		: 	"Duke of Alva",
      personage		:	true,
      army_leader	:	true,
      img		:	"Duke_of_Alva.svg",
      battle_rating	:	1,
      command_value	:	6,
    });
 
    this.importUnit('ferdinand', {
      type		:	"ferdinand" ,
      name		: 	"Ferdinand",
      personage		:	true,
      army_leader	:	true,
      img		:	"Ferdinand.svg",
      battle_rating	:	1,
      command_value	:	6,
    });
 
    this.importUnit('henry-viii', {
      type		:	"henry-viii" ,
      name		: 	"Henry VIII",
      personage		:	true,
      army_leader	:	true,
      img		:	"Henry_VIII.svg",
      battle_rating	:	1,
      command_value	:	8,
    });
 
    this.importUnit('charles-brandon', {
      type		:	"charles-brandon" ,
      name		: 	"Charles Brandon",
      personage		:	true,
      army_leader	:	true,
      img		:	"Brandon.svg",
      battle_rating	:	1,
      command_value	:	6,
    });
 
    this.importUnit('francis-i', {
      type		:	"francis-i" ,
      name		: 	"Francis I",
      personage		:	true,
      army_leader	:	true,
      img		:	"Francis_I.svg",
      battle_rating	:	1,
      command_value	:	8,
    });
 
    this.importUnit('montmorency', {
      type		:	"montmorency" ,
      name		: 	"Montmorency",
      personage		:	true,
      army_leader	:	true,
      img		:	"Montmorency.svg",
      battle_rating	:	1,
      command_value	:	6,
    });
 
    this.importUnit('andrea-doria', {
      type		:	"andrea-doria" ,
      name		: 	"Andrea Doria",
      personage		:	true,
      army_leader	:	true,
      img		:	"Andrea_Doria.svg",
      battle_rating	:	2,
      command_value	:	0,
    });
 


    let first_time_running = 0;

    //
    // initialize
    //
    if (!this.game.state) {

      first_time_running = 1;
      this.game.state = this.returnState();
      this.game.spaces = this.returnSpaces();
      this.game.navalspaces = this.returnNavalSpaces();
      this.game.players_info = this.returnPlayers(this.game.players.length);

console.log("PLAYERS INFO: " + JSON.stringify(this.game.players_info));

      if (this.game.dice === "") {
        this.initializeDice();
      }

console.log("\n\n\n\n");
console.log("---------------------------");
console.log("---------------------------");
console.log("------ INITIALIZE GAME ----");
console.log("---------------------------");
console.log("---------------------------");
console.log("---------------------------");
console.log("DECK: " + this.game.options.deck);
console.log("\n\n\n\n");

      this.updateStatus("<div class='status-message' id='status-message'>Generating the Game</div>");

      //
      // Game Queue
      //
      this.game.queue.push("round");

      this.game.queue.push("READY");
      this.game.queue.push("DECK\t1\t"+JSON.stringify(this.deck));

      this.game.queue.push("init");

    }


console.log("INIT GAME SPACES!");

    //
    // attach events to spaces
    //
    this.spaces = {};
    for (let key in this.game.spaces) {
      this.spaces[key] = this.importSpace(this.game.spaces[key], key);
    }

console.log("DONE INIT GAME SPACES!");

    //
    // add initial units
    //
    if (first_time_running == 1) {

console.log("is first tiem running: " + this.game.state.scenario);

      //
      // add some units
      //
      if (this.game.state.scenario == "1517") {

console.log("adding stuff!");

	// OTTOMAN
        this.addPersonage("ottoman", "istanbul", "suleiman");
        this.addPersonage("ottoman", "istanbul", "ibrahim-pasha");
        this.addRegular("ottoman", "istanbul", 7);
        this.addCavalry("ottoman", "istanbul", 1);
        this.addNavalSquadron("ottoman", "istanbul", 1);
        this.addRegular("ottoman", "edirne");
        this.addRegular("ottoman", "salonika", 1);
        this.addNavalSquadron("ottoman", "salonika", 1);
        this.addRegular("ottoman", "athens", 1);
        this.addNavalSquadron("ottoman", "athens", 1);

	// HAPSBURG
	this.addPersonage("hapsburg", "valladolid", "charles-v");
	this.addPersonage("hapsburg", "valladolid", "duke-of-alva");
        this.addRegular("hapsburg", "seville", 1);
        this.addNavalSquadron("hapsburg", "seville", 1);
        this.addRegular("hapsburg", "barcelona", 1);
        this.addNavalSquadron("hapsburg", "barcelona", 1);
        this.addRegular("hapsburg", "navarre", 1);
        this.addRegular("hapsburg", "tunis", 1);
        this.addRegular("hapsburg", "naples", 2);
        this.addNavalSquadron("hapsburg", "naples", 2);
        this.addRegular("hapsburg", "besancon", 1);
        this.addRegular("hapsburg", "brussels", 1);
	this.addPersonage("hapsburg", "vienna", "ferdinand");
        this.addRegular("hapsburg", "vienna", 4);
        this.addRegular("hapsburg", "antwerp", 3);

	// ENGLAND
        this.addPersonage("england", "london", "henry-viii");
        this.addPersonage("england", "london", "charles-brandon");
        this.addRegular("england", "london", 3);
        this.addNavalSquadron("england", "london", 1);
        this.addNavalSquadron("england", "portsmouth", 1);
        this.addRegular("england", "calais", 2);
        this.addRegular("england", "york", 1);
        this.addRegular("england", "bristol", 1);

	// FRANCE
        this.addPersonage("france", "paris", "francis-i");
        this.addPersonage("france", "paris", "montmorency");
        this.addRegular("france", "paris", 4);
        this.addRegular("france", "rouen", 1);
        this.addNavalSquadron("france", "rouen", 1);
        this.addRegular("france", "bordeaux", 2);
        this.addRegular("france", "lyon", 1);
        this.addRegular("france", "marseille", 1);
        this.addNavalSquadron("france", "marseille", 1);
        this.addRegular("france", "milan", 2);

	// PAPACY
        this.addRegular("papacy", "rome", 1);
        this.addNavalSquadron("papacy", "rome", 1);
        this.addRegular("papacy", "ravenna", 1);
	
	// PROTESTANT
        this.addRegular("papacy", "rome", 1);
        this.addNavalSquadron("papacy", "rome", 1);
        this.addRegular("papacy", "ravenna", 1);
	
	// VENICE
        this.addRegular("venice", "venice", 2);
        this.addNavalSquadron("venice", "venice", 3);
        this.addRegular("venice", "corfu", 1);
        this.addRegular("venice", "candia", 1);
	
	// GENOA
        this.addPersonage("genoa", "genoa", "andrea-doria");
        this.addNavalSquadron("genoa", "genoa", 1);
        this.addRegular("genoa", "genoa", 2);
	
	// SCOTLAND
        this.addRegular("scotland", "edinburgh", 3);
        this.addNavalSquadron("scotland", "edinburgh", 1);
	
	// INDEPENDENT
        this.addRegular("independent", "rhodes", 1);
        this.addNavalSquadron("independent", "metz", 1);
        this.addRegular("independent", "florence", 1);
	
      }



      if (this.game.state.scenario === "1532") {

      }

      if (this.game.state.scenario === "tournament") {

      }
    }

    //
    // and show the board
    //
    this.displayBoard();

  }





  //
  // manually announce arcade banner support
  //
  respondTo(type) {

    if (super.respondTo(type) != null) {
      return super.respondTo(type);
    }

    if (type == "arcade-carousel") {
      let obj = {};
      obj.background = "/his/img/arcade/arcade-banner-background.png";
      obj.title = "Here I Stand";
      return obj;
    }
   
    return null;
 
  }




  initializeHTML(app) {

    if (this.browser_active == 0) { return; }

    super.initializeHTML(app);


    let game_mod = this;

    //
    //
    //
    if (!this.game.state) {
      this.game.state = this.returnState();
    }


    this.app.modules.respondTo("chat-manager").forEach(mod => {
      mod.respondTo('chat-manager').render(app, this);
      mod.respondTo('chat-manager').attachEvents(app, this);
    });

    // required here so menu will be proper
    try {
      if (this.app.options.gameprefs.hereistand_expert_mode == 1) {
        this.confirm_moves = 0;
      } else {
        this.confirm_moves = 1;
      }
    } catch (err) {}


    this.menu.addMenuOption({
      text : "Game",
      id : "game-game",
      class : "game-game",
      callback : function(app, game_mod) {
	game_mod.menu.showSubMenu("game-game");
      }
    });
    this.menu.addSubMenuOption("game-game", {
      text : "Log",
      id : "game-log",
      class : "game-log",
      callback : function(app, game_mod) {
        game_mod.menu.hideSubMenus();
        game_mod.log.toggleLog();
      }
    });
    let initial_confirm_moves = "Newbie Mode"; 
    if (this.confirm_moves == 1) {
      initial_confirm_moves = "Expert Mode"; 
    }
    this.menu.addSubMenuOption("game-game", {
      text : initial_confirm_moves,
      id : "game-confirm",
      class : "game-confirm",
      callback : function(app, game_mod) {
        game_mod.menu.hideSubMenus();
	if (game_mod.confirm_moves == 0) {
	  game_mod.confirm_moves = 1;
          game_mod.saveGamePreference('twilight_expert_mode', 0);
	  window.location.reload();	
	} else {
	  game_mod.confirm_moves = 0;
          game_mod.saveGamePreference('twilight_expert_mode', 1);
	  window.location.reload();	
	}
      }
    });
    this.menu.addSubMenuOption("game-game", {
      text : "Stats",
      id : "game-stats",
      class : "game-stats",
      callback : function(app, game_mod) {
	game_mod.menu.hideSubMenus();
        game_mod.handleStatsMenu();
      }
    });
    this.menu.addSubMenuOption("game-game", {
      text : "Exit",
      id : "game-exit",
      class : "game-exit",
      callback : function(app, game_mod) {
        window.location.href = "/arcade";
      }
    });
    this.menu.addMenuOption({
      text : "Cards",
      id : "game-cards",
      class : "game-cards",
      callback : function(app, game_mod) {
	game_mod.menu.hideSubMenus();
        game_mod.handleCardsMenu();
      }
    });
    this.menu.addMenuOption({
      text : "Factions",
      id : "game-factions",
      class : "game-factions",
      callback : function(app, game_mod) {
	game_mod.menu.hideSubMenus();
	game_mod.menu.showSubMenu("game-factions");
      }
    });
    this.menu.addSubMenuOption("game-factions", {
      text : "Hapsburgs",
      id : "game-hapsburgs",
      class : "game-hapsburgs",
      callback : function(app, game_mod) {
        game_mod.displayFactionSheet("hapsburg"); 
      }
    });
    this.menu.addSubMenuOption("game-factions", {
      text : "England",
      id : "game-england",
      class : "game-england",
      callback : function(app, game_mod) {
        game_mod.displayFactionSheet("england"); 
      }
    });
    this.menu.addSubMenuOption("game-factions", {
      text : "France",
      id : "game-france",
      class : "game-france",
      callback : function(app, game_mod) {
        game_mod.displayFactionSheet("france");
      }
    });
    this.menu.addSubMenuOption("game-factions", {
      text : "Ottoman Empire",
      id : "game-ottoman",
      class : "game-ottoman",
      callback : function(app, game_mod) {
        game_mod.displayFactionSheet("ottoman");
      }
    });
    this.menu.addSubMenuOption("game-factions", {
      text : "Protestants",
      id : "game-protestants",
      class : "game-protestants",
      callback : function(app, game_mod) {
        game_mod.displayFactionSheet("protestant");
      }
    });
    this.menu.addSubMenuOption("game-factions", {
      text : "Papacy",
      id : "game-papacy",
      class : "game-papacy",
      callback : function(app, game_mod) {
        game_mod.displayFactionSheet("papacy");
      }
    });


    this.menu.addChatMenu(app, this);
    this.menu.addMenuIcon({
      text : '<i class="fa fa-window-maximize" aria-hidden="true"></i>',
      id : "game-menu-fullscreen",
      callback : function(app, game_mod) {
	game_mod.menu.hideSubMenus();
        app.browser.requestFullscreen();
      }
    });

    this.menu.render(app, this);
    this.menu.attachEvents(app, this);

    this.log.render(app, this);
    this.log.attachEvents(app, this);

    this.cardbox.render(app, this);
    this.cardbox.attachEvents(app, this);

    //
    // add card events -- text shown and callback run if there
    //
    this.cardbox.addCardType("showcard", "", null);
    this.cardbox.addCardType("card", "select", this.cardbox_callback);
    if (app.browser.isMobileBrowser(navigator.userAgent)) {
      this.cardbox.skip_card_prompt = 0;
    }

    //
    // position cities / spaces / etc
    //
    let spaces = this.returnSpaces();
    for (let key in spaces) {
      if (spaces.hasOwnProperty(key)) {
	try {
	  let obj = document.getElementById(key);
	  obj.style.top = spaces[key].top + "px";
	  obj.style.left = spaces[key].left + "px";
        } catch (err) {
	}
      }
    }

    //
    // position electorate display
    //
    let elec = this.returnElectorateDisplay();
    for (let key in elec) {
      if (elec.hasOwnProperty(key)) {
        try {
          let obj = document.getElementById(`ed_${key}`);
          obj.style.top = elec[key].top + "px";
          obj.style.left = elec[key].left + "px";
        } catch (err) {
        }
      }
    }



    try {

      if (app.browser.isMobileBrowser(navigator.userAgent)) {
        this.hammer.render(this.app, this);
        this.hammer.attachEvents(this.app, this, '.gameboard');
      } else {
	let his_self = this;
        this.sizer.render(this.app, this);
        this.sizer.attachEvents(this.app, this, '.gameboard');
        $('#gameboard').draggable({
	  stop : function(event, ui) {
	    his_self.saveGamePreference((his_self.returnSlug()+"-board-offset"), ui.offset);
	  }
	});
      }

    } catch (err) {}

    this.hud.render(app, this);
    this.hud.attachEvents(app, this);

    this.displayBoard();

  }



  returnGameOptionsHTML() {

    return `
      <div style="padding:40px;width:100vw;height:100vh;overflow-y:scroll;display:grid;grid-template-columns: 200px auto">
	<div style="top:0;left:0;">

            <label for="player1">Play as:</label>
            <select name="player1">
              <option value="random" selected>random</option>
              <option value="ussr">Protestants</option>
              <option value="us">Papacy</option>
            </select>

            <label for="scenario">Scenario:</label>
            <select name="scenario" id="scenario">
            <option value="original">original</option>
              <option value="1517" selected>1517 - long game</option>
              <option value="1532">1532 - shorter game</option>
              <option value="tournament">1532 - tournament</option>
            </select>

            <div id="game-wizard-advanced-return-btn" class="game-wizard-advanced-return-btn button">accept</div>

	</div>
    </div>

          `;


  }




  addUnit(faction, space, type) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    space.units[faction].push(this.newUnit(faction, type));
  }

  addRegular(faction, space, num=1) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    for (let i = 0; i < num; i++) {
      space.units[faction].push(this.newUnit(faction, "regular"));
    }
  }

  addMercenary(faction, space, num=1) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    for (let i = 0; i < num; i++) {
      space.units[faction].push(this.newUnit(faction, "mercenary"));
    }
  }

  addCavalry(faction, space, num=1) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    for (let i = 0; i < num; i++) {
      space.units[faction].push(this.newUnit(faction, "cavalry"));
    }
  }

  addNavalSquadron(faction, space, num=1) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    for (let i = 0; i < num; i++) {
      space.units[faction].push(this.newUnit(faction, "squadron"));
    }
  }

  addCorsair(faction, space, num=1) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    for (let i = 0; i < num; i++) {
      space.units[faction].push(this.newUnit(faction, "corsair"));
    }
  }

  addDebater(faction, space, debater) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    space.units[faction].push(this.newDebater(faction, debater));
  }

  addPersonage(faction, space, personage) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    space.units[faction].push(this.newPersonage(faction, personage));
  }

  convertSpace(religion, space) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    space.religion = religion;
    this.displayBoard();
  }

  returnImpulseOrder() {
    return ["ottoman","hapsburg","england","france","papacy","protestant"];
  }

  isSpaceFriendly() {
    return 1;
  }

  isSpaceAdjacentToReligion(space, religion) {
    try { if (this.spaces[space]) { space = this.spaces[space]; } } catch (err) {}
    for (let i = 0; i < space.neighbours.length; i++) {
      if (this.spaces[space.neighbours[i]].religion === religion) {
	return true;
      }
    }
    return false;
  }

  returnNumberOfElectoratesControlledByCatholics() {
    let controlled_keys = 0;
    if (this.spaces['augsburg'].religion === "catholic") { controlled_keys++; }
    if (this.spaces['mainz'].religion === "catholic") { controlled_keys++; }
    if (this.spaces['trier'].religion === "catholic") { controlled_keys++; }
    if (this.spaces['cologne'].religion === "catholic") { controlled_keys++; }
    if (this.spaces['wittenberg'].religion === "catholic") { controlled_keys++; }
    if (this.spaces['brandenburg'].religion === "catholic") { controlled_keys++; }
    return controlled_keys;
  }
  returnNumberOfElectoratesControlledByProtestants() {
    let controlled_keys = 0;
    if (this.spaces['augsburg'].religion === "protestant") { controlled_keys++; }
    if (this.spaces['mainz'].religion === "protestant") { controlled_keys++; }
    if (this.spaces['trier'].religion === "protestant") { controlled_keys++; }
    if (this.spaces['cologne'].religion === "protestant") { controlled_keys++; }
    if (this.spaces['wittenberg'].religion === "protestant") { controlled_keys++; }
    if (this.spaces['brandenburg'].religion === "protestant") { controlled_keys++; }
    return controlled_keys;
  }
  returnNumberOfKeysControlledByFaction(faction) {
    let controlled_keys = 0;
    for (let key in this.spaces) {
      if (this.spaces[key].type === "key") {
        if (this.spaces[key].political === this.factions[faction].key || (this.spaces[key].political === "" && this.spaces[key].home === this.factions[faction].key)) {
          controlled_keys++;
        }
      }
    }
    return controlled_keys;
  }
  returnNumberOfKeysControlledByPlayer(player_num) {
    let faction = this.game.players_info[player_num-1].faction;
    let controlled_keys = 0;
    for (let key in this.spaces) {
      if (this.spaces[key].type === "key") {
        if (this.spaces[key].political === this.factions[faction].key || (this.spaces[key].political === "" && this.spaces[key].home === this.factions[faction].key)) {
          controlled_keys++;
        }
      }
    }
    return controlled_keys;
  }


  /////////////////////
  // Core Game State //
  /////////////////////
  returnState() {

    let state = {};

    state.scenario = "1517";
    if (this.game.options.scenario) { state.scenario = this.game.options.scenario; }
    state.round = 0;
    state.players = [];
    state.events = {};
    state.tmp_protestant_reformation_bonus = 0;
    state.tmp_catholic_reformation_bonus = 0;
    state.tmp_protestant_counter_reformation_bonus = 0;
    state.tmp_catholic_counter_reformation_bonus = 0;

    return state;

  }


  returnColonies() {

    let colonies = {};

    colonies['1'] = {
      top : 1007,
      left : 55
    }
    colonies['2'] = {
      top : 1120,
      left : 55
    }
    colonies['3'] = {
      top : 1232,
      left : 55
    }
    colonies['4'] = {
      top : 1344,
      left : 55
    }
    colonies['5'] = {
      top : 1456,
      left : 55
    }
    colonies['6'] = {
      top : 1568,
      left : 55
    }
    colonies['7'] = {
      top : 1680,
      left : 55
    }

    return colonies;

  }


  returnNewWorld() {

    let nw = {};

    nw['greatlakes'] = {
      top : 1906 ,
      left : 280,
      vp : 1
    }
    nw['stlawrence'] = {
      top : 1886 ,
      left : 515,
      vp : 1
    }
    nw['mississippi'] = {
      top : 2075 ,
      left : 280 ,
      vp : 1
    }
    nw['aztec'] = {
      top : 2258 ,
      left : 168 ,
      vp : 2
    }
    nw['maya'] = {
      top : 2300 ,
      left : 302 ,
      vp : 2
    }
    nw['amazon'] = {
      top : 2536 ,
      left : 668 ,
      vp : 2
    }
    nw['inca'] = {
      top : 2660 ,
      left : 225,
      vp : 2
    }
    nw['circumnavigation'] = {
      top : 2698,
      left : 128,
      vp : 3
    }
    nw['pacificstrait'] = {
      top : 2996 ,
      left : 486 ,
      vp : 1
    }


    return nw;

  }


  returnConquest() {

    let conquest = {};

    conquest['1'] = {
      top : 1007,
      left : 178
    }
    conquest['2'] = {
      top : 1120,
      left : 178
    }
    conquest['3'] = {
      top : 1232,
      left : 178
    }
    conquest['4'] = {
      top : 1344,
      left : 178
    }
    conquest['5'] = {
      top : 1456,
      left : 178
    }
    conquest['6'] = {
      top : 1568,
      left : 178
    }
    conquest['7'] = {
      top : 1680,
      left : 178
    }

    return conquest;

  }

  returnVictoryPointTrack() {

    let track = {};

    track['1'] = {
      top : 2912,
      left : 2138
    }
    track['2'] = {
      top : 2912,
      left : 2252
    }
    track['3'] = {
      top : 2912,
      left : 2366
    }
    track['4'] = {
      top : 2912,
      left : 2480
    }
    track['5'] = {
      top : 2912,
      left : 2594
    }
    track['6'] = {
      top : 2912,
      left : 2708
    }
    track['7'] = {
      top : 2912,
      left : 2822
    }
    track['8'] = {
      top : 2912,
      left : 2936
    }
    track['9'] = {
      top : 2912,
      left : 3050
    }
    track['10'] = {
      top : 3026,
      left : 884
    }
    track['11'] = {
      top : 3026,
      left : 998
    }
    track['12'] = {
      top : 3026,
      left : 1112
    }
    track['13'] = {
      top : 1226,
      left : 1
    }
    track['14'] = {
      top : 3026,
      left : 1340
    }
    track['15'] = {
      top : 3026,
      left : 1454
    }
    track['16'] = {
      top : 3026,
      left : 1568
    }
    track['17'] = {
      top : 3026,
      left : 1682
    }
    track['18'] = {
      top : 3026,
      left : 1796
    }
    track['19'] = {
      top : 3026,
      left : 1910
    }
    track['20'] = {
      top : 3026,
      left : 2024
    }
    track['21'] = {
      top : 3026,
      left : 2138
    }
    track['22'] = {
      top : 3026,
      left : 2252
    }
    track['23'] = {
      top : 3026,
      left : 2366
    }
    track['24'] = {
      top : 3026,
      left : 2480
    }
    track['25'] = {
      top : 3026,
      left : 2594
    }
    track['26'] = {
      top : 3026,
      left : 2708
    }
    track['27'] = {
      top : 3026,
      left : 2822
    }
    track['28'] = {
      top : 3026,
      left : 2936
    }
    track['29'] = {
      top : 3026,
      left : 3050
    }

  }


  returnNavalSpaces() {

    let seas = {};

    seas['irish'] = {
      top : 875 ,
      left : 900 ,
      name : "Irish Sea" ,
      neighbours : ["biscay","north","channel"] ,
    }
    seas['biscay'] = {
      top : 1500 ,
      left : 1400 ,
      name : "Bay of Biscay" ,
      neighbours : ["irish","channel","atlantic"] ,
    }
    seas['atlantic'] = {
      top : 2700 ,
      left : 850 ,
      name : "Atlantic Ocean" ,
      neighbours : ["biscay"] ,
    }
    seas['channel'] = {
      top : 1020 ,
      left : 1450 ,
      name : "English Channel" ,
      neighbours : ["irish","biscay","north"] ,
    }
    seas['north'] = {
      top : 200 ,
      left : 2350 ,
      name : "North Sea" ,
      neighbours : ["irish","channel","baltic"] ,
    }
    seas['baltic'] = {
      top : 50 ,
      left : 3150 ,
      name : "Baltic Sea" ,
      neighbours : ["north"] ,
    }
    seas['lyon'] = {
      top : 1930 ,
      left : 2430 ,
      name : "Gulf of Lyon" ,
      neighbours : ["barbary","tyrrhenian"] ,
    }
    seas['barbary'] = {
      top : 2330 ,
      left : 2430 ,
      name : "Barbary Coast" ,
      neighbours : ["lyon","tyrrhenian","ionian","africa"] ,
    }
    seas['tyrrhenian'] = {
      top : 2260 ,
      left : 3300 ,
      name : "Tyrrhenian Sea" ,
      neighbours : ["barbary","lyon"] ,
    }
    seas['africa'] = {
      top : 2770 ,
      left : 4200 ,
      name : "North African Coast" ,
      neighbours : ["ionian","barbary","aegean"] ,
    }
    seas['aegean'] = {
      top : 2470 ,
      left : 4450 ,
      name : "Aegean Sea" ,
      neighbours : ["black","africa","ionian"] ,
    }
    seas['ionian'] = {
      top : 2390 ,
      left : 3750 ,
      name : "Ionian Sea" ,
      neighbours : ["black","aegean","adriatic"] ,
    }
    seas['adriatic'] = {
      top : 1790 ,
      left : 3400 ,
      name : "Adriatic Sea" ,
      neighbours : ["ionian"] ,
    }
    seas['black'] = {
      top : 1450 ,
      left : 4750 ,
      name : "Black Sea" ,
      neighbours : ["aegean"] ,
    }

    for (let key in seas) {
      seas[key].units = {};
      seas[key].units['england'] = [];
      seas[key].units['france'] = [];
      seas[key].units['hapsburg'] = [];
      seas[key].units['ottoman'] = [];
      seas[key].units['papacy'] = [];
      seas[key].units['protestant'] = [];
      seas[key].units['venice'] = [];
      seas[key].units['genoa'] = [];
      seas[key].units['hungary'] = [];
      seas[key].units['scotland'] = [];
      seas[key].units['independent'] = [];
    }

    return seas;
  }

  returnSpaces() {

    let spaces = {};

    spaces['stirling'] = {
      top: 70,
      left: 1265,
      home: "scotland",
      political: "scotland",
      religion: "catholic",
      neighbours: ["glasgow","edinburgh"],
      language: "english",
      type: "fortress"
    }
    spaces['glasgow'] = {
      top: 225,
      left: 1285,
      home: "scotland",
      political: "scotland",
      religion: "catholic",
      neighbours: ["stirling","edinburgh","carlisle"],
      language: "english",
      type: "town"
    }
    spaces['edinburgh'] = {
      top: 125,
      left: 1420,
      home: "scotland",
      political: "scotland",
      religion: "catholic",
      neighbours: ["stirling","carlisle","berwick"],
      language: "english",
      type: "key"
    }
    spaces['berwick'] = {
      top: 183,
      left: 1572,
      home: "england",
      political: "england",
      neighbours: ["edinburgh","carlisle","york"],
      language: "english",
      religion: "catholic",
      type: "town"
    }
    spaces['carlisle'] = {
      top: 276,
      left: 1447,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["glasgow","berwick","york","shrewsbury"],
      language: "english",
      type: "town"
    }
    spaces['york'] = {
      top: 375,
      left: 1595,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["berwick","carlisle","shrewsbury","lincoln"],
      language: "english",
      type: "key"
    }
    spaces['wales'] = {
      top: 633,
      left: 1398,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["shrewsbury","bristol"],
      language: "english",
      type: "key"

    }
    spaces['shrewsbury'] = {
      top: 521,
      left: 1535,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["wales","carlisle","york","london","bristol"],
      language: "english",
      type: "town"
    }
    spaces['lincoln'] = {
      top: 531,
      left: 1706,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["london","york"],
      language: "english",
      type: "town"
    }
    spaces['norwich'] = {
      top: 538,
      left: 1896,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours:["london"],
      language: "english",
      type: "town"
    }
    spaces['bristol'] = {
      top: 688,
      left: 1554,
      home: "england",
      political: "england",
      religion: "catholic",
      language: "english",
      neighbours: ["shrewsbury","wales","plymouth","portsmouth","london"],
      type: "key"
    }
    spaces['london'] = {
      top: 706,
      left: 1785,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["norwich","lincoln","bristol","portsmouth","shrewsbury"],
      language: "english",
      type: "key"
    }
    spaces['plymouth'] = {
      top: 898,
      left: 1398,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["bristol","portsmouth"],
      language: "english",
      type: "town"
    }
    spaces['portsmouth'] = {
      top: 821,
      left: 1661,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["plymouth","bristol","london"],
      language: "english",
      type: "town"
    }
    spaces['calais'] = {
      top: 745,
      left: 2022,
      home: "england",
      political: "england",
      religion: "catholic",
      neighbours: ["boulogne","brussels","antwerp"],
      language: "french",
      type: "key"
    }

    spaces['boulogne'] = {
      top: 880,
      left: 1955,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["calais","rouen","paris","stquentin"],
      language: "french",
      type: "town"
    }
    spaces['stquentin'] = {
      top: 933,
      left: 2093,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["brussels","stdizier","paris","boulogne"],
      type: "town"
    }
    spaces['stdizier'] = {
      top: 1043,
      left: 2205,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["brussels","stquentin","paris","dijon","metz"],
      language: "french",
      type: "town"
    }
    spaces['paris'] = {
      top: 1063,
      left: 2009,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["rouen","boulogne","stquentin","stdizier","dijon","orleans"],
      language: "french",
      type: "key"
    }
    spaces['rouen'] = {
      top: 1000,
      left: 1805,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["boulogne","paris","tours","nantes"],
      language: "french",
      type: "key"
    }
    spaces['orleans'] = {
      top: 1217,
      left: 2018,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["paris","tours","dijon","lyon"],
      language: "french",
      type: "town"
    }
    spaces['dijon'] = {
      top: 1205,
      left: 2204,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["stdizier","paris","orleans","lyon","besancon"],
      type: "town"
    }
    spaces['limoges'] = {
      top: 1398,
      left: 1975,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["tours","bordeaux","lyon"],
      language: "french",
      type: "town"
    }
    spaces['tours'] = {
      top: 1277,
      left: 1849,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["rouen","nantes","bordeaux","limoges","orleans"],
      language: "french",
      type: "town"
    }
    spaces['nantes'] = {
      top: 1310,
      left: 1650,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["brest","rouen","tours","bordeaux"],
      language: "french",
      type: "town"
    }
    spaces['brest'] = {
      top: 1173,
      left: 1409,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["nantes"],
      language: "french",
      type: "town"
    }
    spaces['bordeaux'] = {
      top: 1568,
      left: 1780,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["navarre", "nantes","tours","limoges"],
      pass: ["navarre"],
      language: "french",
      type: "key"
    }
    spaces['lyon'] = {
      top: 1445,
      left: 2312,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["avignon","limoges","orleans","dijon","geneva","grenoble"],
      language: "french",
      type: "key"
    }
    spaces['grenoble'] = {
      top: 1590,
      left: 2437,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["turin","lyon","geneva"],
      pass: ["turin"],
      language: "french",
      type: "town"
    }
    spaces['avignon'] = {
      top: 1645,
      left: 2292,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["barcelona","toulouse","lyon","marseille"],
      pass: ["barcelona"],
      language: "french",
      type: "town"
    }
    spaces['marseille'] = {
      top: 1781,
      left: 2390,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["avignon","nice"],
      language: "french",
      type: "key"
    }
    spaces['toulouse'] = {
      top: 1740,
      left: 1990,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["barcelona","bordeaux","avignon"],
      pass: ["barcelona"],
      language: "french",
      type: "town"
    }
    spaces['bordeaux'] = {
      top: 1568,
      left: 1780,
      home: "france",
      political: "france",
      religion: "catholic",
      neighbours: ["nantes","tours","limoges","toulouse"],
      language: "french",
      type: "key"
    }

    spaces['munster'] = {
      top: 537,
      left: 2500,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["bremen","kassel","cologne","amsterdam"],
      language: "german",
      type: "town"
    }
    spaces['bremen'] = {
      top: 422,
      left: 2595,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours:["munster","brunswick","hamburg"],
      language: "german",
      type: "town"
    }
    spaces['hamburg'] = {
      top: 345,
      left: 2758,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["bremen","brunswick","lubeck"],
      language: "german",
      type: "town"
    }
    spaces['lubeck'] = {
      top: 258,
      left: 2985,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["hamburg","magdeburg","brandenburg","stettin"],
      language: "german",
      type: "town"
    }
    spaces['stettin'] = {
      top: 310,
      left: 3214,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["lubeck","brandenburg"],
      language: "german",
      type: "town"
    }
    spaces['brandenburg'] = {
      top: 460,
      left: 3077,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["stettin","lubeck","magdeburg","wittenberg","breslau"],
      language: "german",
      type: "electorate"
    }
    spaces['wittenberg'] = {
      top: 600,
      left: 3130,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["brandenburg","magdeburg","leipzig","prague","breslau"],
      language: "german",
      type: "electorate"
    }
    spaces['magdeburg'] = {
      top: 534,
      left: 2932,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["lubeck","brandenburg","wittenberg","erfurt","brunswick"],
      language: "german",
      type: "town"
    }
    spaces['brunswick'] = {
      top: 568,
      left: 2722,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["bremen","hamburg","magdeburg","kassel"],
      language: "german",
      type: "town"
    }
    spaces['cologne'] = {
      top: 716,
      left: 2500,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["munster","mainz","liege"],
      language: "german",
      type: "electorate"
    }
    spaces['kassel'] = {
      top: 714,
      left: 2665,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["munster","brunswick","erfurt","nuremberg","mainz"],
      language: "german",
      type: "town"
    }
    spaces['erfurt'] = {
      top: 750,
      left: 2824,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["magdeburg","kassel","leipzig"],
      language: "german",
      type: "town"
    }
    spaces['leipzig'] = {
      top: 690,
      left: 2983,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["wittenberg","prague","nuremberg","erfurt"],
      language: "german",
      type: "town"
    }
    spaces['regensburg'] = {
      top: 956,
      left: 3033,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["nuremberg","augsburg","salzburg","linz"],
      language: "german",
      type: "town"
    }
    spaces['salzburg'] = {
      top: 1108,
      left: 3147,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["graz","linz","regensburg","augsburg","innsbruck"],
      pass: ["graz"],
      language: "german",
      type: "town"
    }
    spaces['augsburg'] = {
      top: 1080,
      left: 2860,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["innsbruck","worms","nuremberg","regensburg","salzburg"],
      pass: ["innsbruck"],
      language: "german",
      type: "electorate"
    }
    spaces['nuremberg'] = {
      top: 925,
      left: 2834,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["augsburg","worms","mainz","kassel","leipzig","regensburg"],
      language: "german",
      type: "town"
    }
    spaces['mainz'] = {
      top: 868,
      left: 2666,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["trier","cologne","kassel","nuremberg","worms"],
      language: "german",
      type: "electorate"
    }
    spaces['trier'] = {
      top: 894,
      left: 2516,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["liege","metz","mainz"],
      language: "german",
      type: "town"
    }
    spaces['strasburg'] = {
      top: 1070,
      left: 2578,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["metz","besancon","basel","worms"],
      language: "german",
      type: "town"
    }
    spaces['worms'] = {
      top: 1009,
      left: 2704,
      home: "",
      political: "hapsburg",
      religion: "catholic",
      neighbours: ["strasburg","mainz","nuremberg","augsburg"],
      language: "german",
      type: "town"
    }
    spaces['navarre'] = {
      top: 1814,
      left: 1702,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["zaragoza","bilbao"],
      language: "spanish",
      type: "key"
    }
    spaces['bilbao'] = {
      top: 1825,
      left: 1533,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["corunna","valladolid","zaragoza","navarre"],
      language: "spanish",
      type: "town"
    }
    spaces['corunna'] = {
      top: 1870,
      left: 1015,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["bilbao","valladolid"],
      language: "spanish",
      type: "town"
    }
    spaces['valladolid'] = {
      top: 2058,
      left: 1394,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["corunna","bilbao","madrid"],
      language: "spanish",
      type: "key"
    }
    spaces['zaragoza'] = {
      top: 2025,
      left: 1777,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["navarre","bilbao","madrid","barcelona"],
      language: "spanish",
      type: "town"
    }
    spaces['barcelona'] = {
      top: 2062,
      left: 2106,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["toulouse","avignon","zaragoza","valencia"],
      pass: ["toulouse","avignon"],
      language: "spanish",
      type: "key"
    }
    spaces['palma'] = {
      top: 2266,
      left: 2211,
      home: "hapsburg",
      political: "",
      neighbours: ["cartagena","cagliari"],
      language: "other",
      religion: "catholic",
      type: "town"
    }
    spaces['madrid'] = {
      top: 2236,
      left: 1550,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["cordoba","valladolid","zaragoza","valencia"],
      language: "spanish",
      type: "town"
    }
    spaces['valencia'] = {
      top: 2333,
      left: 1871,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["cartagena","madrid","barcelona"],
      language: "spanish",
      type: "town"
    }
    spaces['cartagena'] = {
      top: 2593,
      left: 1830,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["granada","valencia"],
      language: "spanish",
      type: "town"
    }
    spaces['granada'] = {
      top: 2657,
      left: 1558,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["cordoba","gibraltar","cartagena"],
      language: "spanish",
      type: "town"
    }
    spaces['seville'] = {
      top: 2642,
      left: 1319,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["cordoba","gibraltar"],
      language: "spanish",
      type: "key"
    }
    spaces['cordoba'] = {
      top: 2530,
      left: 1446,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["madrid","seville","granada"],
      language: "spanish",
      type: "town"
    }
    spaces['gibraltar'] = {
      top: 2814,
      left: 1374,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["seville","granada"],
      language: "spanish",
      type: "fortress"
    }
    spaces['oran'] = {
      top: 2822,
      left: 1902,
      home: "hapsburg ottoman",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "town"
    }
    spaces['algiers'] = {
      top: 2656,
      left: 2275,
      home: "ottoman independent",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "key"
    }
    spaces['tunis'] = {
      top: 2599,
      left: 2945,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "key"
    }
    spaces['cagliari'] = {
      top: 2320,
      left: 2828,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "town"
    }
    spaces['palermo'] = {
      top: 2421,
      left: 3260,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["messina"],
      language: "italian",
      type: "town"
    }
    spaces['messina'] = {
      top: 2429,
      left: 3475,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["palermo","naples","taranto"],
      language: "italian",
      type: "town"
    }
    spaces['cerignola'] = {
      top: 1915,
      left: 3426,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["taranto","ancona","rome"],
      language: "italian",
      type: "town"
    }
    spaces['taranto'] = {
      top: 2080,
      left: 3597,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["cerignola","naples","messina"],
      language: "italian",
      type: "town"
    }
    spaces['naples'] = {
      top: 2087,
      left: 3358,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["rome","taranto","messina"],
      language: "italian",
      type: "key"
    }
    spaces['malta'] = {
      top: 2715,
      left: 3380,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "fortress"
    }
    spaces['vienna'] = {
      top: 1020,
      left: 3474,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["brunn","linz","graz","pressburg"],
      language: "german",
      type: "key"
    }
    spaces['linz'] = {
      top: 1045,
      left: 3288,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["prague","regensburg","salzburg","vienna"],
      language: "german",
      type: "town"
    }
    spaces['graz'] = {
      top: 2715,
      left: 3380,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["salzburg","vienna","mohacs","agram","trieste"],
      pass: ["salzburg"],
      language: "german",
      type: "town"
    }
    spaces['trieste'] = {
      top: 1392,
      left: 3257,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["graz","agram","zara","venice"],
      language: "italian",
      type: "town"
    }
    spaces['innsbruck'] = {
      top: 1170,
      left: 3016,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["augsburg","trent","zurich","salzburg"],
      pass: ["augsburg","trent"],
      language: "german",
      type: "town"
    }
    spaces['tripoli'] = {
      top: 3030,
      left: 3316,
      home: "hapsburg ottoman",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "town"
    }
    spaces['candia'] = {
      top: 2670,
      left: 4484,
      home: "venice",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "fortress"
    }
    spaces['rhodes'] = {
      top: 2524,
      left: 4730,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "town"
    }
    spaces['corfu'] = {
      top: 2210,
      left: 3868,
      home: "venice",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "fortress"
    }
    spaces['coron'] = {
      top: 2510,
      left: 4146,
      home: "",
      political: "",
      religion: "other",
      neighbours: ["athens"],
      language: "other",
      type: "town"
    }
    spaces['athens'] = {
      top: 2346,
      left: 4286,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["larissa","lepanto","coron"],
      language: "other",
      type: "key"
    }
    spaces['lepanto'] = {
      top: 2320,
      left: 4057,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["larissa","athens"],
      language: "other",
      type: "town"
    }
    spaces['larissa'] = {
      top: 2184,
      left: 4130,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["durazzo","lepanto","athens","salonika"],
      pass: ["durazzo"],
      language: "other",
      type: "town"
    }
    spaces['salonika'] = {
      top: 2010,
      left: 4164,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["larissa","edirne"],
      language: "other",
      type: "key"
    }
    spaces['durazzo'] = {
      top: 2040,
      left: 3844,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["larissa","scutari"],
      pass: ["larissa"],
      language: "other",
      type: "town"
    }
    spaces['scutari'] = {
      top: 1860,
      left: 3819,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["nezh","ragusa","durazzo"],
      pass: ["nezh"],
      language: "other",
      type: "fortress"
    }
    spaces['edirne'] = {
      top: 1840,
      left: 4532,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["varna","istanbul","salonika","sofia",],
      language: "other",
      type: "key"
    }
    spaces['istanbul'] = {
      top: 1890,
      left: 4775,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["edirne","varna"],
      language: "other",
      type: "key"
    }
    spaces['varna'] = {
      top: 1620,
      left: 4653,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["bucharest","edirne","istanbul"],
      language: "other",
      type: "town"
    }
    spaces['bucharest'] = {
      top: 1430,
      left: 4459,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["nicopolis","varna"],
      language: "other",
      type: "town"
    }
    spaces['nicopolis'] = {
      top: 1570,
      left: 4336,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["szegedin","sofia","bucharest","belgrade"],
      pass: ["szegedin","sofia"],
      language: "other",
      type: "town"
    }
    spaces['sofia'] = {
      top: 1765,
      left: 4275,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["nicopolis","nezh","edirne"],
      pass: ["nicopolis"],
      language: "other",
      type: "town"
    }
    spaces['nezh'] = {
      top: 1652,
      left: 4070,
      home: "ottoman",
      political: "",
      religion: "other",
      neighbours: ["scutari","belgrade","sofia"],
      pass: ["scutari"],
      language: "other",
      type: "town"
    }


    spaces['belgrade'] = {
      top: 1450,
      left: 3894,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["ragusa","szegedin","mohacs","agram","nezh","nicopolis"],
      pass: ["ragusa"],
      language: "other",
      type: "key"
    }
    spaces['szegedin'] = {
      top: 1268,
      left: 3846,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["nicopolis","buda","belgrade"],
      pass: ["nicopolis"],
      language: "other",
      type: "town"
    }
    spaces['mohacs'] = {
      top: 1353,
      left: 3710,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["buda","graz","agram","belgrade"],
      language: "other",
      type: "town"
    }
    spaces['graz'] = {
      top: 1208,
      left: 3374,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["vienna","mohacs","agram","trieste"],
      language: "german",
      type: "town"
    }
    spaces['agram'] = {
      top: 1373,
      left: 3460,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["zara","graz","trieste","belgrade","mohacs"],
      pass: ["zara"],
      language: "other",
      type: "town"
    }
    spaces['buda'] = {
      top: 1104,
      left: 3746,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["pressburg","mohacs","szegedin"],
      language: "other",
      type: "key"
    }
    spaces['pressburg'] = {
      top: 1080,
      left: 3613,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["vienna","buda"],
      language: "other",
      type: "town"
    }
    spaces['brunn'] = {
      top: 840,
      left: 3526,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["breslau","prague","vienna"],
      language: "other",
      type: "town"
    }
    spaces['breslau'] = {
      top: 640,
      left: 3466,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["brandenburg","wittenberg","brunn"],
      language: "other",
      type: "town"
    }
    spaces['prague'] = {
      top: 785,
      left: 3230,
      home: "hungary",
      political: "",
      religion: "catholic",
      neighbours: ["wittenberg","leipzig","linz"],
      language: "other",
      type: "key"
    }
    spaces['amsterdam'] = {
      top: 546,
      left: 2244,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["antwerp","munster"],
      language: "other",
      type: "town"
    }
    spaces['antwerp'] = {
      top: 669,
      left: 2168,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["antwerp","liege","brussels","calais"],
      language: "other",
      type: "key"
    }
    spaces['brussels'] = {
      top: 823,
      left: 2201,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["antwerp","calais","stquentin","stdizier","liege"],
      language: "french",
      type: "fortress"
    }
    spaces['liege'] = {
      top: 783,
      left: 2351,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["cologne","trier","metz","brussels","antwerp"],
      language: "french",
      type: "town"
    }
    spaces['metz'] = {
      top: 995,
      left: 2384,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["liege","trier","strasburg","besancon","stdizier"],
      language: "french",
      type: "key"
    }
    spaces['besancon'] = {
      top: 1169,
      left: 2390,
      home: "hapsburg",
      political: "",
      religion: "catholic",
      neighbours: ["metz","dijon","geneva","basel","strasburg"],
      language: "french",
      type: "fortress"
    }
    spaces['basel'] = {
      top: 1211,
      left: 2558,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["strasburg","besancon","geneva","zurich"],
      language: "german",
      type: "town"
    }
    spaces['zurich'] = {
      top: 1216,
      left: 2712,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["basel","innsbruck"],
      language: "german",
      type: "town"
    }
    spaces['geneva'] = {
      top: 1367,
      left: 2474,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["basel","besancon","lyon","turin","grenoble"],
      pass: ["turin"],
      language: "french",
      type: "town"
    }
    spaces['milan'] = {
      top: 1373,
      left: 2746,
      home: "independent",
      political: "france",
      religion: "catholic",
      neighbours: ["trent","modena","pavia","turin"],
      language: "italian",
      type: "key"
    }
    spaces['trent'] = {
      top: 1310,
      left: 2933,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["innsbruck","milan","modena","venice"],
      pass: ["innsbruck"],
      language: "italian",
      type: "town"
    }
    spaces['modena'] = {
      top: 1486,
      left: 2951,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["trent","milan","pavia","florence","ravenna","venice"],
      language: "italian",
      type: "town"
    }
    spaces['pavia'] = {
      top: 1505,
      left: 2800,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["milan","turin","genoa","modena"],
      language: "italian",
      type: "town"
    }
    spaces['turin'] = {
      top: 1530,
      left: 2585,
      home: "independent",
      political: "france",
      religion: "catholic",
      neighbours: ["milan","pavia","geneva","grenoble","genoa"],
      pass: ["grenoble","geneva"],
      language: "italian",
      type: "town"
    }
    spaces['nice'] = {
      top: 1733,
      left: 2580,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["genoa","marseille"],
      pass: ["genoa"],
      language: "french",
      type: "town"
    }
    spaces['florence'] = {
      top: 1642,
      left: 2976,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["modena","genoa","siena"],
       language: "italian",
      type: "key"
    }
    spaces['siena'] = {
      top: 1805,
      left: 2988,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["genoa","florence","rome"],
      language: "italian",
      type: "town"
    }
    spaces['bastia'] = {
      top: 1829,
      left: 2784,
      home: "genoa",
      political: "",
      religion: "catholic",
      neighbours: [],
      language: "other",
      type: "town"
    }
    spaces['genoa'] = {
      top: 1626,
      left: 2726,
      home: "genoa",
      political: "",
      religion: "catholic",
      neighbours: ["nice","pavia","turin","modena","siena"],
      pass: ["nice"],
      language: "italian",
      type: "key"
    }
    spaces['rome'] = {
      top: 1924,
      left: 3125,
      home: "papacy",
      political: "",
      religion: "catholic",
      neighbours: ["siena","ancona","cerignola","naples"],
      language: "italian",
      type: "key"
    }
    spaces['ancona'] = {
      top: 1754,
      left: 3238,
      home: "papacy",
      political: "",
      religion: "catholic",
      neighbours: ["ravenna","rome","cerignola"],
      language: "italian",
      type: "town"
    }
    spaces['ravenna'] = {
      top: 1596,
      left: 3130,
      home: "papacy",
      political: "",
      religion: "catholic",
      neighbours: ["venice","modena","ancona"],
      language: "italian",
      type: "key"
    }
    spaces['venice'] = {
      top: 1399,
      left: 3086,
      home: "venice",
      political: "",
      religion: "catholic",
      neighbours: ["trent","modena","ravenna","trieste"],
      language: "italian",
      type: "key"
    }
    spaces['zara'] = {
      top: 1571,
      left: 3374,
      home: "venice",
      political: "",
      religion: "catholic",
      neighbours: ["agram","ragusa","trieste"],
      pass: ["agram"],
      language: "other",
      type: "town"
    }
    spaces['ragusa'] = {
      top: 1750,
      left: 3660,
      home: "independent",
      political: "",
      religion: "catholic",
      neighbours: ["belgrade","zara","scutari"],
      pass: ["belgrade"],
      language: "italian",
      type: "town"
    }


    for (let key in spaces) {
      spaces[key].units = {};
      spaces[key].units['england'] = [];
      spaces[key].units['france'] = [];
      spaces[key].units['hapsburg'] = [];
      spaces[key].units['ottoman'] = [];
      spaces[key].units['papacy'] = [];
      spaces[key].units['protestant'] = [];
      spaces[key].units['venice'] = [];
      spaces[key].units['genoa'] = [];
      spaces[key].units['hungary'] = [];
      spaces[key].units['scotland'] = [];
      spaces[key].units['independent'] = [];
    }

    return spaces;

  }


  returnElectorateDisplay() {

    let electorates = {};

    electorates['augsburg'] = {
      top: 190,
      left: 3380,
    }
    electorates['trier'] = {
      top: 190,
      left: 3510,
    }
    electorates['cologne'] = {
      top: 190,
      left: 3642,
    }
    electorates['wittenberg'] = {
      top: 376,
      left: 3380,
    }
    electorates['mainz'] = {
      top: 376,
      left: 3510,
    }
    electorates['brandenburg'] = {
      top: 376,
      left: 3642,
    }

    return electorates;

  }

  //
  // import space attaches events / functions to spaces if they do not exist
  //
  importSpace(obj, key) {

    obj.key = key;

    if (obj.name == null)               { obj.name = "Unknown"; }
    if (obj.owner == null)              { obj.owner = -1; }          
    if (obj.type == null)               { obj.type = "town"; }     
    if (obj.debaters == null)           { obj.debaters = []; }     
    if (obj.returnView == null)		{ 

      obj.returnView = function () {
	return `
	  <div class="space_view" id="">
	    This is the detailed view of the city or town.
	  </div>
	`;
      };

    }

    return obj;

  }


  returnDeck() {

    var deck = {};

    /// HOME CARDS
    deck['001'] = { 
      img : "cards/HIS-001.svg" , 
      name : "Card" ,
      faction : "ottoman" ,
    }
    deck['002'] = { 
      img : "cards/HIS-002.svg" , 
      name : "Card" ,
      faction : "hapsburg" ,
    }
    deck['003'] = { 
      img : "cards/HIS-003.svg" , 
      name : "Card" ,
      faction : "england" ,
    }
    deck['004'] = { 
      img : "cards/HIS-004.svg" , 
      name : "Card" ,
      faction : "french" ,
    }
    if (this.game.players.length == 2) {
      deck['005'] = { 
        img : "cards/HIS-005.svg" , 
        name : "Card" ,
        faction : "papacy" ,
      }
    } else {
      deck['005'] = { 
        img : "cards/HIS-005-2P.svg" , 
        name : "Card" ,
        faction : "papacy" ,
      }
    }
    deck['006'] = { 
      img : "cards/HIS-006.svg" , 
      name : "Card" ,
      faction : "papacy" ,
    }
    deck['007'] = { 
      img : "cards/HIS-007.svg" , 
      name : "Card" ,
      faction : "protestant" ,
    }
    // 95 Theses
    deck['008'] = { 
      img : "cards/HIS-008.svg" , 
      name : "Card" ,
      onEvent : function(game_mod, player) {

	// protestant gets 2 roll bonus at start
	game_mod.game.state.tmp_protestant_reformation_bonus = 2;
	game_mod.game.state.tmp_catholic_reformation_bonus = 0;

	game_mod.game.queue.push("protestant_reformation\t"+player);
	game_mod.game.queue.push("protestant_reformation\t"+player);
	game_mod.game.queue.push("protestant_reformation\t"+player);
	game_mod.game.queue.push("protestant_reformation\t"+player);
	game_mod.game.queue.push("protestant_reformation\t"+player);
	game_mod.game.queue.push("protestant_reformation\t"+player);
        game_mod.game.queue.push("ACKNOWLEDGE\tThe Reformation.!");
        game_mod.convertSpace("protestant", "wittenberg");
        game_mod.addUnit("protestant", "wittenberg", "regular");
        game_mod.addUnit("protestant", "wittenberg", "regular");
        game_mod.displaySpace("wittenberg");

	return 1;
      },
      handleGameLoop : function(game_mod, qe, mv) {

        if (mv[0] == "protestant_reformation") {

          let player = parseInt(mv[1]);
console.log("player is: " + player + " -- i am " + game_mod.game.player);

          game_mod.game.queue.splice(qe, 1);

	  if (game_mod.game.player == player) {
            game_mod.playerSelectSpaceWithFilter(

	      "Select Reformation Attempt",

	      //
	      // catholic spaces adjacent to protestant 
	      //
	      function(space) {
		if (
		  space.religion === "catholic" &&
		  game_mod.isSpaceAdjacentToReligion(space, "protestant")
	        ) {
		  return 1;
	        }
		return 0;
	      },

	      //
	      // launch reformation
	      //
	      function(spacekey) {
		game_mod.addMove("reformation\t"+spacekey);
		game_mod.endTurn();
	      },

	      null

	    );
	  }

          return 0;

        }

	return 1;
      }
    }
    deck['009'] = { 
      img : "cards/HIS-009.svg" , 
      name : "Card" ,
    }
    deck['010'] = { 
      img : "cards/HIS-010.svg" , 
      name : "Card" ,
    }
    deck['011'] = { 
      img : "cards/HIS-011.svg" , 
      name : "Card" ,
    }
    deck['012'] = { 
      img : "cards/HIS-012.svg" , 
      name : "Card" ,
    }
    deck['013'] = { 
      img : "cards/HIS-013.svg" , 
      name : "Card" ,
    }
    deck['014'] = { 
      img : "cards/HIS-014.svg" , 
      name : "Card" ,
    }
    deck['015'] = { 
      img : "cards/HIS-015.svg" , 
      name : "Card" ,
    }
    deck['016'] = { 
      img : "cards/HIS-016.svg" , 
      name : "Card" ,
    }
    deck['017'] = { 
      img : "cards/HIS-017.svg" , 
      name : "Card" ,
    }
    deck['018'] = { 
      img : "cards/HIS-018.svg" , 
      name : "Card" ,
    }
    deck['019'] = { 
      img : "cards/HIS-019.svg" , 
      name : "Card" ,
    }
    deck['020'] = { 
      img : "cards/HIS-020.svg" , 
      name : "Card" ,
    }
    deck['021'] = { 
      img : "cards/HIS-021.svg" , 
      name : "Card" ,
    }
    deck['022'] = { 
      img : "cards/HIS-022.svg" , 
      name : "Card" ,
    }
    deck['023'] = { 
      img : "cards/HIS-023.svg" , 
      name : "Card" ,
    }
    deck['024'] = { 
      img : "cards/HIS-024.svg" , 
      name : "Card" ,
    }
    deck['025'] = { 
      img : "cards/HIS-025.svg" , 
      name : "Card" ,
    }
    deck['026'] = { 
      img : "cards/HIS-026.svg" , 
      name : "Card" ,
    }
    deck['027'] = { 
      img : "cards/HIS-027.svg" , 
      name : "Card" ,
    }
    deck['028'] = { 
      img : "cards/HIS-028.svg" , 
      name : "Card" ,
    }
    deck['029'] = { 
      img : "cards/HIS-029.svg" , 
      name : "Card" ,
    }
    deck['030'] = { 
      img : "cards/HIS-030.svg" , 
      name : "Card" ,
    }
    deck['031'] = { 
      img : "cards/HIS-031.svg" , 
      name : "Card" ,
    }
    deck['032'] = { 
      img : "cards/HIS-032.svg" , 
      name : "Card" ,
    }
    deck['033'] = { 
      img : "cards/HIS-033.svg" , 
      name : "Card" ,
    }
    deck['034'] = { 
      img : "cards/HIS-034.svg" , 
      name : "Card" ,
    }
    deck['035'] = { 
      img : "cards/HIS-035.svg" , 
      name : "Card" ,
    }
    deck['036'] = { 
      img : "cards/HIS-036.svg" , 
      name : "Card" ,
    }
    deck['037'] = { 
      img : "cards/HIS-037.svg" , 
      name : "Card" ,
    }
    deck['038'] = { 
      img : "cards/HIS-038.svg" , 
      name : "Card" ,
    }
    deck['039'] = { 
      img : "cards/HIS-039.svg" , 
      name : "Card" ,
    }
    deck['040'] = { 
      img : "cards/HIS-040.svg" , 
      name : "Card" ,
    }
    deck['041'] = { 
      img : "cards/HIS-041.svg" , 
      name : "Card" ,
    }
    deck['042'] = { 
      img : "cards/HIS-042.svg" , 
      name : "Card" ,
    }
    deck['043'] = { 
      img : "cards/HIS-043.svg" , 
      name : "Card" ,
    }
    deck['044'] = { 
      img : "cards/HIS-044.svg" , 
      name : "Card" ,
    }
    deck['045'] = { 
      img : "cards/HIS-045.svg" , 
      name : "Card" ,
    }
    deck['046'] = { 
      img : "cards/HIS-046.svg" , 
      name : "Card" ,
    }
    deck['047'] = { 
      img : "cards/HIS-047.svg" , 
      name : "Card" ,
    }
    deck['048'] = { 
      img : "cards/HIS-048.svg" , 
      name : "Card" ,
    }
    deck['049'] = { 
      img : "cards/HIS-049.svg" , 
      name : "Card" ,
    }
    deck['050'] = { 
      img : "cards/HIS-050.svg" , 
      name : "Card" ,
    }
    deck['051'] = { 
      img : "cards/HIS-051.svg" , 
      name : "Card" ,
    }
    deck['052'] = { 
      img : "cards/HIS-052.svg" , 
      name : "Card" ,
    }
    deck['053'] = { 
      img : "cards/HIS-053.svg" , 
      name : "Card" ,
    }
    deck['054'] = { 
      img : "cards/HIS-054.svg" , 
      name : "Card" ,
    }
    deck['055'] = { 
      img : "cards/HIS-055.svg" , 
      name : "Card" ,
    }
    deck['056'] = { 
      img : "cards/HIS-056.svg" , 
      name : "Card" ,
    }
    deck['057'] = { 
      img : "cards/HIS-057.svg" , 
      name : "Card" ,
    }
    deck['058'] = { 
      img : "cards/HIS-058.svg" , 
      name : "Card" ,
    }
    deck['059'] = { 
      img : "cards/HIS-059.svg" , 
      name : "Card" ,
    }
    deck['060'] = { 
      img : "cards/HIS-060.svg" , 
      name : "Card" ,
    }
    deck['061'] = { 
      img : "cards/HIS-061.svg" , 
      name : "Card" ,
    }
    deck['062'] = { 
      img : "cards/HIS-062.svg" , 
      name : "Card" ,
    }
    deck['063'] = { 
      img : "cards/HIS-063.svg" , 
      name : "Card" ,
    }
    deck['064'] = { 
      img : "cards/HIS-064.svg" , 
      name : "Card" ,
    }
    deck['065'] = { 
      img : "cards/HIS-065.svg" , 
      name : "Card" ,
    }
    deck['066'] = { 
      img : "cards/HIS-066.svg" , 
      name : "Card" ,
    }
    deck['067'] = { 
      img : "cards/HIS-067.svg" , 
      name : "Card" ,
    }
    deck['068'] = { 
      img : "cards/HIS-068.svg" , 
      name : "Card" ,
    }
    deck['069'] = { 
      img : "cards/HIS-069.svg" , 
      name : "Card" ,
    }
    deck['070'] = { 
      img : "cards/HIS-070.svg" , 
      name : "Card" ,
    }
    deck['071'] = { 
      img : "cards/HIS-071.svg" , 
      name : "Card" ,
    }
    deck['072'] = { 
      img : "cards/HIS-072.svg" , 
      name : "Card" ,
    }
    deck['073'] = { 
      img : "cards/HIS-073.svg" , 
      name : "Card" ,
    }
    deck['074'] = { 
      img : "cards/HIS-074.svg" , 
      name : "Card" ,
    }
    deck['075'] = { 
      img : "cards/HIS-075.svg" , 
      name : "Card" ,
    }
    deck['076'] = { 
      img : "cards/HIS-076.svg" , 
      name : "Card" ,
    }
    deck['077'] = { 
      img : "cards/HIS-077.svg" , 
      name : "Card" ,
    }
    deck['078'] = { 
      img : "cards/HIS-078.svg" , 
      name : "Card" ,
    }
    deck['079'] = { 
      img : "cards/HIS-079.svg" , 
      name : "Card" ,
    }
    deck['080'] = { 
      img : "cards/HIS-080.svg" , 
      name : "Card" ,
    }
    deck['081'] = { 
      img : "cards/HIS-081.svg" , 
      name : "Card" ,
    }
    deck['082'] = { 
      img : "cards/HIS-082.svg" , 
      name : "Card" ,
    }
    deck['083'] = { 
      img : "cards/HIS-083.svg" , 
      name : "Card" ,
    }
    deck['084'] = { 
      img : "cards/HIS-084.svg" , 
      name : "Card" ,
    }
    deck['085'] = { 
      img : "cards/HIS-085.svg" , 
      name : "Card" ,
    }
    deck['086'] = { 
      img : "cards/HIS-086.svg" , 
      name : "Card" ,
    }
    deck['087'] = { 
      img : "cards/HIS-087.svg" , 
      name : "Card" ,
    }
    deck['088'] = { 
      img : "cards/HIS-088.svg" , 
      name : "Card" ,
    }
    deck['089'] = { 
      img : "cards/HIS-089.svg" , 
      name : "Card" ,
    }
    deck['090'] = { 
      img : "cards/HIS-090.svg" , 
      name : "Card" ,
    }
    deck['091'] = { 
      img : "cards/HIS-091.svg" , 
      name : "Card" ,
    }
    deck['092'] = { 
      img : "cards/HIS-092.svg" , 
      name : "Card" ,
    }
    deck['093'] = { 
      img : "cards/HIS-093.svg" , 
      name : "Card" ,
    }
    deck['094'] = { 
      img : "cards/HIS-094.svg" , 
      name : "Card" ,
    }
    deck['095'] = { 
      img : "cards/HIS-095.svg" , 
      name : "Card" ,
    }
    deck['096'] = { 
      img : "cards/HIS-096.svg" , 
      name : "Card" ,
    }
    deck['097'] = { 
      img : "cards/HIS-097.svg" , 
      name : "Card" ,
    }
    deck['098'] = { 
      img : "cards/HIS-098.svg" , 
      name : "Card" ,
    }
    deck['099'] = { 
      img : "cards/HIS-099.svg" , 
      name : "Card" ,
    }
    deck['100'] = { 
      img : "cards/HIS-100.svg" , 
      name : "Card" ,
    }
    deck['101'] = { 
      img : "cards/HIS-101.svg" , 
      name : "Card" ,
    }
    deck['102'] = { 
      img : "cards/HIS-102.svg" , 
      name : "Card" ,
    }
    deck['103'] = { 
      img : "cards/HIS-103.svg" , 
      name : "Card" ,
    }
    deck['104'] = { 
      img : "cards/HIS-104.svg" , 
      name : "Card" ,
    }
    deck['105'] = { 
      img : "cards/HIS-105.svg" , 
      name : "Card" ,
    }
    deck['106'] = { 
      img : "cards/HIS-106.svg" , 
      name : "Card" ,
    }
    deck['107'] = { 
      img : "cards/HIS-107.svg" , 
      name : "Card" ,
    }
    deck['108'] = { 
      img : "cards/HIS-108.svg" , 
      name : "Card" ,
    }
    deck['109'] = { 
      img : "cards/HIS-109.svg" , 
      name : "Card" ,
    }
    deck['110'] = { 
      img : "cards/HIS-110.svg" , 
      name : "Card" ,
    }
    deck['111'] = { 
      img : "cards/HIS-111.svg" , 
      name : "Card" ,
    }
    deck['112'] = { 
      img : "cards/HIS-112.svg" , 
      name : "Card" ,
    }
    deck['113'] = { 
      img : "cards/HIS-113.svg" , 
      name : "Card" ,
    }
    deck['114'] = { 
      img : "cards/HIS-114.svg" , 
      name : "Card" ,
    }
    deck['115'] = { 
      img : "cards/HIS-115.svg" , 
      name : "Card" ,
    }
    deck['116'] = { 
      img : "cards/HIS-116.svg" , 
      name : "Card" ,
    }
    deck['201'] = { 
      img : "cards/HIS-201.svg" , 
      name : "Card" ,
    }
    deck['202'] = { 
      img : "cards/HIS-202.svg" , 
      name : "Card" ,
    }
    deck['203'] = { 
      img : "cards/HIS-203.svg" , 
      name : "Card" ,
    }
    deck['204'] = { 
      img : "cards/HIS-204.svg" , 
      name : "Card" ,
    }
    deck['205'] = { 
      img : "cards/HIS-205.svg" , 
      name : "Card" ,
    }
    deck['206'] = { 
      img : "cards/HIS-206.svg" , 
      name : "Card" ,
    }
    deck['207'] = { 
      img : "cards/HIS-207.svg" , 
      name : "Card" ,
    }
    deck['208'] = { 
      img : "cards/HIS-208.svg" , 
      name : "Card" ,
    }
    deck['209'] = { 
      img : "cards/HIS-209.svg" , 
      name : "Card" ,
    }
    deck['210'] = { 
      img : "cards/HIS-210.svg" , 
      name : "Card" ,
    }
    deck['211'] = { 
      img : "cards/HIS-211.svg" , 
      name : "Card" ,
    }
    deck['212'] = { 
      img : "cards/HIS-212.svg" , 
      name : "Card" ,
    }
    deck['213'] = { 
      img : "cards/HIS-213.svg" , 
      name : "Card" ,
    }
    deck['214'] = { 
      img : "cards/HIS-214.svg" , 
      name : "Card" ,
    }
    deck['215'] = { 
      img : "cards/HIS-215.svg" , 
      name : "Card" ,
    }
    deck['216'] = { 
      img : "cards/HIS-216.svg" , 
      name : "Card" ,
    }
    deck['217'] = { 
      img : "cards/HIS-217.svg" , 
      name : "Card" ,
    }
    deck['218'] = { 
      img : "cards/HIS-218.svg" , 
      name : "Card" ,
    }
    deck['219'] = { 
      img : "cards/HIS-219.svg" , 
      name : "Card" ,
    }

    for (let key in deck) {
      deck[key] = this.addEvents(deck[key]);
    }

    return deck;

  }




  returnEventObjects() {

    let z = [];

    //
    // factions in-play
    //
    for (let i = 0; i < this.game.players_info.length; i++) {
      if (this.factions[this.game.players_info[i].faction] != undefined) {
        z.push(this.factions[this.game.players_info[i].faction]);
      }
    }


    //
    // cards in the deck can modify gameloop
    //
    for (let key in this.deck) {
      z.push(this.deck[key]);
    }

    return z;

  }



  addEvents(obj) {

    ///////////////////////
    // game state events //
    ///////////////////////
    //
    // these events run at various points of the game. They are attached to objs
    // on object initialization, so that the objects can have these events 
    // triggered at various points of the game automatically.
    //
    //
    // 
    // 1 = fall through, 0 = halt game
    //
    if (obj.onEvent == null) {
      obj.onEvent = function(his_self, player) { return 1; }
    }
    if (obj.handleGameLoop == null) {
      obj.handleGameLoop = function(his_self, qe, mv) { return 1; }
    }
    //
    // synchronous -- must return 1
    //
    if (obj.postProduction == null) {
      obj.postProduction = function(imperium_self, player, sector) { return 1; }
    }
  
    return obj;

  }




  //
  // Core Game Logic
  //
  handleGameLoop() {

    let his_self = this;

    ///////////
    // QUEUE //
    ///////////
    if (this.game.queue.length > 0) {

        let qe = this.game.queue.length-1;
        let mv = this.game.queue[qe].split("\t");
	let z = this.returnEventObjects();
        let shd_continue = 1;

console.log("MOVE: " + mv[0]);

        //
        // round
        // init
	//
        if (mv[0] == "init") {
	  this.updateLog("init game");
          this.game.queue.splice(qe, 1);
        }

        if (mv[0] === "round") {

	  this.game.state.round++;

	  this.game.queue.push("victory_determination_phase");
	  this.game.queue.push("new_world_phase");
	  this.game.queue.push("winter_phase");
	  this.game.queue.push("action_phase");
	  this.game.queue.push("spring_deployment_phase");
	  this.game.queue.push("diplomacy_phase");
	  this.game.queue.push("card_draw_phase");
	  this.game.queue.push("ACKNOWLEDGE\tFACTION: "+JSON.stringify(this.returnPlayerFactions(this.game.player)));


	  //
	  // start the game with the Protestant Reformation
	  //
//	  if (this.game.state.round == 1) {
//	    this.updateLog("Luther's 95 Theses!");
//	    this.game.queue.push("event\t1\t008");
//	  }

	  if (this.game.state.round > 1) {
	    this.updateStatus("Game Over");
	    return 0;
	  }
          return 1;
        }


	if (mv[0] === "build") {

	  let land_or_sea = mv[1];
	  let faction = mv[2];
	  let unit_type = mv[3];
	  let spacekey = mv[4];

	  if (land_or_sea === "land") {
	    this.game.spaces[spacekey].units[faction].push(this.newUnit(faction, unit_type));
	  }
	  if (land_or_sea === "sea") {
	    this.game.navalspaces[spacekey].units[faction].push(this.newUnit(faction, unit_type));
	  }

	  this.game.queue.splice(qe, 1);
	  return 1;

	}

        if (mv[0] === "event") {

	  let player = mv[1];
	  let card = mv[2];

	  this.game.queue.splice(qe, 1);

	  if (!this.deck[card].onEvent(this, player)) { return 0; }

	  return 1;
	}

        if (mv[0] === "move") {

	  let player = mv[1];
	  let movetype = mv[1];
	  let source = mv[1];
	  let destination = mv[1];
	  let unitidx = mv[1];

          this.spaces[destination].units[player-1].push(this.spaces[source].units[player-1][unitidx].splice(unitidx, 1));
	  this.updateLog("Player "+player+" moves unit from " + source + " to " + destination);

	  this.displaySpace(source);
	  this.displaySpace(destination);

	  this.game.queue.splice(qe, 1);
          return 1;
	}

        if (mv[0] === "victory_determination_phase") {
	  this.game.queue.splice(qe, 1);
          return 1;
        }
        if (mv[0] === "new_world_phase") {
	  this.game.queue.splice(qe, 1);
          return 1;
        }
        if (mv[0] === "winter_phase") {
	  this.game.queue.splice(qe, 1);
          return 1;
        }
        if (mv[0] === "action_phase") {

	  this.game.queue.splice(qe, 1);

	  let io = this.returnImpulseOrder();
	  // added in reverse order as last added goes first
	  for (let i = io.length-1; i>= 0; i--) {
	    this.game.queue.push("play\t"+io[i]);
	  }
          return 1;
        }
        if (mv[0] === "spring_deployment_phase") {
	  this.game.queue.splice(qe, 1);
          return 1;
        }
        if (mv[0] === "diplomacy_phase") {

console.log("just in diplomacy phase!");
console.log("cards in hand: " + JSON.stringify(this.game.deck[0].fhand));

	  this.game.queue.splice(qe, 1);
          return 1;
        }
        if (mv[0] === "card_draw_phase") {

	  //
	  // generate new deck
	  //
	  for (let i = this.game.players_info.length-1; i >= 0; i--) {
	    for (let z = 0; z < this.game.players_info[i].factions.length; z++) {
              let cardnum = this.factions[this.game.players_info[i].factions[z]].returnCardsDealt(this);
    	      this.game.queue.push("hand_to_fhand\t1\t"+(i+1)+"\t"+this.game.players_info[i].factions[z]);
    	      this.game.queue.push("add_home_card\t"+(i+1)+"\t"+this.game.players_info[i].factions[z]);
    	      this.game.queue.push("DEAL\t1\t"+(i+1)+"\t"+(cardnum));
	    }
	  }
	  for (let i = this.game.players_info.length; i > 0; i--) {
    	    this.game.queue.push("DECKENCRYPT\t1\t"+(i));
	  }
	  for (let i = this.game.players_info.length; i > 0; i--) {
    	    this.game.queue.push("DECKXOR\t1\t"+(i));
	  }

	  let deck_to_deal = this.returnDeck()
	  delete deck_to_deal['001'];
	  delete deck_to_deal['002'];
	  delete deck_to_deal['003'];
	  delete deck_to_deal['004'];
	  delete deck_to_deal['005'];
	  delete deck_to_deal['006'];
	  delete deck_to_deal['007'];
	  delete deck_to_deal['008'];

    	  this.game.queue.push("restore_home_cards_to_deck");
    	  this.game.queue.push("DECK\t1\t"+JSON.stringify(deck_to_deal));

	  this.game.queue.splice(qe, 1);
          return 1;

        }

        if (mv[0] === "restore_home_cards_to_deck") {
	  let d = this.returnDeck();
	  this.game.deck[0].cards['001'] = d['001'];
	  this.game.deck[0].cards['002'] = d['002'];
	  this.game.deck[0].cards['003'] = d['003'];
	  this.game.deck[0].cards['004'] = d['004'];
	  this.game.deck[0].cards['005'] = d['005'];
	  this.game.deck[0].cards['006'] = d['006'];
	  this.game.deck[0].cards['007'] = d['007'];
	  this.game.deck[0].cards['008'] = d['008'];
	  this.game.queue.splice(qe, 1);
          return 1;
	}

        if (mv[0] === "play") {

	  let faction = mv[1];
	  let player = this.returnPlayerOfFaction(faction);
          this.displayBoard();

	  // skip factions not-in-play
	  if (player == -1) { 
	    this.game.queue.splice(qe, 1);
	    return 1;
	  }

	  if (this.game.player == player) {
	    this.playerTurn(faction);
	  } else {
	    this.updateStatusAndListCards("Opponent Turn:", this.game.deck[0].fhand[0]);
	  }

	  this.game.queue.splice(qe, 1);
          return 0;
        }
	if (mv[0] === "continue") {

	  let player = mv[1];
	  let card = mv[2];
	  let ops = mv[3];

	  if (this.game.player == player) {
            this.playerPlayOps(card, ops);
	  }

	  this.game.queue.splice(qe, 1);
	  let player_turn = -1;

	  for (let i = 0; i < this.game.players_info.length; i++) {
	    if (this.game.players_info.factions.includes(faction)) {
	      player_turn = i+1;
	    }
	  }

          this.displayBoard();

	  // no-one controls this faction, so skip
	  if (player_turn === -1) { return 1; }

	  // let the player who controls play turn
	  if (this.game.player === player_turn) {
            this.playerTurn(faction);
	  }

          return 0;
        }

	if (mv[0] === "convert") {

	  this.game.queue.splice(qe, 1);

	  let space = mv[1];
	  let religion = mv[2];

	  this.updateLog(this.game.spaces[space].name + " converts to the " + religion + " religion");

	  this.game.spaces[space].religion = religion;
	  this.displaySpace(space);

	  return 1;

	}

	if (mv[0] === "add_home_card") {

	  let player = parseInt(mv[1]);
 	  let faction = mv[2];
 	  let hc = this.returnDeck();

	  if (this.game.player === player) {
	    for (let key in hc) {
	      if (hc[key].faction === faction) {
	        this.game.deck[0].hand.push(key);
	      }
	    }
	  }
	  
	  this.game.queue.splice(qe, 1);
	  return 1;

	}

	if (mv[0] === "hand_to_fhand") {

	  this.game.queue.splice(qe, 1);

	  let deckidx = parseInt(mv[1])-1;
	  let player = parseInt(mv[2]);
	  let faction = mv[3];
	  let fhand_idx = this.returnFactionHandIdx(player, faction);

	  if (this.game.player == player) {

console.log("!!!!!!!!!!!!!!!!!!!!!");
console.log("!!! HAND TO FHAND !!!");
console.log("!!!!!!!!!!!!!!!!!!!!!");
console.log("deckidx: " + deckidx);
console.log(player + " -- " + faction + " -- " + fhand_idx);

	    if (!this.game.deck[deckidx].fhand) { this.game.deck[deckidx].fhand = []; }
	    while (this.game.deck[deckidx].fhand.length < (fhand_idx+1)) { this.game.deck[deckidx].fhand.push([]); }

	    for (let i = 0; i < this.game.deck[deckidx].hand.length; i++) {
	      this.game.deck[deckidx].fhand[fhand_idx].push(this.game.deck[deckidx].hand[i]);
	    }

	    // and clear the hand we have dealt
	    this.game.deck[deckidx].hand = [];
	    this.updateLog("hand entries copied over to fhand");
	  }



console.log(this.game.deck[deckidx]);

	  return 1;

	}

	if (mv[0] === "reformation") {

	  this.game.queue.splice(qe, 1);

	  let space = mv[1];
	  let p_player = mv[2];
	  let c_player = mv[3];

	  let p_rolls = 0;
	  let c_rolls = 0;

	  let p_neighbours = 0;
	  let c_neighbours = 0;

	  let p_bonus = 0;
	  let c_bonus = 0;

	  let p_high = 0;
	  let c_high = 0;

	  let protestants_win = 0;

	  let ties_resolve = "protestant";

	  //
	  // neighbours
	  //
	  for (let i = 0; i < this.spaces[space].neighbours.length; i++) {
	    if (this.spaces[ this.spaces[space].neighbours[i] ].religion === "catholic") {
	      c_neighbours++;
	    }
	    if (this.spaces[ this.spaces[space].neighbours[i] ].religion === "protestant") {
	      p_neighbours++;
	    }  
	  }

	  //
	  // language zone
	  //
	  if (this.spaces[space].language !== "german") {
	    ties_resolve = "catholic";
 	  }

	  //
	  // temporary bonuses
	  //
	  p_bonus += this.game.state.tmp_protestant_reformation_bonus;
	  c_bonus += this.game.state.tmp_catholic_reformation_bonus;

	  //
	  // calculate total rolls
	  //
	  p_rolls += p_neighbours;
	  p_rolls += p_bonus;
	  c_rolls += c_neighbours;
	  c_rolls += c_bonus;

this.updateLog("Total Rolls: ");
this.updateLog("Protestants: " + p_rolls);

	  for (let i = 0; i < p_rolls; i++) {
console.log("i: " + i);
	    let x = this.rollDice(6);
console.log("x is: " + x);
	    this.updateLog("Protestants roll: " + x, 1);
	    if (x > p_high) { p_high = x; }
	  }

this.updateLog("Catholics: " + c_rolls);

	  for (let i = 0; i < c_rolls; i++) {
console.log("i: " + i);
	    let x = this.rollDice(6);
console.log("x is: " + x);
	    this.updateLog("Catholics roll: " + x, 1);
	    if (x > c_high) { c_high = x; }
	  }

	  //
	  // do protestants win?
	  //
	  if (p_high > c_high) { protestants_win = 1; }
	  if (p_high == c_high && ties_resolve === "protestant") { protestants_win = 1; }
	
	  //
	  // handle victory
	  //
	  if (protestants_win == 1) {
	    this.updateLog("Protestants win!");
	    this.game.queue.push("convert\t"+space+"\tprotestant");
	  } else {
	    this.updateLog("Catholics win!");
	  }

	  return 1;

	}





	//
	// objects and cards can add commands
	//
        // we half if we receive a 0/false from one
        for (let i in z) {
          if (!z[i].handleGameLoop(this, qe, mv)) { return 0; }
        }


        //
        // avoid infinite loops
        //
        if (shd_continue == 0) {
          console.log("NOT CONTINUING");
          return 0;
        }

    } // if cards in queue
    return 1;

  }





  returnPlayers(num = 0) {

    var players = [];
    let factions  = JSON.parse(JSON.stringify(this.factions));
    let factions2 = JSON.parse(JSON.stringify(this.factions));

    // < 6 player games
    if (num == 2) {
      for (let key in factions) {
	if (key !== "protestant" && key !== "papacy") {
	  delete factions[key];
	}
      }
    }

    if (num == 3) {
      for (let key in factions) {
	if (key !== "protestant" && key !== "papacy") {
	  delete factions[key];
	}
      }
    }

    if (num == 3) {
      for (let key in factions) {
	if (key !== "protestant" && key != "france" && key !== "papacy") {
	  delete factions[key];
	}
      }
    }

    if (num == 4) {
      for (let key in factions) {
	if (key !== "protestant" && key != "france" && key != "ottoman" && key !== "papacy") {
	  delete factions[key];
	}
      }
    }

    for (let i = 0; i < num; i++) {

      if (i == 0) { col = "color1"; }
      if (i == 1) { col = "color2"; }
      if (i == 2) { col = "color3"; }
      if (i == 3) { col = "color4"; }
      if (i == 4) { col = "color5"; }
      if (i == 5) { col = "color6"; }

      var keys = Object.keys(factions);
      let rf = keys[this.rollDice(keys.length) - 1];

      if (i == 0) {
        if (this.game.options.player1 != undefined) {
          if (this.game.options.player1 != "random") {
            rf = this.game.options.player1;
          }
        }
      }
      if (i == 1) {
        if (this.game.options.player2 != undefined) {
          if (this.game.options.player2 != "random") {
            rf = this.game.options.player2;
          }
        }
      }
      if (i == 2) {
        if (this.game.options.player3 != undefined) {
          if (this.game.options.player3 != "random") {
            rf = this.game.options.player3;
          }
        }
      }
      if (i == 3) {
        if (this.game.options.player4 != undefined) {
          if (this.game.options.player4 != "random") {
            rf = this.game.options.player4;
          }
        }
      }
      if (i == 4) {
        if (this.game.options.player5 != undefined) {
          if (this.game.options.player5 != "random") {
            rf = this.game.options.player5;
          }
        }
      }
      if (i == 5) {
        if (this.game.options.player6 != undefined) {
          if (this.game.options.player6 != "random") {
            rf = this.game.options.player6;
          }
        }
      }

      delete factions[rf];


      players[i] = {};
      players[i].factions = [];
      players[i].factions.push(rf);

    }


    if (num == 3) {
      for (let i = 0; i < players.length; i++) {
	if (players[i].factions[0] === "protestant") {
	  players[i].factions.push("england");
	}
	if (players[i].factions[0] === "papacy") {
	  players[i].factions.push("hapsburg");
	}
	if (players[i].factions[0] === "france") {
	  players[i].factions.push("ottoman");
	}
      }
    }

    if (num == 4) {
      for (let i = 0; i < players.length; i++) {
	if (players[i].factions[0] === "protestant") {
	  players[i].factions.push("england");
	}
	if (players[i].factions[0] === "papacy") {
	  players[i].factions.push("hapsburg");
	}
      }
    }

    if (num == 5) {
      for (let i = 0; i < players.length; i++) {
	if (players[i].factions[0] === "protestant") {
	  players[i].factions.push("england");
	}
      }
    }

    return players;

  }

  resetPlayerTurn(player_num) {
    this.game.state.tmp_protestant_reformation_bonus = 0;
    this.game.state.tmp_catholic_reformation_bonus = 0;
    this.game.state.tmp_protestant_counter_reformation_bonus = 0;
    this.game.state.tmp_catholic_counter_reformation_bonus = 0;
  }

  returnPlayerFactions(player) {
    return this.game.players_info[player-1].factions;
  }

  returnActionMenuOptions(player=null, faction=null) {

    let menu = [];

    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy','protestant'],
      cost : [1,1,1,1,1,1],
      name : "Move formation in clear",
      check : this.canPlayerMoveFormationInClear,
      fnct : this.playerMoveFormationInClear,
    });
    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy','protestant'],
      cost : [2,2,2,2,2,2],
      name : "Move formation over pass",
      check : this.canPlayerMoveFormationOverPass,
      fnct : this.playerMoveFormationOverPass,
    });
    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy'],
      cost : [1,1,1,1,1],
      name : "Naval move",
      check : this.canPlayerNavalMove,
      fnct : this.playerNavalMove,
    });
    menu.push({
      factions : ['hapsburg','england','france','papacy','protestant'],
      cost : [1,1,1,1,1],
      name : "Buy mercenary",
      check : this.canPlayerBuyMercenary,
      fnct : this.playerBuyMercenary,
    });
    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy','protestant'],
      cost : [2,2,2,2,2,2],
      name : "Raise regular",
      check : this.canPlayerRaiseRegular,
      fnct : this.playerRaiseRegular,
    });
    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy'],
      cost : [2,2,2,2,2],
      name : "Build naval squadron",
      check : this.canPlayerBuildNavalSquadron,
      fnct : this.playerBuildNavalSquadron,
    });
    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy','protestant'],
      cost : [1,1,1,1,1,1],
      name : "Assault",
      check : this.canPlayerAssault,
      fnct : this.playerAssault,
    });
    menu.push({
      factions : ['ottoman','hapsburg','england','france','papacy','protestant'],
      cost : [1,1,1,1,1,1],
      name : "Control unfortified space",
      check : this.canPlayerControlUnfortifiedSpace,
      fnct : this.playerControlUnfortifiedSpace,
    });
    menu.push({
      factions : ['hapsburg','england','france'],
      cost : [2,2,2],
      name : "Explore",
      check : this.canPlayerExplore,
      fnct : this.playerExplore,
    });
    menu.push({
      factions : ['hapsburg','england','france'],
      cost : [2,3,3],
      name : "Colonize",
      check : this.canPlayerColonize,
      fnct : this.playerColonize,
    });
    menu.push({
      factions : ['hapsburg','england','france'],
      cost : [4,4,4],
      name : "Conquer",
      check : this.canPlayerConquer,
      fnct : this.playerConquer,
    });
    menu.push({
      factions : ['ottoman'],
      cost : [2],
      name : "Initiate piracy in a sea",
      check : this.canPlayerInitiatePiracyInASea,
      fnct : this.playerInitiatePiracyInASea,
    });
    menu.push({
      factions : ['ottoman'],
      cost : [1],
      name : "Raise Cavalry",
      check : this.canPlayerRaiseCavalry,
      fnct : this.playerRaiseCavalry,
    });
    menu.push({
      factions : ['ottoman'],
      cost : [1],
      name : "Build corsair",
      check : this.canPlayerBuildCorsair,
      fnct : this.playerBuildCorsair,
    });
    menu.push({
      factions : ['protestant'],
      cost : [1],
      name : "Translate scripture",
      check : this.canPlayerTranslateScripture,
      fnct : this.playerTranslateScripture,
    });
    menu.push({
      factions : ['england','protestant'],
      cost : [1,1,1,1,1,1],
      name : "Publish treatise",
      check : this.canPlayerPublishTreatise,
      fnct : this.playerPublishTreatise,
    });
    menu.push({
      factions : ['papacy','protestant'],
      cost : [3,3],
      name : "Call theological debate",
      check : this.canPlayerCallTheologicalDebate,
      fnct : this.playerCallTheologicalDebate,
    });
    menu.push({
      factions : ['papacy'],
      cost : [1],
      name : "Build Saint Peters",
      check : this.canPlayerBuildSaintPeters,
      fnct : this.playerBuildSaintPeters,
    });
    menu.push({
      factions : ['papacy'],
      cost : [2],
      name : "Burn books",
      check : this.canPlayerBurnBooks,
      fnct : this.playerBurnBooks,
    });
    menu.push({
      factions : ['papacy'],
      cost : [3],
      name : "Found Jesuit University",
      check : this.canPlayerFoundJesuitUniversity,
      fnct : this.playerFoundJesuitUniversity,
    });

    if (player == null) { return menu; }

    let pfactions = this.returnPlayerFactions(player);
    let fmenu = [];

    for (let i = 0; i < menu.length; i++) {
      for (let z = 0; z < pfactions.length; z++) {
        if (menu[i].factions.includes(pfactions[z])) {
          fmenu.push(menu[i]);
	  z = pfactions.length+1;
        }
      }
    }

    return fmenu;

  }





  playerSelectSpaceWithFilter(msg, filter_func, mycallback = null, cancel_func = null) {

    let his_self = this;

    let html = '<div class="message">' + msg + '</div>';

    html += '<ul>';
    for (let key in this.spaces) {
      if (filter_func(this.spaces[key]) == 1) {
        html += '<li class="textchoice" id="' + key + '">' + key + '</li>';
      }
    }
    if (cancel_func != null) {
      html += '<li class="textchoice" id="cancel">cancel</li>';
    }
    html += '</ul>';

    this.updateStatus(html);

    $('.textchoice').off();
    $('.textchoice').on('click', function () {
      let action = $(this).attr("id");
      if (action == "cancel") {
        cancel_func();
        return 0;
      }

      mycallback(action);

    });

  }




  playerTurn(faction, selected_card=null) {

    this.startClock();

    let his_self = this;

    let faction_hand_idx = this.returnFactionHandIdx(this.game.player, faction);

    this.resetPlayerTurn(this.game.player, faction);

    this.updateStatusAndListCards("Select a Card: ", this.game.deck[0].fhand[faction_hand_idx]);
    this.attachCardboxEvents(function(card) {
      this.playerPlayCard(card, this.game.player, faction);
    });  

  }

  playerPlayCard(card, player, faction) {

    let html = `<ul>`;
    html    += `<li class="card" id="ops">play for ops</li>`;
    html    += `<li class="card" id="event">play for event</li>`;
    html    += `</ul>`;

    this.updateStatusWithOptions('Playing card:', html, true);
    this.bindBackButtonFunction(() => {
      this.playerTurn(faction);
    });
    this.attachCardboxEvents(function(user_choice) {
      if (user_choice === "ops") {
        this.playerPlayOps(card, faction);
        return;
      }
      if (user_choice === "event") {
        this.playerPlayEvent(card, faction);
        return;
      }
      return;
    });

  }

  async playerPlayOps(card, faction, ops=null) {

    let menu = this.returnActionMenuOptions(this.game.player);
    let pfactions = this.returnPlayerFactions(this.game.player);

    if (ops == null) { ops = 2; }

    let html = `<ul>`;
    for (let i = 0; i < menu.length; i++) {
console.log(menu[i].name);
      if (menu[i].check(this, this.game.player, faction)) {
        for (let z = 0; z < menu[i].factions.length; z++) {
          if (menu[i].factions[z] === faction) {
	    if (menu[i].cost[z] <= ops) {
              html    += `<li class="card" id="${i}">${menu[i].name} [${menu[i].cost[z]} ops]</li>`;
            }
	    z = menu[i].factions.length+1;
          }
        }
      }
    }
    html    += `<li class="card" id="end_turn">end turn</li>`;
    html    += `</ul>`;

    this.updateStatusWithOptions(`You have ${ops} ops remaining:`, html, false);
    this.attachCardboxEvents(async (user_choice) => {      

      if (user_choice === "end_turn") {
        this.endTurn();
        return;
      }

      for (let z = 0; z < menu[user_choice].factions.length; z++) {
        if (pfactions.includes(menu[user_choice].factions[z])) {
          ops -= menu[user_choice].cost[z];
	  z = menu[user_choice].factions.length+1;
        }
      }

      if (ops > 0) {
	this.addMove("continue\t"+this.game.player+"\t"+card+"\t"+ops);
      }
      menu[user_choice].fnct(this, this.game.player);
      return;

    });
  }
  playerPlayEvent(card, faction, ops=null) {
console.log("playing event");
  }


  playerActionMenu(player) {
    let menu_options = this.returnActionMenuOptions();
  }

  async playerReformationAttempt(player) {
    this.updateStatus("Attempting Reformation Attempt");
    return;
  }
  async playerCounterReformationAttempt(player) {
console.log("1");
return;
  }






  canPlayerMoveFormationInClear(his_self, player, faction) {
    return 1;
  }
  async playerMoveFormationInClear(his_self, player, faction) {

    let units_to_move = [];

    his_self.playerSelectSpaceWithFilter(

      "Select Town from Which to Move Units:",

      // TODO - select only cities where I can move units
      function(space) {
	for (let z in space.units) {
	  if (space.units[z].length > 0 && faction === z) {
	    return 1;
          }
	}
	return 0;
      },

      function(spacekey) {

        let space = his_self.spaces[spacekey];

	let selectDestinationInterface = function(his_self, units_to_move) {  
    	  his_self.playerSelectSpaceWithFilter(

            "Select Destination for these Units",

      	    function(space) {
	      if (space.neighbours.includes(spacekey) && !space.pass.includes(spacekey)) {
	  	return 1;
              }
	      return 0;
            },

      	    function(destination_spacekey) {
	
	      units_to_move.sort();
	      units_to_move.reverse();

	      for (let i = 0; i < units_to_move.length; i++) {
		his_self.addMove("move\t"+faction+"\tland\t"+spacekey+"\t"+destination_spacekey+"\t"+units_to_move[0]);
	      }
	      this.endTurn();

	    },

	    cancel_func,

	  );
	}

	let selectUnitsInterface = function(his_self, units_to_move, selectUnitsInterface, selectDestinationInterface) {

	  let html = "<ul>";
	  for (let i = 0; i < space.units[faction].length; i++) {
	    if (units_to_move.includes(parseInt(i))) {
	      html += `<li class="textchoice" style="font-weight:bold" id="${i}">${space.units[faction][i].name}</li>`;
	    } else {
	      html += `<li class="textchoice" id="${i}">${space.units[faction][i].name}</li>`;
	    }
	  }
	  html += `<li class="textchoice" id="end">finish</li>`;
	  html += "</ul>";

	  his_self.updateStatus(html);

          $('.textchoice').off();
          $('.textchoice').on('click', function () {

            let id = $(this).attr("id");

	    if (id === "end") {
	      selectDestinationInterface(his_self, units_to_move);    
	      return;
	    }

	    if (units_to_move.includes(id)) {
	      let idx = units_to_move.indexOf(id);
	      if (idx > -1) {
  		units_to_move.splice(idx, 1);
	      }
	    } else {
	      units_to_move.push(parseInt(id));
	    }

	    selectUnitsInterface(his_self, units_to_move, selectUnitsInterface, selectDestinationInterface);
	  });
	}
	selectUnitsInterface(his_self, units_to_move, selectUnitsInterface, selectDestinationInterface);
	
      },

      cancel_func,

    );

  }
  canPlayerMoveFormationOverPass(his_self, player, faction) {
    return 1;
  }
  async playerMoveFormationOverPass(his_self, player, faction) {

    let units_to_move = [];

    his_self.playerSelectSpaceWithFilter(

      "Select Town from Which to Move Units:",

      // TODO - select only cities where I can move units
      function(space) {
	for (let z in space.units) {
	  if (space.units[z].length > 0 && z === faction) {
	    if (space.pass) { if (space.pass.length > 0) { return 1; } }
          }
	}
	return 0;
      },

      function(spacekey) {

        let space = his_self.spaces[spacekey];

	let selectDestinationInterface = function(his_self, units_to_move) {  
    	  his_self.playerSelectSpaceWithFilter(

            "Select Destination for these Units",

      	    function(space) {
	      if (space.neighbours.includes(spacekey)) {
		if (space.pass) {
		  if (space.pass.includes(spacekey)) { return 1; }
		}
              }
	      return 0;
            },

      	    function(destination_spacekey) {
	
	      units_to_move.sort();
	      units_to_move.reverse();

	      for (let i = 0; i < units_to_move.length; i++) {
		his_self.addMove("move\t"+faction+"\tland\t"+spacekey+"\t"+destination_spacekey+"\t"+units_to_move[0]);
	      }
	      this.endTurn();

	    },

	    cancel_func,

	  );
	}

	let selectUnitsInterface = function(his_self, units_to_move, selectUnitsInterface, selectDestinationInterface) {

	  let html = "<ul>";
	  for (let i = 0; i < space.units[faction].length; i++) {
	    if (units_to_move.includes(parseInt(i))) {
	      html += `<li class="textchoice" style="font-weight:bold" id="${i}">${space.units[faction][i].name}</li>`;
	    } else {
	      html += `<li class="textchoice" id="${i}">${space.units[faction][i].name}</li>`;
	    }
	  }
	  html += `<li class="textchoice" id="end">finish</li>`;
	  html += "</ul>";

	  his_self.updateStatus(html);

          $('.textchoice').off();
          $('.textchoice').on('click', function () {

            let id = $(this).attr("id");

	    if (id === "end") {
	      selectDestinationInterface(his_self, units_to_move);    
	      return;
	    }

	    if (units_to_move.includes(id)) {
	      let idx = units_to_move.indexOf(id);
	      if (idx > -1) {
  		units_to_move.splice(idx, 1);
	      }
	    } else {
	      units_to_move.push(parseInt(id));
	    }

	    selectUnitsInterface(his_self, units_to_move, selectUnitsInterface, selectDestinationInterface);
	  });
	}
	selectUnitsInterface(his_self, units_to_move, selectUnitsInterface, selectDestinationInterface);
	
      },

      cancel_func,

    );

  }


  canPlayerNavalMove(his_self, player, faction) {
    return 1;
  }
  async playerNavalMove(his_self, player, faction) {
console.log("4");
return;
  }

  canPlayerBuyMercenary(his_self, player, faction) {
    return 1;
  }
  playerBuyMercenary(his_self, player, faction) {

    his_self.playerSelectSpaceWithFilter(

      "Select Destination for Mercenary",

      function(space) {
        if (space.owner === faction) { return 1; }
        if (space.home === faction) { return 1; }
	return 0;
      },

      function(destination_spacekey) {
	his_self.addMove("build\tland\t"+faction+"\t"+"mercenary"+"\t"+destination_spacekey);
	his_self.endTurn();
      },

    );
  }


  canPlayerRaiseRegular(his_self, player, faction) {
    return 1;
  }
  async playerRaiseRegular(his_self, player, faction) {

    his_self.playerSelectSpaceWithFilter(

      "Select Destination for Regular",

      function(space) {
        if (space.owner === faction) { return 1; }
        if (space.home === faction) { return 1; }
	return 1;
      },

      function(destination_spacekey) {
	his_self.addMove("build\tland\t"+faction+"\t"+"regular"+"\t"+destination_spacekey);
	his_self.endTurn();
      },

    );
  }

  canPlayerBuildNavalSquadron(his_self, player, faction) {
    return 1;
  }
  async playerBuildNavalSquadron(his_self, player, faction) {

    his_self.playerSelectSpaceWithFilter(

      "Select Port for Naval Squadron",

      function(space) {
        if (space.owner === faction) { return 1; }
        if (space.home === faction) { return 1; }
	return 0;
      },

      function(destination_spacekey) {
	his_self.addMove("build\tsea\t"+faction+"\t"+"squadron"+"\t"+destination_spacekey);
	his_self.endTurn();
      },

    );
console.log("7");
return;
  }

  canPlayerAssault(his_self, player, faction) {
    return 0;
  }
  async playerAssault(his_self, player, faction) {
console.log("8");
return;
  }
  canPlayerControlUnfortifiedSpace(his_self, player, faction) {
    return 0;
  }
  async playerControlUnfortifiedSpace(his_self, player, faction) {
console.log("9");
return;
  }
  canPlayerExplore(his_self, player, faction) {
    return 0;
  }
  async playerExplore(his_self, player, faction) {
console.log("10");
return;
  }
  canPlayerColonize(his_self, player, faction) {
    return 0;
  }
  async playerColonize(his_self, player, faction) {
console.log("11");
return;
  }
  canPlayerConquer(his_self, player, faction) {
    return 0;
  }
  async playerConquer(his_self, player, faction) {
console.log("12");
return;
  }
  canPlayerInitiatePiracyInASea(his_self, player, faction) {
    return 0;
  }
  async playerInitiatePiracyInASea(his_self, player, faction) {
console.log("13");
return;
  }
  canPlayerRaiseCavalry(his_self, player, faction) {
    return 1;
  }
  async playerRaiseCavalry(his_self, player, faction) {

    his_self.playerSelectSpaceWithFilter(

      "Select Port for Naval Squadron",

      function(space) {
        if (space.owner === faction) { return 1; }
        if (space.home === faction) { return 1; }
	return 0;
      },

      function(destination_spacekey) {
	his_self.addMove("build\tland\t"+faction+"\t"+"cavalry"+"\t"+destination_spacekey);
	his_self.endTurn();
      },

    );
  }
  canPlayerBuildCorsair(his_self, player, faction) {
    return 1;
  }
  async playerBuildCorsair(his_self, player, faction) {

    his_self.playerSelectSpaceWithFilter(

      "Select Port for Corsair",

      function(space) {
        if (space.owner === faction) { return 1; }
        if (space.home === faction) { return 1; }
	return 0;
      },

      function(destination_spacekey) {
	his_self.addMove("build\tsea\t"+faction+"\t"+"corsair"+"\t"+destination_spacekey);
	his_self.endTurn();
      },

    );
  }
  canPlayerTranslateScripture(his_self, player, faction) {
    return 0;
  }
  async playerTranslateScripture(his_self, player, faction) {
console.log("16");
return;
  }
  canPlayerPublishTreatise(his_self, player, faction) {
    return 0;
  }
  async playerPublishTreatise(his_self, player, faction) {
console.log("17");
return;
  }
  canPlayerCallTheologicalDebate(his_self, player, faction) {
    return 0;
  }
  async playerCallTheologicalDebate(his_self, player, faction) {
console.log("18");
return;
  }
  canPlayerBuildSaintPeters(his_self, player, faction) {
    return 0;
  }
  async playerBuildSaintPeters(his_self, player, faction) {
console.log("19");
return;
  }
  canPlayerBurnBooks(his_self, player, faction) {
    return 0;
  }
  async playerBurnBooks(his_self, player, faction) {
console.log("20");
return;
  }
  canPlayerFoundJesuitUniversity(his_self, player, faction) {
    return 0;
  }
  async playerFoundJesuitUniversity(his_self, player, faction) {
console.log("21 jesuit");
return;
  }
  canPlayerPublishTreatise(his_self, player, faction) {
    return 0;
  }
  async playerPublishTreatise(his_self, player, faction) {
console.log("22 treatise");
return;
  }




  importFaction(name, obj) {

    if (obj.id == null)                 { obj.id = "faction"; }
    if (obj.name == null)               { obj.name = "Unknown Faction"; }
    if (obj.img == null)                { obj.img = ""; }
    if (obj.key == null)	        { obj.key = name; }
    if (obj.cards_bonus == null)	{ obj.cards_bonus = 0; }
    if (obj.returnFactionSheet == null) {
      obj.returnFactionSheet = function(faction) {
        return `
	  <div class="faction_sheet" id="faction_sheet" style="background-image: url('/his/img/factions/${obj.img}')">
	  </div>
	`;
      }
    }
    if (obj.returnCardsDealt == null) {
      obj.returnCardsDealt = function(faction) {
	return 1;
      }
    }

    obj = this.addEvents(obj);
    this.factions[obj.key] = obj;

  }

  returnPlayerOfFaction(faction) {
    for (let i = 0; i < this.game.players_info.length; i++) {
      if (this.game.players_info[i].factions.includes(faction)) {
	return i+1;
      }
    }
    return -1;
  }


  returnFactionHandIdx(player, faction) {
console.log("player: " + player);
console.log("faction: " + faction);
    for (let i = 0; i < this.game.players_info[player-1].factions.length; i++) {
      if (this.game.players_info[player-1].factions[i] === faction) {
	return i;
      }
    }
    return -1;
  }





  importUnit(name, obj) {

    if (obj.type == null)               { obj.type = "unit"; }
    if (obj.name == null)               { obj.name = "Unit"; }
    if (obj.personage == null)          { obj.personage = false; }
    if (obj.debater == null)            { obj.debater = false; }
    if (obj.army_leader == null)        { obj.army_leader = false; }
    if (obj.navy_leader == null)        { obj.navy_leader = false; }
    if (obj.command_value == null)      { obj.command_value = 0; }
    if (obj.battle_rating == null)      { obj.battle_rating = 0; }
    if (obj.img == null)                { obj.img = ""; }

    //obj = this.addEvents(obj);
    this.units[name] = obj;

  }

  newUnit(faction, type) {
    for (let key in this.units) {
      if (this.units[key].type === type) {
	let new_unit = JSON.parse(JSON.stringify(this.units[key]));
	new_unit.owner = faction;
	return new_unit;
      }
    }
    return null;
  }

  newDebater(faction, debater) {
    for (let key in this.units) {
      if (this.units[key].type === debater) {
	let new_unit = JSON.parse(JSON.stringify(this.units[key]));
	new_unit.owner = faction;
	return new_unit;
      }
    }
    return null;
  }
  newPersonage(faction, personage) {
    for (let key in this.units) {
      if (this.units[key].type === personage) {
	let new_unit = JSON.parse(JSON.stringify(this.units[key]));
	new_unit.owner = faction;
	return new_unit;
      }
    }
    return null;
  }


  displayFactionSheet(faction) {

    this.overlay.showOverlay(this.app, this, this.factions[faction].returnFactionSheet(faction));
    let controlled_keys = 0;
    
    for (let key in this.spaces) {
      if (this.spaces[key].type === "key") {
        if (this.spaces[key].political === this.factions[faction].key || (this.spaces[key].political === "" && this.spaces[key].home === this.factions[faction].key)) {
          controlled_keys++;
	}
      }
    }
    let keyboxen = '';
 
    // ENGLAND
    if (this.factions[faction].key === "england") {
      let total_keys = 9;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = this.factions[faction].marital_status; i < 7; i++) {
          keyboxen += `<div class="faction_sheet_keytile england_marital_status${i+1}" id="england_marital_status_keytile${i+1}"></div>`;
      }
      for (let i = 1; i <= 9; i++) {
        if (i > (9-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // FRANCE
    if (this.factions[faction].key === "france") {
      let total_keys = 11;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i < 7; i++) {
          keyboxen += `<div class="faction_sheet_keytile france_chateaux_status${i+1}" id="france_chateaux_status_keytile${i+1}"></div>`;
      }
      for (let i = 1; i <= 11; i++) {
        if (i > (11-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // OTTOMAN
    if (this.factions[faction].key === "ottoman") {
      let total_keys = 11;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i <= 10; i++) {
          keyboxen += `<div class="faction_sheet_keytile ottoman_piracy_status${i}" id="ottoman_piracy_status_keytile${i}"></div>`;
      }
      for (let i = 1; i <= 11; i++) {
        if (i > (11-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // PAPACY
    if (this.factions[faction].key === "papacy") {
      let total_keys = 7;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i < 12; i++) {
          keyboxen += `<div class="faction_sheet_keytile papacy_construction_status${i+1}" id="papacy_construction_status_keytile${i+1}"></div>`;
      }
      for (let i = 1; i <= 7; i++) {
        if (i >= (7-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // PROTESTANTS
    if (this.factions[faction].key === "protestant") {
      let total_keys = 11;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i <= 6; i++) {
          keyboxen += `<div class="faction_sheet_keytile protestant_translation_status${i}" id="protestant_translation_status_keytile${i}"></div>`;
      }
      for (let i = 1; i <= 11; i++) {
        if (i > (11-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // HAPSBURG
    if (this.factions[faction].key === "hapsburg") {
      let total_keys = 14;
      let remaining_keys = total_keys - controlled_keys;
console.log("remaining keys for hapsburgs: " +remaining_keys + " ------ " + controlled_keys);
      for (let i = 1; i <= 14; i++) {
        if (i > (14-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    document.getElementById("faction_sheet").innerHTML = keyboxen;
  }

  returnFactionSheetKeys() {
    
  }

  displayBoard() {
    try {
      this.displayColony();
      this.displayConquest();
      this.displayElectorateDisplay();
      this.displayNewWorld();
      this.displaySpaces();
      this.displayNavalSpaces();
      this.displayVictoryTrack();
    } catch (err) {
      console.log("error displaying board... " + err);
    }
  }

  displayColony() {
  }

  displayConquest() {
  }

  displayNewWorld() {
  }

  displaySpaceDetailedView(name) {
    let html = this.spaces[name].returnView();    
    this.overlay.show(this.app, this, html);
  }

  displayElectorateDisplay() {
    let elecs = this.returnElectorateDisplay();
    for (let key in elecs) {
      let obj = document.getElementById(`ed_${key}`);
      let tile = this.returnSpaceTile(this.spaces[key]);
      obj.innerHTML = ` <img class="hextile" src="${tile}" />`;      
    }
  }


  returnSpaceTile(space) {

    let owner = space.political;
    if (owner == "") { owner = space.home; }
    let tile = "";
    let stype = "hex";

    if (space.type == "town") { stype = "hex"; }
    if (space.type == "key") { stype = "key"; }

    if (owner != "") {
      if (owner === "hapsburg") {
        tile = "/his/img/tiles/hapsburg/";	  
        if (space.religion === "protestant") {
          tile += `Hapsburg_${stype}_back.svg`;
        } else {
          tile += `Hapsburg_${stype}.svg`;
        }
      }
      if (owner === "england") {
        tile = "/his/img/tiles/england/";	  
        if (space.religion === "protestant") {
          tile += `England_${stype}_back.svg`;
        } else {
          tile += `England_${stype}.svg`;
        }
      }
      if (owner === "france") {
        tile = "/his/img/tiles/france/";	  
        if (space.religion === "protestant") {
          tile += `France_${stype}_back.svg`;
        } else {
          tile += `France_${stype}.svg`;
        }
      }
      if (owner === "papacy") {
        tile = "/his/img/tiles/papacy/";	  
        if (space.religion === "protestant") {
          tile += `Papacy_${stype}_back.svg`;
	} else {
	  tile += `Papacy_${stype}.svg`;
	}
      }
      if (owner === "protestant") {
        tile = "/his/img/tiles/protestant/";	  
        if (space.religion === "protestant") {
          tile += `Protestant_${stype}_back.svg`;
        } else {
          tile += `Protestant_${stype}.svg`;
        }
      }
      if (owner === "ottoman") {
        tile = "/his/img/tiles/ottoman/";	  
        if (space.religion === "protestant") {
          tile += `Ottoman_${stype}_back.svg`;
        } else {
          tile += `Ottoman_${stype}.svg`;
        }
      }
      if (owner === "independent") {
        tile = "/his/img/tiles/independent/";	  
        if (space.religion === "protestant") {
          tile += `Independent_${stype}_back.svg`;
        } else {
          tile += `Independent_${stype}.svg`;
        }
      }
      if (owner === "hungary") {
        tile = "/his/img/tiles/independent/";	  
        if (space.religion === "protestant") {
          tile += `Independent_${stype}_back.svg`;
        } else {
          tile += `Independent_${stype}.svg`;
        }
      }
      if (owner === "scotland") {
        tile = "/his/img/tiles/independent/";	  
        if (space.religion === "protestant") {
          tile += `Independent_${stype}_back.svg`;
        } else {
          tile += `Independent_${stype}.svg`;
        }
      }
      if (owner === "venice") {
        tile = "/his/img/tiles/independent/";	  
        if (space.religion === "protestant") {
          tile += `Independent_${stype}_back.svg`;
        } else {
          tile += `Independent_${stype}.svg`;
        }
      }
      if (owner === "genoa") {
        tile = "/his/img/tiles/independent/";	  
        if (space.religion === "protestant") {
          tile += `Independent_${stype}_back.svg`;
        } else {
          tile += `Independent_${stype}.svg`;
        }
      }
    }

    return tile;

  }

  returnNavies(space) {

    let html = '<div class="space_navy" id="">';
    let tile = "";

    for (let z in space.units) {

      let squadrons = 0;
      let corsairs = 0;

      for (let zz = 0; zz < space.units[z].length; zz++) {
	if (space.units[z][zz].type === "squadron") {
	  squadrons += 2;
	}
	if (space.units[z][zz].type === "corsair") {
	  corsairs += 1;
	}
      }

      while (squadrons >= 2) {
        if (z === "hapsburg") {
          tile = "/his/img/tiles/hapsburg/";	  
	  if (squadrons >= 2) {
            tile += `Hapsburg_squadron.svg`;
	    squadrons -= 2;
	  }
        }
        if (z === "england") {
          tile = "/his/img/tiles/england/";	  
	  if (squadrons >= 2) {
            tile += `England_squadron.svg`;
	    squadrons -= 2;
          }
        }
        if (z === "france") {
          tile = "/his/img/tiles/france/";	  
	  if (squadrons >= 2) {
            tile += `French_squadron.svg`;
	    squadrons -= 2;
          }
        }
        if (z === "papacy") {
          tile = "/his/img/tiles/papacy/";	  
	  if (squadrons >= 2) {
            tile += `Papacy_squadron.svg`;
	    squadrons -= 2;
	  }
        }
        if (z === "ottoman") {
          tile = "/his/img/tiles/ottoman/";	  
	  if (squadrons >= 2) {
            tile += `Ottoman_squadron.svg`;
	    squadrons -= 2;
          }
	  if (corsairs >= 1) {
            tile += `Ottoman_corsair.svg`;
	    corsairs -= 1;
          }
        }
        if (z === "venice") {
	  if (squadrons >= 2) {
            tile += `Venice_squadron.svg`;
	    squadrons -= 2;
          }
        }
        if (z === "genoa") {
          tile = "/his/img/tiles/genoa/";	  
	  if (squadrons >= 2) {
            tile += `Genoa_squadron.svg`;
	    squadrons -= 2;
          }
        }
        if (z === "scotland") {
          tile = "/his/img/tiles/scotland/";	  
	  if (squadrons >= 2) {
            tile += `Scottish_squadron.svg`;
	    squadrons -= 2;
          }
        }

        html += `<img class="navy_tile" src="${tile}" />`;
      }

 
      while (corsairs >= 1) {
        if (z === "ottoman") {
          tile = "/his/img/tiles/ottoman/";	  
	  if (corsairs >= 1) {
            tile += `Ottoman_corsair.svg`;
	    corsairs -= 1;
          }
        }
        html += `<img class="navy_tile" src="${tile}" />`;
      }
 
    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  returnArmies(space) {

    let html = '<div class="space_army" id="">';

    let tile = "";

    for (let z in space.units) {

      let army = 0;
      for (let zz = 0; zz < space.units[z].length; zz++) {
	if (space.units[z][zz].type === "regular") {
	  army++;
	}
      }

      while (army >= 1) {
        if (z === "hapsburg") {
          tile = "/his/img/tiles/hapsburg/";	  
	  if (army >= 4) {
            tile += `HapsburgReg-4.svg`;
	    army -= 4;
	  } else {
	    if (army >= 2) {
              tile += `HapsburgReg-2.svg`;
	      army -= 2;
	    } else {
	      if (army >= 1) {
                tile += `HapsburgReg-1.svg`;
	        army -= 1;
	      }
	    }
          }
	}
        if (z === "england") {
          tile = "/his/img/tiles/england/";	  
	  if (army >= 4) {
            tile += `EnglandReg-4.svg`;
	    army -= 4;
          } else {
	    if (army >= 2) {
              tile += `EnglandReg-2.svg`;
	      army -= 2;
            } else {
	      if (army >= 1) {
                tile += `EnglandReg-1.svg`;
	        army -= 1;
              }
            }
	  }
        }
        if (z === "france") {
          tile = "/his/img/tiles/france/";	  
	  if (army >= 4) {
            tile += `FrenchReg-4.svg`;
	    army -= 4;
          } else {
	    if (army >= 2) {
              tile += `FrenchReg-2.svg`;
	      army -= 2;
            } else {
	      if (army >= 1) {
                tile += `FrenchReg-1.svg`;
	        army -= 1;
              }
	    }
	  }
        }
        if (z === "papacy") {
          tile = "/his/img/tiles/papacy/";	  
          if (army >= 4) {
            tile += `PapacyReg-4.svg`;
            army -= 4;
          } else {
	    if (army >= 2) {
              tile += `PapacyReg-2.svg`;
	      army -= 2;
	    } else {
	      if (army >= 1) {
                tile += `PapacyReg-1.svg`;
	        army -= 1;
	      }
	    }
	  }
        }
        if (z === "protestant") {
          tile = "/his/img/tiles/protestant/";	  
	  if (army >= 4) {
            tile += `ProtestantReg-4.svg`;
	    army -= 4;
          } else {
	    if (army >= 2) {
              tile += `ProtestantReg-2.svg`;
	      army -= 2;
            } else {
	      if (army >= 1) {
                tile += `ProtestantReg-1.svg`;
	        army -= 1;
              }
	    }
          }
        }
        if (z === "ottoman") {
          tile = "/his/img/tiles/ottoman/";	  
	  if (army >= 4) {
            tile += `OttomanReg-4.svg`;
	    army -= 4;
          } else {
	    if (army >= 2) {
              tile += `OttomanReg-2.svg`;
	      army -= 2;
            } else {
	      if (army >= 1) {
                tile += `OttomanReg-1.svg`;
	        army -= 1;
              }
            }
          }
        }
        if (z === "independent") {
          tile = "/his/img/tiles/independent/";	  
	  if (army >= 2) {
            tile += `IndependentReg-2.svg`;
	    army -= 2;
          } else {
	    if (army >= 1) {
              tile += `IndependentReg-1.svg`;
	      army -= 1;
            } 
	  }
        }
        if (z === "venice") {
          tile = "/his/img/tiles/venice/";	  
	  if (army >= 2) {
            tile += `VeniceReg-2.svg`;
	    army -= 2;
          } else {
	    if (army >= 1) {
              tile += `VeniceReg-1.svg`;
	      army -= 1;
            }
	  }
        }
        if (z === "hungary") {
          tile = "/his/img/tiles/hungary/";	  
	  if (army >= 4) {
            tile += `HungaryReg-4.svg`;
	    army -= 4;
          } else {
	    if (army >= 2) {
              tile += `HungaryReg-2.svg`;
	      army -= 2;
            } else {
	      if (army >= 1) {
                tile += `HungaryReg-1.svg`;
	        army -= 1;
              }
            }
          }
        }
        if (z === "genoa") {
          tile = "/his/img/tiles/genoa/";	  
	  if (army >= 2) {
            tile += `GenoaReg-2.svg`;
	    army -= 2;
          } else {
	    if (army >= 1) {
              tile += `GenoaReg-1.svg`;
	      army -= 1;
            }
          }
        }
        if (z === "scotland") {
          tile = "/his/img/tiles/scotland/";	  
	  if (army >= 2) {
            tile += `ScottishReg-2.svg`;
	    army -= 2;
          } else {
	    if (army >= 1) {
              tile += `ScottishReg-1.svg`;
	      army -= 1;
            }
          } 
        }
      }

      if (tile !== "") {
        html += `<img class="army_tile" src="${tile}" />`;
      } 

    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  returnMercenaries(space) {

    let html = '<div class="space_mercenaries" id="">';
    let tile = "";

    for (let z in space.units) {

      let army = 0;
      for (let zz = 0; zz < space.units[z].length; zz++) {
        if (space.units[z][zz].type === "mercenary") {
          army++;
        }
      }

      for (let i = 0; i < army; i+= 2) {
        if (z != "") {
          if (z === "hapsburg") {
            tile = "/his/img/tiles/hapsburg/";	  
	    if (army >= 4) {
              tile += `HapsburgMerc-4.svg`;
	      army -= 4;
	    }
	    if (army >= 2) {
              tile += `HapsburgMerc-2.svg`;
	      army -= 2;
	    }
	    if (army >= 1) {
              tile += `HapsburgMerc-1.svg`;
	      army -= 1;
	    }
          }
          if (z === "england") {
            tile = "/his/img/tiles/england/";	  
	    if (army >= 4) {
              tile += `EnglandMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `EnglandMerc-2.svg`;
	      army -= 4;
            }
	    if (army >= 1) {
              tile += `EnglandMerc-1.svg`;
	      army -= 1;
            }
          }
          if (z === "france") {
            tile = "/his/img/tiles/france/";	  
	    if (army >= 4) {
              tile += `FrenchMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `FrenchMerc-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `FrenchMerc-1.svg`;
	      army -= 1;
            }
          }
          if (z === "papacy") {
            tile = "/his/img/tiles/papacy/";	  
	    if (army >= 4) {
              tile += `PapacyMerc-4.svg`;
	      army -= 4;
	    }
	    if (army >= 2) {
              tile += `PapacyMerc-2.svg`;
	      army -= 2;
	    }
	    if (army >= 1) {
              tile += `PapacyMerc-1.svg`;
	      army -= 1;
	    }
          }
          if (z === "protestant") {
            tile = "/his/img/tiles/protestant/";	  
	    if (army >= 4) {
              tile += `ProtestantMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `ProtestantMerc-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `ProtestantMerc-1.svg`;
	      army -= 1;
            }
          }
          if (z === "ottoman") {
            tile = "/his/img/tiles/ottoman/";	  
	    if (army >= 4) {
              tile += `OttomanMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `OttomanMerc-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `OttomanMerc-1.svg`;
	      army -= 1;
            }
          }
        }
        html += `<img class="mercenary_tile" src="${tile}" />`;
      }
    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  returnPersonages(space) {

    let html = '<div class="figures_tile" id="">';
    let owner = space.political;
    if (owner == "") { owner = space.home; }
    let tile = "";

    for (let z in space.units) {
      for (let zz = 0; zz < space.units[z].length; zz++) {
	if (space.units[z][zz].debater === true) {
          html += `<img src="/his/img/tiles/debater/${space.units[z][zz].img}" />`;
	  tile = html;
	}
	if (space.units[z][zz].personage === true) {
          html += `<img src="/his/img/tiles/personages/${space.units[z][zz].img}" />`;
	  tile = html;
	}
      }
    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  displaySpace(key) {

    let obj = document.getElementById(key);
    let space = this.spaces[key];
    let tile = this.returnSpaceTile(space);
    let stype = "hex";

    if (space.type == "town") { stype = "hex"; }
    if (space.type == "key") { stype = "key"; }

    //
    // should we show the tile?
    //
    let show_tile = 1;

    //
    // do not show under some conditions
    //
    if (space.political == space.home) { show_tile = 0; }
    if (space.political === "") { show_tile = 0; }

    //
    // and force for keys
    //
    if (space.home === "" && space.political !== "") { show_tile = 1; }
    if (space.type === "key") { show_tile = 1; }

    //
    // sanity check
    //
    if (tile === "") { show_tile = 0; }

    if (show_tile === 1) {
      obj.innerHTML = `<img class="${stype}tile" src="${tile}" />`;
      obj.innerHTML += this.returnArmies(space);
      obj.innerHTML += this.returnNavies(space);
      obj.innerHTML += this.returnMercenaries(space);
      obj.innerHTML += this.returnPersonages(space);
    }

  }

  displayNavalSpace(key) {

    let obj = document.getElementById(key);
    let space = this.navalspaces[key];

    //
    // should we show the tile?
    //
    let show_tile = 1;

    //
    // do not show under some conditions
    //

    if (show_tile === 1) {
      obj.innerHTML += this.returnNavies(space);
      obj.innerHTML += this.returnPersonages(space);
    }

  }

  displayNavalSpaces() {

    //
    // add tiles
    //
    for (let key in this.navalspaces) {
      if (this.navalspaces.hasOwnProperty(key)) {
	this.displayNavalSpace(key);
        document.getElementById(key).onclick = (e) => {
	  this.displayNavalSpaceDetailedView(key);
        }
      }
    }

  }

  displaySpaces() {

    //
    // add tiles
    //
    for (let key in this.spaces) {
      if (this.spaces.hasOwnProperty(key)) {
	this.displaySpace(key);
        document.getElementById(key).onclick = (e) => {
	  this.displaySpaceDetailedView(key);
        }
      }
    }

  }


  displayVictoryTrack() {
  }




} // end and export

module.exports = HereIStand;


