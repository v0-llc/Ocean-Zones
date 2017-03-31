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

    var nearestBelow = $(".event-container").first();
    var nearestAbove = $(nearestBelow).prev();

    $(".down-arrow").click(function () {
        jumping = true;
        $("html, body").animate({
            scrollTop: $(nearestBelow).offset().top - $(window).innerHeight() * 0.5
        }, 3000, function () {
            jumping = false;
        });
    });
    $(".up-arrow").click(function () {
        jumping = true;
        $("html, body").animate({
            scrollTop: $(nearestAbove).offset().top - $(window).innerHeight() * 0.5
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

        var currentDepth = $("body").scrollTop() * 2 * px2cmConst + 4;

        $("#depth-info").html(Math.floor(currentDepth) + "m");

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


        var recordClosest = 10000;

        if (!jumping) {
            $(".event-container").each(function () {
                var eventDepth = $(this).attr("data-depth");
                var distance = eventDepth - currentDepth;

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

    });

    function changeZone(zoneName) {
        if (zoneName !== currentZone) {
            $("#current-zone").fadeOut("fast", function () {
                $("#current-zone").html(zoneName);
                $("#current-zone").fadeIn();
            });
            
            $("#zone-info").fadeOut("fast", function () {
                $("#zone-info").html($("#" + zoneName).find("div").html());
                $("#zone-info").fadeIn();
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