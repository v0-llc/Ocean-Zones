// Sources:
// http://ocean.nationalgeographic.com/ocean/photos/deep-sea-creatures/#/deep-sea01-frill-shark_18161_600x450.jpg

var compressed = false;

var jumping = false;

var px2cmConst = 0.02645833; // Used to convert px to cm

var scrollDelta = 0;

$(document).ready(function () {

    var counter = 0;

    var canvas = document.getElementById("particles-canvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    function Particle() {
        this.lifetime = 0.0;
        
        this.size = 0;
        this.speed = 0;
        this.posX = 0;
        this.posY = 0;
        this.velX = 0;
        this.velY = 0;
        
        this.init = particleInit;       
    }
    
    function particleInit(){
        this.lifetime = 0.0;
        
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() + 0.1;
        this.posX = Math.random() * window.innerWidth;
        this.posY = Math.random() * window.innerHeight;
        this.velX = Math.random() * 0.2 - 0.1;
        this.velY = Math.random() * 0.5 + 0.05;
    }

    var numParticles = 200;

    var particles = [];
    
    for(var i = 0; i < numParticles; i++){
        particles[i] = new Particle();
        particles[i].init();
    }
    
    function draw() {
        counter++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < numParticles; i++) {
            particles[i].lifetime += 0.01;
            if(particles[i].lifetime > 0.2){
                particles[i].lifetime = 0.2;
            }
            
            particles[i].posX += particles[i].velX;
            particles[i].posY += particles[i].velY + scrollDelta * -0.5;
            
            if(particles[i].posY < -10){
                particles[i].init();
            }
            if(particles[i].posY > canvas.height + 10){
                particles[i].init();
            }
            
            ctx.beginPath();

            ctx.arc(particles[i].posX, particles[i].posY, particles[i].size, 0, 2 * Math.PI);
            ctx.closePath();

            ctx.fillStyle = "rgba(255, 255, 255, "+particles[i].lifetime+")";
            ctx.fill();
        }
        
        window.requestAnimationFrame(draw);
    }

    draw();

    var currentZone = "Epipelagic";

    var topOffset = $(window).innerHeight() * 0.9;

    var showingEvent = false;
    var showingEventOld = false;

    loadEvents();

    var nearestBelow = $(".event-container").first();
    var nearestAbove = $(nearestBelow).prev();

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

    $(".down-arrow").click(function () {
        jumping = true;
        $("html, body").animate({
            scrollTop: $(nearestBelow).offset().top - $(window).innerHeight() * 0.5
        }, 3000, function () {
            jumping = false;
            calculateEvents();
        });
    });
    $(".up-arrow").click(function () {
        jumping = true;
        $("html, body").animate({
            scrollTop: $(nearestAbove).offset().top - $(window).innerHeight() * 0.5
        }, 3000, function () {
            jumping = false;
            calculateEvents();
        });
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
        if(particlesOffset < 0){
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