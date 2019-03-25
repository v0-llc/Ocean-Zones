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
        "Nitrogen narcosis is an alteration of consciousness that occurs while diving at depth. It is caused by the anesthetic effect of certain gases at high pressure. Past a depth of 30m, reasoning and memory may be affected, and divers may experience a delayed response to stimuli."),

    new Event(
        "Deepest Freedive",
        214,
        "The Austrian freediver Herbert Nitsch is the current freediving world record champion. This title was given to him when he set a world record in the 'No Limits' discipline at a depth of 214 meters. Impressive, but we still have a long way to go...",
        "nitsch.jpg"
    ),
        
    new Event(
        "First live video of a deep-water coral reef",
        280,
        "In July, 1982, Statoil captured the first live video of a deep-water coral reef when it surveyed a 15 meter tall and 50 meter wide reef near Fugløy Island, off northern Norway",
        "deepcoral.jpg"
    ),
    
    new Event(
        "Tuffy",
        300,
        "The record for the deepest dive by a bottlenose dolphin is held by Tuffy, a dolphin trained by the US Navy. Generally, bottlenose dolphins spend most of their time is shallow water less than 2 meters deep.",
        "tuffy.jpg"
    ),

    new Event(
        "Height of the Empire State Building",
        381,
        "",
        "empire.jpg"
    ),

    new Event(
        "Deepest Blue Whale Dive",
        506,
        "At a length of up to 30m and a weight of over 200 tons, the blue whale is the largest whale, and the largest animal known to have ever existed.",
        "bluewhale.jpg"
    ),

    new Event(
        "Open Sea Diving Depth Record",
        534,
        "The open-sea diving depth record was achieved in 1988 by a team of Comex divers performing pipeline connection exercises in the Mediterranean Sea. The divers needed to breathe special gas mixtures because of the high ambient pressures present at these depths.",
        "deep-diver.jpg"
    ),
    
    new Event(
        "Emperor Penguin",
        565,
        "At sea, emperor penguins dive up to 565 meters - deeper than any other bird - to feed on fish, squid, and krill. When diving, they can stay underwater for more than 20 minutes.",
        "emperor-penguins.jpg" //http://cdn.pcwallart.com/images/emperor-penguins-swimming-wallpaper-1.jpg
    ),

    new Event(
        "Basking Shark",
        910,
        "The basking shark is the world's second largest living fish, typically reaching 6 to 8 meters in length. They are slow moving filter feeders found in all of the world's temperate oceans.",
        "basking-shark.jpg" //http://www.deepseanews.com/wp-content/uploads/2009/05/basking_shark_med.jpg
    ),
    
    new Event(
        "Leatherback Sea Turtle",
        1280,
        "Although most sea turtles live at shallower depths, the Leatherback can dive to great depths in search of their prey, jellyfish.",
        "leatherback.jpg"
    ),

    new Event(
        "Deep Sea Angler",
        1675,
        "Melanocetus Eustalus is one of many species of deep sea anglerfish. This one in particular is found off the Pacific coast of Mexico.",
        "angler.jpg" //http://extrememarine.org.uk/2016/11/large-ladies-and-parisitic-males-extreme-sex-in-the-deep-sea/
    ),

    new Event(
        "Sperm Whale",
        2250,
        "Also known as the cachalot, the sperm whale is the largest of the toothed whales and the largest toothed predator. It is the second deepest diving whale, following only Cuvier's Beaked Whale.",
        "sperm-whale.jpg" //http://www.nationalgeographic.com/animals/mammals/s/sperm-whale/
    ),
    
    new Event(
        "Elephant Seal",
        2388,
        "The elephant seal can hold its breath for over 100 minutes, longer than any noncetacean mammal. The deepest recorded dive is 2,388m, deeper than most whales!",
        "elephant-seal.jpg"
    ),

    new Event(
        "Cuvier's Beaked Whale",
        2992,
        "The most widely distributed of the beaked whales, Cuvier's Beaked Whale is also notable for having the deepest recorded dive of any mammal. At two hours and 17 minutes, it holds the record for the longest dive as well.",
        "cuviers-beaked-whale.jpg"
    ),
    
    new Event(
        "Portugese Dogfish",
        3675,
        "Despite its name, the Portugese dogfish is a globally distributed species of sleeper shark, and is the deepest known living shark.",
        "dogfish.jpg"
    ),

    new Event(
        "Wreck of the <em>Titanic</em>",
        3784,
        "At the time it entered service, the famous RMS Titanic was the largest ship afloat. Although it was popularly regarded as 'unsinkable' at the time, it collided with an iceberg on April 15, 1912, and sank to the ocean floor off the coast of Newfoundland.",
        "titanic.jpg"
    ),

    new Event(
        "Ghost Octopus",
        4290,
        "Discovered off the Hawaiian archipelago, the Ghost Octopus is the deepest dwelling octopod known to science.",
        "ghost-octopus.png"
    ),
    
    new Event(
        "Wreck of the USS Indianapolis",
        5500,
        "This heavy cruiser from World War II was missing for over 70 years after it was sunk by a Japanese submarine on July 30, 1945.",
        "indianapolis.jpg"
        
    ),
    
    new Event(
        "Deepest shipwreck ever found",
        5760,
        "In January 1944, the SS <em>Rio Grande</em> - a German blockade runner from World War II - was sunk by two U.S. ships in the Atlantic Ocean. It was discovered on November 28, 1996, using side-scanning sonar technology by Blue Water Recoveries.",
        "riogrande.jpg"        
    ),
    
    new Event(
        "Base of Mauna Kea",
        6000,
        "At 4,207.3m, Mauna Kea - a dormant volcano - is the highest point in the state of Hawaii. Measured from it's oceanic base, Mauna Kea is over 10,000m tall, making it the tallest mountain in the world. It is around one million years old.",
        "maunakea.jpg"        
    ),

    new Event(
        "Cayman Trough",
        7686,
        "As the deepest point in the Caribbean Sea, the Cayman Trough extends between Jamaica and the Cayman Islands, and forms part of the boundary between the North American Plate and the Caribbean Plate."
    ),
    
    new Event(
        "Submarine Internet Cable",
        8000,
        "Some of the Internet's most important international connections are made by large submarine cables, which sometimes cross the ocean floor at depths of over 8000m."
    ),

    new Event(
        "Fangtooth Fish",
        5000,
        "Although they only reach a length of about 16cm, the fangtooth has the largest teeth of any fish in the ocean, proportionate to body size, and are so large that the fangtooth can never close its mouth.",
        "fangtooth.jpg" //https://www.montereybayaquarium.org/animal-guide/fishes/fangtooth
    ),
    
    new Event(
        "Atacama Trench",
        8065,
        "Also known as the Peru-Chile Trench, this trench in the eastern Pacific Ocean reaches a depth of 8065m in Richards Deep.",
        "atacama.jpg"
    ),

    new Event(
        "Snailfish",
        8145,
        "One unknown species of snailfish was spotted by a probe in the Mariana Trench - the deepest ocean trench - and holds the record for the deepest known living species of fish.",
        "snailfish.jpg" //http://www.dailymail.co.uk/sciencetech/article-2880612/World-s-deepest-fish-Ghostly-snailfish-27-000ft-deep-bottom-Pacific-s-Mariana-Trench.html
    ),
    
    new Event(
        "Puerto Rico Trench",
        8648,
        "The Puerto Rico Trench is located on the boundary between the Caribbean Sea and the Atlantic Ocean. It has a maximum depth of 8,648m at Milwaukee Deep, which is the deepest point outside of the Pacific Ocean.",
        "puerto-rico-trench.jpg"
    ),

    new Event(
        "Height of Mount Everest",
        8848,
        ""
    ),

    new Event(
        "Bathyscaphe <em>Trieste</em>",
        10911,
        "On January 23 1960, Jacques Piccard and Don Walsh were the first two humans to visit the deepest known point of Earth's oceans, Challenger Deep. The bathyscaphe, called <em>Trieste</em>, was designed by Jacques Piccard's father, Auguste Piccard."
    ),
    new Event(
        "Challenger Deep",
        10980,
        "The Challenger Deep is the deepest known point in the Earth's seabed. It is located in the Pacific Ocean, at the southern end of the Mariana Trench, located south of Japan. Only four descents of Challenger Deep have ever been achieved."
    )

];

function loadEvents() {
    for (var i = 0; i < events.length; i++) {
        var randLR = "left";
        if(Math.random() > 0.5){
            randLR = "right";
        }
        var randPercent = Math.random() * 10 + 5;
        var currentEvent = events[i];
        var depthPercent = (currentEvent.depth / 10994.0) * 100;

        $("#events-container").append(
            "<div class='event-container hidden' style='"+randLR+":" + randPercent + "%' data-eventID="+i+" data-depth='" + currentEvent.depth + "'>" +
            "<h2>" + currentEvent.name + " (" + currentEvent.depth + "m)</h2>" +
            (currentEvent.info !== "" ? "<p>" + currentEvent.info + "</p>" : "") +
            (currentEvent.image !== undefined ? "<div class='img-box'><img src='images/"+currentEvent.image+"' alt='"+currentEvent.image+"'></div>" : "") +
            "</div>"
        );
        
        $("#event-marks-container").append(
            "<div class='event-mark' data-eventID="+i+" style='top: "+depthPercent+"%; "+randLR+":" + randPercent + "%'></div>"
        );
    }
}