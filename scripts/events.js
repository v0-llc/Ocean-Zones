// The Event "class"
function Event(name, depth, info, image) {
    this.name = name;
    this.depth = depth;
    this.info = info;
    this.image = image;
}

var events = [

    new Event(
        "Nitrogen Narcosis",
        30,
        "Nitrogen narcosis is an alteration of consciousness that occurs while diving at depth. It is caused by the anesthetic effect of certain gases at high pressure. Past a depth of 30m, reasoning and memory may be affected, and divers may experience a delayed response to stimuli. In other words, this is where is starts to get dangerous."),

    new Event(
        "Deepest Freedive",
        214,
        "The Austrian freediver Herbert Nitsch is the current freediving world record champion. This title was given to him when he set a world record in the 'No Limits' discipline at a depth of 214 meters. Impressive, but we still have a long way to go..."),

    new Event(
        "Tuffy",
        300,
        "The record for the deepest dive by a bottlenose dolphin is held by Tuffy, a dolphin trained by the US Navy. Generally, bottlenose dolphins spend most of their time is shallow water less than 2 meters deep."
    ),

    new Event(
        "Height of the Empire State Building",
        381,
        "Loach goby barreleye, shortnose chimaera Ganges shark, galjoen fish, silver carp pearl perch bichir Rainbow trout bull trout sábalo surfperch. Port Jackson shark jellynose fish: amur pike. Pacific saury, plownose chimaera bango plunderfish. Sailback scorpionfish mail-cheeked fish mako shark moonfish, Kafue pike suckermouth armored catfish pikeperch Gila trout lancetfish."
    ),

    new Event(
        "Deepest Blue Whale Dive",
        506,
        "Trench, lamprey grenadier grunion Mexican golden trout bramble shark rohu speckled trout tilefish emperor angelfish tilapia North American darter, jawfish perch houndshark. Australasian salmon alewife javelin, platy pompano dolphinfish, loach minnow delta smelt ghoul. Whale catfish sandfish starry flounder grenadier Pacific cod leaffish rudd algae eater goosefish. Bullhead guitarfish sand diver pufferfish megamouth shark ilisha."
    ),

    new Event(
        "Open Sea Diving Depth Record",
        534,
        "Ling hawkfish river shark, goldeye vimba blackchin weasel shark ghost knifefish. Boxfish whale shark scorpionfish scup Pacific cod, cookie-cutter shark yellow-edged moray tonguefish butterflyfish rockweed gunnel scup."
    ),
    
    new Event(
        "Emperor Penguin",
        535,
        "Deepest diving bird"
    ),

    new Event(
        "Basking Shark",
        900,
        "Mojarra dwarf gourami. Codlet cownose ray, eeltail catfish naked-back knifefish Gila trout prowfish dragonfish yellowhead jawfish."
    ),

    new Event(
        "Leatherback Sea Turtle",
        1280,
        "Although most sea turtles live at shallower depths, the Leatherback can dive to great depths in search of their prey, jellyfish."
    ),

    new Event(
        "Deep Sea Angler",
        1500,
        "Mojarra dwarf gourami. Codlet cownose ray, eeltail catfish naked-back knifefish Gila trout prowfish dragonfish yellowhead jawfish."
    ),
    
    new Event(
        "Gulper Eel",
        2000,
        "Deepest eel"
    ),

    new Event(
        "Sperm Whale",
        2250,
        "Trench, lamprey grenadier grunion Mexican golden trout bramble shark rohu speckled trout tilefish emperor angelfish tilapia North American darter, jawfish perch houndshark. Australasian salmon alewife javelin, platy pompano dolphinfish, loach minnow delta smelt ghoul. Whale catfish sandfish starry flounder grenadier Pacific cod leaffish rudd algae eater goosefish. Bullhead guitarfish sand diver pufferfish megamouth shark ilisha.",
        "spermwhale"
    ),
    
    new Event(
        "Elephant Seal",
        2388,
        ""
    ),

    new Event(
        "Cuvier's Beaked Whale",
        2992,
        ""
    ),

    new Event(
        "Vampyroteuthis Infernalis",
        3000,
        ""
    ),
    
    new Event(
        "Portugese Dogfish",
        3700,
        "Deepest shark"
    ),

    new Event(
        "Wreck of the Titanic",
        3800,
        ""
    ),

    new Event(
        "Ghost Octopus",
        4290,
        ""
    ),

    new Event(
        "Pacific Viperfish",
        4400,
        ""
    ),
    new Event(
        "Cayman Trough",
        7686,
        ""
    ),
    
    new Event(
        "Submarine Internet Cable",
        8000,
        ""
    ),

    new Event(
        "Fangtooth Fish",
        5000,
        ""
    ),
    
    new Event(
        "Atacama Trench",
        8065,
        ""
    ),

    new Event(
        "Snailfish",
        8145,
        ""
    ),
    
    new Event(
        "Puerto Rico Trench",
        8800,
        ""
    ),

    new Event(
        "Height of Mount Everest",
        8848,
        ""
    ),

    new Event(
        "Bathyscaphe <em>Trieste</em>",
        10911,
        ""
    ),
    new Event(
        "Challenger Deep",
        10990,
        ""
    )

];

function loadEvents() {
    for (var i = 0; i < events.length; i++) {
        var randLR = "left";
        if(Math.random() > 0.5){
            randLR = "right";
        }
        var currentEvent = events[i];

        $("#events-container").append(
            "<div class='event-container' style='"+randLR+":" + (Math.random() * 10 + 5) + "%' data-depth='" + currentEvent.depth + "'>" +
            "<h2>" + currentEvent.name + " (" + currentEvent.depth + "m)</h2>" +
            (currentEvent.info !== "" ? "<p>" + currentEvent.info + "</p>" : "") +
            (currentEvent.image !== undefined ? "<img src='images/"+currentEvent.image+".svg' alt='"+currentEvent.image+"'>" : "") +
            "</div>"
        );
    }
}