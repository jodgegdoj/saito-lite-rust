
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


