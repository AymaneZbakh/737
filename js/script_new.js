//Part 1: INTERACTIONS
$(".close-button").on("click", function() {
  if ($(".alternative-close").is(":visible")) {
    noFlowSelected();
  }
  hideOverlay();
  hideLayer();
  $(this)
    .parent()
    .fadeOut("slow");
  if ($("#LimitationsBtn").is(".active")) {
    $("#LimitationsBtn").removeClass("active");
  }

  return false;
});

$("#btnpnf1").on("click", function() {
  showEl("PopUp-PreliminaryExtra");
});

$(function() {
  $(".flow-button").on("click", function() {
    closeOthers();
    return false;
  });
});

/** arrow function **/
$(".left-arrow").click(function() {
  if (dragCheck == false) {
    if (
      $(this)
        .parent()
        .css("left") == "0px"
    ) {
      $(this)
        .parent()
        .animate(
          {
            left: "-290px" //moves left
          },
          800
        );
      $(this).css("background-position", "3px center");
    } else if (
      $(this)
        .parent()
        .css("left") == "-290px"
    ) {
      $(this)
        .parent()
        .animate(
          {
            left: "0px" //moves right
          },
          800
        );
      $(this).css("background-position", "-35px center");
    }
  }
});

/** continue button - show MENU **/
$("#welcome-button").on("click", function() {
  $(".left-menu").show();
  $(".left-menu").animate(
    {
      left: "0px" //moves right
    },
    800
  );
});

/** menu item click **/
$(".menu-item").on("click", function() {
  //if button disabled
  if ($(this).is(".disabled, .active")) {
    return false;
  }
  //header text
  // var headerText = $(this).data("flowname");
  // $("#header-text span").text(headerText);

  var krpano = document.getElementById("krpanoSWFObject");
  //closeOthers();
  $("#PfBtn").removeClass("active");
  $("#PnfBtn").removeClass("active");
  $("#PfBtn").addClass("disabled");
  $("#PnfBtn").addClass("disabled");
  $("#SeeFlowBtn").removeClass("active");
  // $('#ExtraBtn').removeClass('active');

  // $('#PfBtn span').text("");
  // $('#PnfBtn span').text("");

  //hide map if...
  if ($(".left-menu").css("left") == "0px") {
    $(".left-menu").show();
    $(".left-menu").animate(
      {
        left: "-290px" //moves left
      },
      800
    );
    $(".left-arrow").css("background-position", "3px center");
  }

  $(".menu-item").removeClass("active");
  $(this).addClass("active");

  if ($(this).data("type") == "popup") {
    var popUpFlow = $(this).data("popup");
    showEl(popUpFlow);
    //setTimeout(showOverlay,50);
    showOverlay();

    $("#SeeFlowBtn").addClass("disabled");
    $("#ExtraBtn").addClass("disabled");
    $("#ExtraBtn").removeClass("active");
    $("#notes-panel").fadeOut("slow");

    krpano.call("hide-hotspots()");
    var headerText = $(this).data("flowname");
    $("#header-text span").text(headerText);
  } else if ($(this).data("type") == "hotspots") {
    $("#SeeFlowBtn").removeClass("disabled");
    $("#ExtraBtn").removeClass("disabled");
    var hotspotsName = $(this).data("hotspots");
    krpano.set("hotspotsName", hotspotsName);
    krpano.call("hotspots-test()");
    var headerText = $(this).data("flowname");
    $("#header-text span").text(headerText);
    if ($(this).data("startmessage") != null) {
      showEl($(this).data("startmessage"));
      //setTimeout(showOverlay,50);
      showOverlay();
    }
    getExtraText();
  } else if ($(this).data("type") == "options-CaptainOrOfficer") {
    $("#SeeFlowBtn").addClass("disabled");
    $("#ExtraBtn").addClass("disabled");
    $("#ExtraBtn").removeClass("active");
    $("#notes-panel").fadeOut("slow");

    krpano.call("hide-hotspots()");
    closeOthers();

    showEl("CaptainOrOfficer");
    var headerText = $(this).data("flowname");
    $("#header-text span").text(headerText);
    var popupHeaderText = $(this).data("flowname");
    $("#CaptainOrOfficer h1 span").text(popupHeaderText);
    showOverlay();
  } else if ($(this).data("type") == "options-PfOrPnf") {
    $("#SeeFlowBtn").addClass("disabled");
    $("#ExtraBtn").addClass("disabled");
    $("#ExtraBtn").removeClass("active");
    $("#notes-panel").fadeOut("slow");

    krpano.call("hide-hotspots()");
    closeOthers();
    showEl("PfOrPnf");
    var headerText = $(this).data("flowname");
    $("#header-text span").text(headerText);
    var popupHeaderText = $(this).data("flowname");
    $("#PfOrPnf h1 span").text(popupHeaderText);
  } else if ($(this).data("type") == "options-StartMessage") {
    $("#SeeFlowBtn").addClass("disabled");
    $("#ExtraBtn").addClass("disabled");
    $("#ExtraBtn").removeClass("active");
    $("#notes-panel").fadeOut("slow");

    krpano.call("hide-hotspots()");
    closeOthers();
    var startText = $(this).data("hotspots");
    showEl(startText);
    var headerText = $(this).data("flowname");
    $("#header-text span").text(headerText);
    showOverlay();
  } else {
    return false;
  }
});

