

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


