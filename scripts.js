var compressed = false;

var jumping = false;

$(document).ready(function () {

    var px2cmConst = 0.02645833;

    var currentZone = "Epipelagic";

    var topOffset = $(window).innerHeight() * 0.9;

    $(window).on("load resize", function () {

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

    $("#scale").click(function () {
        //        compressed = !compressed;
        //        $(".zone-container").toggleClass("compressed", 2000);
        //        if(compressed){
        //            $("#ruler-container, #events-container").fadeOut();
        //        }else{
        //            $("#ruler-container, #events-container").fadeIn();
        //        }
    });

    var nearestBelow = $(".event-container").first();
    
    $(".down-arrow").click(function () {
        jumping = true;
        console.log("Jump");
        $("html, body").animate({
            scrollTop: $(nearestBelow).offset().top - $(window).innerHeight() * 0.4
        }, 3000, function () {
            jumping = false;
        });
    });    

    $(window).on("scroll", function () {
        if ($("body").scrollTop() > topOffset) {
            $("#hud, .arrow").fadeIn();
        } else {
            $("#hud, .arrow").fadeOut();
        }

        var currentDepth = $("body").scrollTop() * px2cmConst * 2;

        $("#depth-info").html(Math.floor(currentDepth) + "m");

        if (currentDepth < 200) {
            changeZone("Epipelagic");
        } else if (currentDepth < 1000) {
            changeZone("Mesopelagic");
        } else if (currentDepth < 4000) {
            changeZone("Bathypelagic");
        } else if (currentDepth < 6000) {
            changeZone("Abyssopelagic");
        } else {
            changeZone("Hadalpelagic");
        }


        var recordClosest = 10000;

        if (!jumping) {
            $(".event-container").each(function () {
                var eventDepth = $(this).attr("data-depth");
                var distance = eventDepth - currentDepth;
                if (distance > 0 && distance < recordClosest) {
                    recordClosest = distance;
                    nearestBelow = $(this);
                    console.log($(nearestBelow).find("h2").html());
                }
            });
        }

    });

    function changeZone(zoneName) {
        if (zoneName !== currentZone) {
            $("#current-zone").fadeOut("fast", function () {
                $("#current-zone").html(zoneName);
                $("#current-zone").fadeIn();
            });
            currentZone = zoneName;
        }

    }

    var controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
            triggerElement: "#mesopelagic",
            duration: 500
        })
        .setPin("#test-message")
        .addTo(controller);

});