/** Pilot Flying / Pilot monitoring button **/
$("#PfOrPnf .button-class").on("click", function() {
  var krpano = document.getElementById("krpanoSWFObject");
  $("#PfOrPnf").fadeOut("slow");
  $("#SeeFlowBtn").removeClass("disabled");
  $("#ExtraBtn").removeClass("disabled");

  $("#PfBtn").removeClass("disabled");
  $("#PnfBtn").removeClass("disabled");

  // $('#PfBtn span').text("PF");
  // $('#PnfBtn span').text("PM");

  $(this).addClass("active-delay");

  setTimeout(function() {
    $("#PfBtn2").removeClass("active-delay");
    $("#PnfBtn2").removeClass("active-delay");
  }, 2000);

  var itemIndex = $(".menu-item.active").index();
  var hotspotsName = $(".main-menu .menu-item")
    .eq(itemIndex)
    .data("hotspots");
  krpano.set("hotspotsName", hotspotsName);
  getExtraText();

  if (this.id == "PfBtn2") {
    // var itemIndex = $( '.menu-item.active' ).index();
    var hotspotsName =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("hotspots") + "-pf";

    $("#PnfBtn").removeClass("active");
    $("#PfBtn").addClass("active");
    $("#PfBtn").effect("highlight", { color: "#009fe3" }, 1500);

    var headerText =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("flowname") + " - PF";
    $("#header-text span").text(headerText);
  } else if (this.id == "PnfBtn2") {
    // var itemIndex = $( '.menu-item.active' ).index();
    var hotspotsName =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("hotspots") + "-pm";

    $("#PfBtn").removeClass("active");
    $("#PnfBtn").addClass("active");
    $("#PnfBtn").effect("highlight", { color: "#009fe3" }, 1500);

    var headerText =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("flowname") + " - PM";
    $("#header-text span").text(headerText);
  }

  krpano.set("hotspotsName", hotspotsName);
  krpano.call("hotspots-test()");

  if ($("#SeeFlowBtn").hasClass("active")) {
    var SeeFlowName = $(".menu-item.active").data("hotspots");
    showEl(SeeFlowName);
  }
});

/** Pilot Flying / Pilot monitoring button  - CAPTAIN OR OFFICER**/
$("#CaptainOrOfficer .button-class").on("click", function() {
  var krpano = document.getElementById("krpanoSWFObject");
  $("#CaptainOrOfficer").fadeOut("slow");
  $("#SeeFlowBtn").removeClass("disabled");
  $("#ExtraBtn").removeClass("disabled");

  $("#PfBtn").removeClass("disabled");
  $("#PnfBtn").removeClass("disabled");

  // $('#PfBtn span').text("CAPT");
  // $('#PnfBtn span').text("F/O");

  $(this).addClass("active-delay");

  setTimeout(function() {
    $("#CaptainBtn").removeClass("active-delay");
    $("#OfficerBtn").removeClass("active-delay");
  }, 2000);

  var itemIndex = $(".menu-item.active").index();
  var hotspotsName = $(".main-menu .menu-item")
    .eq(itemIndex)
    .data("hotspots");
  krpano.set("hotspotsName", hotspotsName);
  getExtraText();

  if (this.id == "CaptainBtn") {
    //var itemIndex = $( '.menu-item.active' ).index();
    var hotspotsName =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("hotspots") + "-cap";

    $("#PnfBtn").removeClass("active");
    $("#PfBtn").addClass("active");
    $("#PfBtn").effect("highlight", { color: "#009fe3" }, 1500);

    var headerText =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("flowname") + " - CAPT";
    $("#header-text span").text(headerText);

    var startMessageCpt = $(".main-menu .menu-item")
      .eq(itemIndex)
      .data("startmessage-cpt");
    if (startMessageCpt != null) {
      showEl(startMessageCpt);
    } else {
      hideOverlay();
    }
  } else if (this.id == "OfficerBtn") {
    //var itemIndex = $( '.menu-item.active' ).index();
    var hotspotsName =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("hotspots") + "-off";

    $("#PfBtn").removeClass("active");
    $("#PnfBtn").addClass("active");
    $("#PnfBtn").effect("highlight", { color: "#009fe3" }, 1500);

    var headerText =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("flowname") + " - F/O";
    $("#header-text span").text(headerText);

    var startMessageFo = $(".main-menu .menu-item")
      .eq(itemIndex)
      .data("startmessage-fo");
    if (startMessageFo != null) {
      showEl(startMessageFo);
    } else {
      hideOverlay();
    }
  }

  krpano.set("hotspotsName", hotspotsName);
  krpano.call("hotspots-test()");

  if ($("#SeeFlowBtn").hasClass("active")) {
    var SeeFlowName = $(".menu-item.active").data("hotspots");
    showEl(SeeFlowName);
  }
});

