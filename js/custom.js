/*global $, document*/

(function($) {
  "use strict";

  var cover = $(".text-cover"),
    text = $(".sec-text"),
    fadingLeft = $(".fadding-left"),
    fadingUp = $(".fadding-up"),
    loader = $(".loader "),
    btnn = $(".nav-link , .btn1"),
    controller = new ScrollMagic.Controller(),
    tl = new TimelineMax(),
    tl2 = new TimelineMax(),
    tl3 = new TimelineMax(),
    tl4 = new TimelineMax(),
    tl5 = new TimelineMax({ paused: true }),
    scene = new ScrollMagic.Scene({
      triggerElement: ".sec-1",
      tweenChanges: false
    })
      .addTo(controller)
      .setTween(tl)

      .reverse(false),
    scene2 = new ScrollMagic.Scene({
      triggerElement: ".how-it",
      tweenChanges: false
    })
      .addTo(controller)
      .setTween(tl2)

      .reverse(false),
    scene3 = new ScrollMagic.Scene({
      triggerElement: ".sec-blog",
      tweenChanges: false
    })
      .addTo(controller)
      .setTween(tl3)

      .reverse(false);

  tl.staggerTo(cover, 0.1, { scaleX: 1, delay: 0.3, ease: Power4.linear }, 0.3)
    .staggerTo(
      cover,
      0.000002,
      { css: { transformOrigin: " right" }, ease: Power4.linear },
      0.3
    )
    .staggerTo(cover, 0.2, { css: { scaleX: 0 }, ease: Power4.linear }, 0.0001)

    .from(text, 0.7, { autoAlpha: 0, ease: Power4.easeInOut }, 0.6);

  // fading

  tl2.staggerFrom(
    fadingLeft,
    1,
    { x: -500, autoAlpha: 0, ease: Power1.easeInOut },
    0.2
  );

  tl3.staggerFrom(
    fadingUp,
    1,
    { y: 200, autoAlpha: 0, ease: Power1.easeInOut },
    0.2
  );

  //loader

  tl4.to(loader, 1, { css: { height: 0 }, ease: Power4.easeInOut }, 0.6);

  btnn.click(function() {
    tl4.restart();
  });

  // type writer

  new TypeIt("#root", {
    strings: [
      "   <span  >  Experience the beauty,  </span> ",
      " Of ordering homemade meals with just a tap."
    ],
    speed: 70,
    breakLines: false,
    autoStart: false,
    loop: true
  });

  // mving

  var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

  function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    translate = "translate(" + x + "px, " + y + "px) scale(1.1)";

    $(".bg").css({
      "-webit-transform": translate,
      "-moz-transform": translate,
      transform: translate
    });

    window.requestAnimationFrame(moveBackground);
  }

  $(window).on("mousemove click", function(e) {
    var lMouseX = Math.max(
      -100,
      Math.min(100, $(window).width() / 2 - e.clientX)
    );
    var lMouseY = Math.max(
      -100,
      Math.min(100, $(window).height() / 2 - e.clientY)
    );
    lFollowX = (20 * lMouseX) / 100;
    lFollowY = (10 * lMouseY) / 100;
  });

  moveBackground();

  // plus button

  $(".btn-number").click(function(e) {
    e.preventDefault();

    fieldName = $(this).attr("data-field");
    type = $(this).attr("data-type");
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == "minus") {
        if (currentVal > input.attr("min")) {
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == input.attr("min")) {
          $(this).attr("disabled", true);
        }
      } else if (type == "plus") {
        if (currentVal < input.attr("max")) {
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr("max")) {
          $(this).attr("disabled", true);
        }
      }
    } else {
      input.val(0);
    }
  });
  $(".input-number").focusin(function() {
    $(this).data("oldValue", $(this).val());
  });
  $(".input-number").change(function() {
    minValue = parseInt($(this).attr("min"));
    maxValue = parseInt($(this).attr("max"));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr("name");
    if (valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr(
        "disabled"
      );
    } else {
      alert("Sorry, the minimum value was reached");
      $(this).val($(this).data("oldValue"));
    }
    if (valueCurrent <= maxValue) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr(
        "disabled"
      );
    } else {
      alert("Sorry, the maximum value was reached");
      $(this).val($(this).data("oldValue"));
    }
  });
  $(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });
})(jQuery);
