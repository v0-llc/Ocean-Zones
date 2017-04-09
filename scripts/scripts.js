// Sources:
// http://ocean.nationalgeographic.com/ocean/photos/deep-sea-creatures/#/deep-sea01-frill-shark_18161_600x450.jpg
//http://scubadiverlife.com/top-five-deepest-diving-animals/

var compressed = false;

var jumping = false;

var px2cmConst = 0.02645833; // Used to convert px to cm

var scrollDelta = 0;

var muted = false;

var layersLoaded = 0;

$(document).ready(function () {

    function SoundLayer(audioFile, fadeOutStart, fadeOutEnd) {
        this.howl = new Howl({
            src: ["audio/" + audioFile],
            loop: true
        });

        this.fadeOutStart = fadeOutStart;
        this.fadeOutEnd = fadeOutEnd;
        
        this.targetVolume = 0.0;
    }

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
    
    adjustLayerVolumes();

    for (var i = 0; i < soundLayers.length; i++) {
        soundLayers[i].howl.once("load", function () {
            layersLoaded++;

            if (layersLoaded == soundLayers.length) {

                for (var i = 0; i < soundLayers.length; i++) {
                    soundLayers[i].howl.fade(0.0, soundLayers[i].targetVolume, 1000);
                    soundLayers[i].howl.play();
                }
            }
        });
    }

    /**** AUDIO ****/
    createParticles();

    animateParticles();

    var currentZone = "Epipelagic";

    var topOffset = $(window).innerHeight() * 0.9;

    var showingEvent = false;
    var showingEventOld = false;

    loadEvents();

    var nearestBelow = $(".event-container").first();
    var nearestAbove = $(nearestBelow).prev();

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
    $(window).on("load resize", function () {

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        topOffset = $(window).innerHeight() * 0.9;

        $("#ruler-container").empty();
        for (var i = 10; i < 10994; i += 10) {
            $("#ruler-container").append("<div class='ruler-mark' style='top: " + (i * 0.5 + (topOffset * px2cmConst)) + "cm'><p>" + i + "m</p></div>");
        }

        $(".event-container").each(function () {
            var depth = $(this).attr("data-depth");
            $(this).css("top", (depth * 0.5 + (topOffset * px2cmConst)) + "cm");
        });
    });

    /******** UI EVENTS ********/

    function jumpToEvent(direction) {

        jumping = true;

        var distance = Math.abs($(window).scrollTop() - $(direction).offset().top);

        $("html, body").animate({
            scrollTop: $(direction).offset().top - $(window).innerHeight() * 0.5
        }, distance, function () {
            jumping = false;
            calculateEvents();
        });
    }

    $(".down-arrow").click(function () {
        jumpToEvent(nearestBelow);
    });
    $(".up-arrow").click(function () {
        jumpToEvent(nearestAbove);
    });

    $("#audio-toggle").click(function () {
        Howler.mute(!muted);
        muted = !muted;
    });

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

    

    $(window).on("scroll", function () {
        if ($("body").scrollTop() > topOffset) {
            $("#hud, .arrow").fadeIn();
        } else {
            $("#hud, .arrow").fadeOut();
        }

        var particlesOffset = $("#all-zones").offset().top - $("body").scrollTop();
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
        currentDepth = $("body").scrollTop() * 2 * px2cmConst + 4;

        adjustLayerVolumes();

        // Get depth as a percentage of total depth, and set marker
        var depthPercent = (currentDepth / 10994.0) * 100.0;
        $("#marker").css("top", depthPercent + "%");

        // Set the depth output according to the currentDepth
        $("#depth-info").html(Math.floor(currentDepth) + "m");

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

        // Reset the record.
        recordClosest = 10000;

        // Don't fade events in and out when "jumping" (wait until destination is reached)
        if (!jumping) {
            calculateEvents();
        }

        //        if (showingEvent !== showingEventOld) {
        //            if (showingEvent) {
        //                $("#central-info, #scale").animate({
        //                    opacity: 0.0
        //                });
        //            } else {
        //                $("#central-info, #scale").animate({
        //                    opacity: 1.0
        //                });
        //            }
        //            
        //            showingEventOld = showingEvent;
        //        }        

    });

    // Calculates which events are closest, so that arrows can jump to the next/previous events.
    function calculateEvents() {
        showingEvent = false;

        // Present events when they appear on screen.
        $(".event-container").each(function () {
            var eventDepth = $(this).attr("data-depth");
            var distance = eventDepth - currentDepth;

            var pxDist = $(this).offset().top - $("body").scrollTop();

            if (pxDist < $(window).innerHeight() * 0.8 && pxDist > $(window).innerHeight() * 0.1) {
                if (!$(this).find("p").is(":visible")) {
                    $(this).find("p").fadeIn();
                }
                showingEvent = true;

            } else {
                if ($(this).find("p").is(":visible")) {
                    $(this).find("p").fadeOut();
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
    }

    function changeZone(zoneName) {
        if (zoneName !== currentZone) {
            $("#current-zone").fadeOut("fast", function () {
                $("#current-zone").html(zoneName);
                $("#current-zone").fadeIn();
            });

            //            $("#zone-info").fadeOut("fast", function () {
            //                $("#zone-info").html($("#" + zoneName).find("div").html());
            //                $("#zone-info").fadeIn();
            //            });

            currentZone = zoneName;

        }

    }

});