/** Pilot Flying / Pilot monitoring button  - CAPTAIN OR OFFICER**/
$(".optionStartMessage .button-class").on("click", function() {
  var krpano = document.getElementById("krpanoSWFObject");

  $(".optionStartMessage").fadeOut("slow");
  $("#SeeFlowBtn").removeClass("disabled");
  $("#ExtraBtn").removeClass("disabled");

  $("#PfBtn").removeClass("disabled");
  $("#PnfBtn").removeClass("disabled");

  // $('#PfBtn span').text("CAPT");
  // $('#PnfBtn span').text("F/O");

  $(this).addClass("active-delay");

  setTimeout(function() {
    $(".CaptainBtn2").removeClass("active-delay");
    $(".OfficerBtn2").removeClass("active-delay");
  }, 2000);

  var itemIndex = $(".menu-item.active").index();
  var hotspotsName = $(".main-menu .menu-item")
    .eq(itemIndex)
    .data("hotspots");
  krpano.set("hotspotsName", hotspotsName);
  getExtraText();
  if ($(this).hasClass("CaptainBtn2")) {
    //var itemIndex = $( '.menu-item.active' ).index();
    var hotspotsName =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("hotspots") + "-cap";

    $("#PnfBtn").removeClass("active");
    $("#PfBtn").addClass("active");
    $("#PfBtn").effect("highlight", { color: "#009fe3" }, 1500);

    var headerText =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("flowname") + " - CAPT";
    $("#header-text span").text(headerText);

    var startMessageCpt = $(".main-menu .menu-item")
      .eq(itemIndex)
      .data("startmessage-cpt");
    if (startMessageCpt != null) {
      showEl(startMessageCpt);
      showOverlay();
    } else {
      hideOverlay();
    }
  } else if ($(this).hasClass("OfficerBtn2")) {
    //var itemIndex = $( '.menu-item.active' ).index();
    var hotspotsName =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("hotspots") + "-off";

    $("#PfBtn").removeClass("active");
    $("#PnfBtn").addClass("active");
    $("#PnfBtn").effect("highlight", { color: "#009fe3" }, 1500);

    var headerText =
      $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("flowname") + " - F/O";
    $("#header-text span").text(headerText);

    var startMessageFo = $(".main-menu .menu-item")
      .eq(itemIndex)
      .data("startmessage-fo");
    if (startMessageFo != null) {
      showEl(startMessageFo);
      showOverlay();
    } else {
      hideOverlay();
    }
  }
  krpano.set("hotspotsName", hotspotsName);
  krpano.call("hotspots-test()");

  if ($("#SeeFlowBtn").hasClass("active")) {
    var SeeFlowName = $(".menu-item.active").data("hotspots");
    showEl(SeeFlowName);
  }
});

