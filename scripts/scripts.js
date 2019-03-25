// Sources:
// http://ocean.nationalgeographic.com/ocean/photos/deep-sea-creatures/#/deep-sea01-frill-shark_18161_600x450.jpg
// http://scubadiverlife.com/top-five-deepest-diving-animals/
// Blue whale dive:
// https://animalbiotelemetry.biomedcentral.com/articles/10.1186/s40317-016-0109-4
// http://animals.nationalgeographic.com/animals/birds/emperor-penguin/

var jumping = false;

var px2cmConst = 0.02645833; // Used to convert px to cm

// How much has the screen been recently scrolled (used to move particles up and down)
var scrollDelta = 0;

// Is the audio muted?
var muted = true;

// Has the audio context been started?
var audioStarted = false;

// How many audio layers have been loaded?
// Need to wait until all are loaded to play them...
var layersLoaded = 0;

$(function () {

    // jQuery element caching
    
    $window = $(window);
    $body = $('body');
    $hud = $('#hud');
    $currentZone = $('#current-zone'); // The name of the current zone
    $zoneInfo = $('#zone-info'); // Shows information about the current zone
    $depthInfo = $('#depth-info'); // Shows the current depth in meters
    $ruler = $('#ruler-container'); // Shows depth markers on left side of screen
    $particles = $('#particles-canvas');
    $audioToggle = $('#audio-toggle'); // Button to toggle sound
    
    /**** AUDIO ****/
    // A class for the layers (tracks) of the composition
    // Each layer has an audio file and a start/end position for fading in and out
    function SoundLayer(audioFile, fadeOutStart, fadeOutEnd) {
        this.howl = new Howl({
            src: ["audio/" + audioFile],
            loop: true
        });

        // At what depth should this sound start fading out?
        this.fadeOutStart = fadeOutStart;
        // At what depth should it finish fading out?
        this.fadeOutEnd = fadeOutEnd;

        this.targetVolume = 0.0;
    }

    // Load all sounds and set their depths...
    var soundLayers = [
        new SoundLayer("waves.wav", 40, 200),
        new SoundLayer("shimmer.wav", 700, 1000),
        new SoundLayer("harpsi.wav", 1000, 2500),
        new SoundLayer("guitar.wav", 3000, 4000),
        new SoundLayer("swells.wav", 4000, 6000),
        new SoundLayer("pad.wav", 6000, 8000),
        new SoundLayer("piano.wav", 9000, 12000),
        new SoundLayer("pings.wav", 8000, 9000)
    ];

    // Adjust all of the volumes before playing
    adjustLayerVolumes();

    for (var i = 0; i < soundLayers.length; i++) {
        soundLayers[i].howl.once("load", function () {
            // Increment this as files are loaded
            layersLoaded++;

            // Once they're all loaded, loop through and play them all.
            if (layersLoaded == soundLayers.length) {

                for (var i = 0; i < soundLayers.length; i++) {
                    soundLayers[i].howl.fade(0.0, soundLayers[i].targetVolume, 1000);
                }
                
                $("#audio-loading").fadeOut("fast");
            }
        });
    }

    /**** PARTICLES ****/
    createParticles();
    animateParticles();

    var currentZone = 'Epipelagic'; // Default to top zone

    var topOffset = $window.innerHeight() * 0.9;

    var showingEvent = false;
    var showingEventOld = false;

    loadEvents();

    var nearestBelow = $(".event-container").first();
    var nearestAbove = $(nearestBelow).prev();

    // Audio layers are faded in/out according to "depth" (scroll position)
    function adjustLayerVolumes() {

        for (var i = 0; i < soundLayers.length; i++) {
            var layer = soundLayers[i];
            if (currentDepth > layer.fadeOutStart) {
                var distPastStart = currentDepth - layer.fadeOutStart;
                var fadeRange = layer.fadeOutEnd - layer.fadeOutStart;
                var curVolume = 1.0 - (distPastStart / fadeRange);
                if (curVolume < 0) {
                    curVolume = 0;
                }
                layer.targetVolume = curVolume;
                layer.howl.volume(curVolume);
            } else {
                layer.targetVolume = 1.0;
                layer.howl.volume(1.0);
            }
        }
    }

    /**** ADJUSTMENTS ****/
    
    
    $window.on('load resize', function () {

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        topOffset = $(window).innerHeight() * 0.9;

        $ruler.empty();
        for (var i = 10; i < 10994; i += 10) {
            $ruler.append("<div class='ruler-mark' style='top: " + (i * 0.5 + (topOffset * px2cmConst)) + "cm'><p>" + i + "m</p></div>");
        }

        $(".event-container").each(function () {
            var depth = $(this).attr("data-depth");
            $(this).css("top", (depth * 0.5 + (topOffset * px2cmConst)) + "cm");
        });
    });

    window.setInterval(checkZones, 100);
    
    /******** UI EVENTS ********/

    function jumpToEvent(direction) {

        jumping = true;

        var distance = Math.abs($(window).scrollTop() + ($(window).innerHeight() * 0.5) - $(direction).offset().top);

        $('html, body').animate({
            scrollTop: $(direction).offset().top - $(window).innerHeight() * 0.5 // distance from event
        }, distance * 0.5, function () {
            jumping = false;
            calculateEvents();
        });
    }

    function stopJump() {
        jumping = false;
        $('html, body').stop();
    }

    function _arrowEvents(){
        $(".down-arrow").click(function () {
            if (jumping) {
                stopJump();
                calculateEvents();
            }
            jumpToEvent(nearestBelow);
        });
        
        $(".up-arrow").click(function () {
            if(jumping){
                stopJump();
                calculateEvents();
            }
            jumpToEvent(nearestAbove);
        });
    }
    
    
    $(".event-mark").click(function(){
        var thisID = $(this).attr("data-eventID");
        jumpToEvent($(".event-container[data-eventID="+thisID+"]"));
    });

    // Toggles the audio on and off.
    function _audioToggle(){
        $audioToggle.click(function () {

            Howler.mute(!muted);
            muted = !muted;
            $(this).toggleClass("muted");

            if(!audioStarted){
                for (var i = 0; i < soundLayers.length; i++) {
                    soundLayers[i].howl.play();
                }
                audioStarted = true;
            }
            
        });
    }    

    /**** SCROLLING EVENTS ****/

    var currentDepth = 0;

    // Arbitrarily large starting value
    var recordClosest = 10000;

    var lastPos;
    var newPos;
    var timer;

    function clearScroll() {
        lastPos = null;
        scrollDelta = 0;
    }    
    
    function _jumpInterrupt(){
        // If the user wants to start scrolling, stop the animated scroll to the next element.
        $body.bind('mousewheel', function () {
            // Only do this if "jumping"
            if (jumping) {
                stopJump();
            }
        });
    }

    
    function _toggleHUD(){
        if ($window.scrollTop() > topOffset) {
            $hud.fadeIn();
        } else {
            $hud.fadeOut();
        }
    }
    
    function scrollUpdates(){
        _toggleHUD();
    }
    
    $window.on('scroll', function () {
        scrollUpdates();

        /**** Particle Movement ****/
        var particlesOffset = $("#all-zones").offset().top - $window.scrollTop();
        if (particlesOffset < 0) {
            particlesOffset = 0;
        }

        $("#particles-canvas").css("top", particlesOffset);

        newPos = window.scrollY;

        if (lastPos != null) {
            var delta = newPos - lastPos;
            scrollDelta = delta;
        }

        lastPos = newPos;
        timer && clearTimeout(timer);
        timer = setTimeout(clearScroll, 30);

        /**** DEPTH CALCULATIONS ****/
        currentDepth = $window.scrollTop() * 2 * px2cmConst + 4;

        adjustLayerVolumes();

        // Get depth as a percentage of total depth, and set marker
        var depthPercent = (currentDepth / 10994.0) * 100.0;
        $("#marker").css("top", depthPercent + "%");

        // Set the depth output according to the currentDepth
        $depthInfo.html(Math.floor(currentDepth) + "m");        

        // Reset the record.
        recordClosest = 10000;

        // Don't fade events in and out when "jumping" (wait until destination is reached)
        // Also don't recalculate which one is the closest...
        if (!jumping) {
            calculateEvents();
        }

        if (showingEvent !== showingEventOld) {
            if (showingEvent) {
                $("#zone-info").animate({
                    opacity: 0.0
                });
            } else {
                $("#zone-info").animate({
                    opacity: 1.0
                });
            }

            showingEventOld = showingEvent;
        }        

    });

    // Calculates which events are closest, so that arrows can jump to the next/previous events.
    function calculateEvents() {
        showingEvent = false;

        // Present events when they appear on screen.
        $('.event-container').each(function () {
            var eventDepth = $(this).attr("data-depth");
            var distance = eventDepth - currentDepth;

            var pxDist = $(this).offset().top - $window.scrollTop();

            // Check to see if the event is on screen
            if (pxDist < $window.innerHeight() * 0.8 && pxDist > $window.innerHeight() * 0.1) {
                
                if ($(this).hasClass("hidden")) {
                    $(this).removeClass("hidden");
                }
                showingEvent = true;

            } else {
                if (!$(this).hasClass("hidden")) {
                    $(this).addClass("hidden");
                }
            }

            if (distance > 0 && distance < recordClosest) {
                recordClosest = distance;
                nearestBelow = $(this);

                if ($(nearestBelow).prev().length) {
                    var prevDist = $(nearestBelow).prev().offset().top - $(window).scrollTop();

                    if (prevDist < 0) {
                        nearestAbove = $(nearestBelow).prev();
                    } else {
                        nearestAbove = $(nearestBelow).prev().prev();
                    }
                }
            }
        });
        //console.log($(nearestAbove).find("h2").text());
    }

    function checkZones(){
        // Change zones as applicable
        if (currentDepth < 200) {
            changeZone("epipelagic");
        } else if (currentDepth < 1000) {
            changeZone("mesopelagic");
        } else if (currentDepth < 4000) {
            changeZone("bathypelagic");
        } else if (currentDepth < 6000) {
            changeZone("abyssopelagic");
        } else {
            changeZone("hadalpelagic");
        }
    }
    
    function changeZone(zoneName) {
        if (zoneName !== currentZone) {
            $currentZone.fadeOut('fast', function () {
                $currentZone.html(zoneName);
                $currentZone.fadeIn();
            });

            $("#zone-info").fadeOut("fast", function () {
                $("#zone-info").html($("#" + zoneName).find("div").html());
                $("#zone-info").fadeIn();
            });

            currentZone = zoneName;

        }

    }
    
    function init(){
        _arrowEvents();
        _audioToggle();
        _jumpInterrupt();
    }
    
    init();

});