/** PF button **/
$("#PfBtn").on("click", function() {
  if ($("#PfBtn").is(".disabled, .active")) {
    return false;
  }

  if ($(".main-menu .menu-item").hasClass("active")) {
    var itemIndex = $(".menu-item.active").index();

    closeOthers();

    // captain
    if ($("#PfBtn span").text() == "CAPT") {
      var headerText =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("flowname") + " - CAPT";
      $("#header-text span").text(headerText);

      var hotspotsName =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("hotspots") + "-cap";

      if ($("#SeeFlowBtn").hasClass("active")) {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-cap";
        showEl(SeeFlowName);
      }

      var startMessageCpt = $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("startmessage-cpt");
      if (startMessageCpt != null) {
        showEl(startMessageCpt);
        showOverlay();
      }
    }
    // PF
    else if ($("#PfBtn span").text() == "PF") {
      var headerText =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("flowname") + " - PF";
      $("#header-text span").text(headerText);

      var hotspotsName =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("hotspots") + "-pf";

      if ($("#SeeFlowBtn").hasClass("active")) {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-pf";
        showEl(SeeFlowName);
      }
    }

    var krpano = document.getElementById("krpanoSWFObject");
    krpano.set("hotspotsName", hotspotsName);
    krpano.call("hotspots-test()");
    $("#PnfBtn").removeClass("active");
    $("#PfBtn").addClass("active");
  }
});

/** PNF button **/
$("#PnfBtn").on("click", function() {
  if ($("#PnfBtn").is(".disabled, .active")) {
    return false;
  }

  if ($(".main-menu .menu-item").hasClass("active")) {
    var itemIndex = $(".menu-item.active").index();

    closeOthers();

    // FIRST OFFICER
    if ($("#PnfBtn span").text() == "F/O") {
      var headerText =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("flowname") + " - F/O";
      $("#header-text span").text(headerText);

      var hotspotsName =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("hotspots") + "-off";

      if ($("#SeeFlowBtn").hasClass("active")) {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-off";
        showEl(SeeFlowName);
      }

      var startMessageFo = $(".main-menu .menu-item")
        .eq(itemIndex)
        .data("startmessage-fo");
      if (startMessageFo != null) {
        showEl(startMessageFo);
        showOverlay();
      }
    }
    // PNF
    else if ($("#PnfBtn span").text() == "PM") {
      var headerText =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("flowname") + " - PM";
      $("#header-text span").text(headerText);

      var hotspotsName =
        $(".main-menu .menu-item")
          .eq(itemIndex)
          .data("hotspots") + "-pm";

      if ($("#SeeFlowBtn").hasClass("active")) {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-pm";
        showEl(SeeFlowName);
      }
    }

    var krpano = document.getElementById("krpanoSWFObject");
    krpano.set("hotspotsName", hotspotsName);
    krpano.call("hotspots-test()");
    $("#PfBtn").removeClass("active");
    $("#PnfBtn").addClass("active");
  }
});

/** see flow **/

$("#SeeFlowBtn").on("click", function() {
  if ($(this).is(".disabled")) {
    return false;
  } else if ($(this).is(".active")) {
    $(this).removeClass("active");
    closeOthers();
  } else {
    if ($("#PfBtn").is(".active")) {
      if ($("#PfBtn span").text() == "CAPT") {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-cap";
      }
      // PNF
      else if ($("#PfBtn span").text() == "PF") {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-pf";
      }

      showEl(SeeFlowName);

      showOverlay();
      $(this).addClass("active");
    } else if ($("#PnfBtn").is(".active")) {
      // FIRST OFFICER
      if ($("#PnfBtn span").text() == "F/O") {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-off";
      }
      // PNF
      else if ($("#PnfBtn span").text() == "PM") {
        var SeeFlowName = $(".menu-item.active").data("hotspots") + "-pm";
      }
      showEl(SeeFlowName);

      $(this).addClass("active");
      showOverlay();
    } else {
      var SeeFlowName = $(".menu-item.active").data("hotspots");
      showEl(SeeFlowName);

      $(this).addClass("active");
      showOverlay();
    }
  }
  return false;
});

/** extra notes **/

$("#ExtraBtn").on("click", function() {
  if ($(this).is(".disabled")) {
    return false;
  } else if ($(this).is(".active")) {
    $(this).removeClass("active");
    $("#notes-panel").fadeOut("slow");
  } else {
    showEl("notes-panel");

    $(this).addClass("active");
  }
  return false;
});

/** LIMITATIONS NAVIGATION **/
$(".bookmark-wrap").on("click", function() {
  if ($(this).is(".activated")) {
    $(this).removeClass("activated");
    $(".book-dropdown").fadeOut("slow");
  } else {
    $(".book-dropdown").fadeIn("slow");
    $(this).addClass("activated");
  }
});

//Part 2: FUNCTIONS
function getExtraText() {
  var krpano = document.getElementById("krpanoSWFObject");
  krpano.call("get-transcript-text();");
  var transcriptText = krpano.get("hotspot[get(notesHotspot)].transcript");
  $("#transcript-text").html(transcriptText);
}

function hideLayer() {
  $("#SeeFlowBtn").removeClass("active");
}

function noFlowSelected() {
  showMenu();
  $("#header-text span").text("NO FLOW SELECTED");
  var krpano = document.getElementById("krpanoSWFObject");
  krpano.call("hide-hotspots()");
  $("#SeeFlowBtn").addClass("disabled");
  $("#SeeFlowBtn").removeClass("active");
  $("#ExtraBtn").addClass("disabled");
  $("#ExtraBtn").removeClass("active");
  $(".main-menu .menu-item").removeClass("active");
  $("#notes-panel").fadeOut("slow");
}

function showMenu() {
  if ($(".left-menu").css("left") == "-290px") {
    $(".left-arrow").css("background-position", "-35px center");
    $(".left-menu").show();
    $(".left-menu").animate(
      {
        left: "0px" //moves right
      },
      800
    );
  }
}

var dragCheck = false;
$(".left-menu").draggable({
  axis: "x",
  containment: "#menu-wrapper",
  scroll: false,
  handle: ".left-arrow",
  distance: "5",
  drag: function() {
    dragCheck = true;
  },
  stop: function() {
    if (parseInt($(".left-menu").css("left")) >= "-145") {
      $(".left-menu").animate(
        {
          left: "0px" //moves right
        },
        600
      );
      $(".left-arrow").css("background-position", "-35px center");
    } else if (parseInt($(".left-menu").css("left")) < "-145") {
      $(".left-menu").animate(
        {
          left: "-290px" //moves left
        },
        600
      );
      $(".left-arrow").css("background-position", "3px center");
    }
    setTimeout(function() {
      dragCheck = false;
    }, 1);
  }
});

function showEl(id) {
  if (!$(".alternative-close").is(":visible")) {
    //closeOthers();
  }
  var elem = document.getElementById(id);
  $(elem).fadeIn("slow");
}

function showOverlay() {
  $(".overlay").fadeIn("slow");
}

function hideOverlay() {
  $(".overlay").fadeOut("slow");
}

function closeOthers() {
  if ($(".alternative-close").is(":visible")) {
    noFlowSelected();
  }
  hideOverlay();

  $(".popup-class").fadeOut("slow");

  if ($("#SeeFlowBtn").is(".active")) {
    $("#SeeFlowBtn").removeClass("active");
  }

  if ($("#LimitationsBtn").is(".active")) {
    $("#LimitationsBtn").removeClass("active");
  }
}

//Part 3: GENERAL

//if ('addEventListener' in document) {
//    document.addEventListener('DOMContentLoaded', function() {
//        FastClick.attach(document.body);
//    }, false);
//}

$("img").retina({
  suffix: "@2x",
  checkIfImageExists: true
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    closeOthers();
    hideLayer();
  } // esc
});

$("#LimitationsBtn").on("click", function() {
  if (!$("#LimitationsBtn").hasClass("active")) {
    if ($("#SeeFlowBtn").hasClass("active")) {
      $("#SeeFlowBtn").removeClass("active");
    }
    closeOthers();
    $("#LimitationsBtn").addClass("active");
    showEl("Limitations");
    showOverlay();
  }
});

/** continue button - show MENU **/
//	$('#LimitationsBtn').on('click', function() {
//		if($(this).is('.disabled'))
//		{return false;}
//		else if($(this).is('.active'))
//		{
//			$(this).removeClass('active');
//			closeOthers();
//		}
//		else
//		{
//			showEl("Limitations");
//
//			$(this).addClass('active');
//			showOverlay();
//		}
//	});

/** LIMITATIONS NAVIGATION **/
$(".bookmark-wrap").on("click", function() {
  if ($(this).is(".active")) {
    $(this).removeClass("active");
    $(".book-dropdown").fadeOut("slow");
  } else {
    $(".book-dropdown").fadeIn("slow");
    $(this).addClass("active");
  }
});

$(function() {
  $(".tabs-ui").tabs();
  $(".tabs-ui").each(function() {
    var count = $(this).find("> ul > li").length;
    var li_width = 100 / count;
    $(this)
      .find("> ul > li")
      .css("width", li_width + "%");
  });

  $("td.name")
    .parent("tr")
    .css("position", "relative"); //fix for tables with dots.......
});
