import * as generator from "./generator.js";

function init() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("ui init");
      resolve();
    }, 100);
  });
}

interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrict({
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    })
  ],
  // enable autoScroll
  autoScroll: true,
  onstart: dragStartListener,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: dragEndListener
});

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact(".dropzone").dropzone({
  // only accept elements matching this CSS selector
  accept: ".draggable",
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.05,

  // listen for drop related events:

  ondropactivate: function(event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function(event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
  },
  ondragleave: function(event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
  },
  ondrop: function(event) {
    var real = event.relatedTarget.classList.contains("real");
    var files = document.querySelectorAll(".files");
    if (real) {
      event.target.classList.add("stamped-real");
      event.relatedTarget.style.transform = "unset";
      event.target.style.transform = "unset";
      //   for (var i = 2; i >= 0; i--) {
      //     files[i].setAttribute("data-x", 0);
      //     files[i].setAttribute("data-y", 0);
      //   }
    } else {
      event.target.classList.add("stamped-fake");
      event.relatedTarget.style.transform = "unset";
      event.target.style.transform = "unset";
    }

    if (generator.next(real)) {
      setTimeout(() => {
        for (var i = 2; i >= 0; i--) {
          files[i].classList.remove("loop-around");
          files[i].classList.add("retract");
        }
      }, 100);

      setTimeout(() => {
        console.log("...");
        // all good and we've got another folder
        for (var i = 2; i >= 0; i--) {
          files[i].classList.add("loop-around");
          files[i].classList.remove("retract");
          files[i].style.transform = "unset";
          files[i].setAttribute("data-x", 0);
          files[i].setAttribute("data-y", 0);
        }
        event.target.classList.remove("stamped-real");
        event.target.classList.remove("stamped-fake");

        // @lulu: change the 3000 to whatever you think the delay
        // for stuff coming back on to the screen should be
      }, 1000);
    } else {
      // that was the last folder; we need to show the total
      // @lulu: here's where we'd show a modal with the results
      console.dir(generator.results);
    }
  },
  ondropdeactivate: function(event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  }
});

interact(".drag-drop").draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrict({
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    })
  ],
  autoScroll: true,
  // dragMoveListener from the dragging demo above
  onmove: dragMoveListener
});

function dragStartListener(event) {
  var target = event.target;
  var shadow = target.children[1];
  fade(shadow);
  target.style.filter = "drop-shadow(0 0 500px #4b415767)";
  event.target.classList.remove("loop-around");
  event.target.setAttribute("data-x", 0);
  event.target.setAttribute("data-y", 0);
}

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
  target.style.zIndex = "100";
}

function dragEndListener(event) {
  var target = event.target;
  var shadow = target.children[1];
  target.style.zIndex = "0";
  unfade(shadow);
  target.style.filter = "initial";
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

function fade(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function() {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 2);
}

function unfade(element) {
  var op = 0.1; // initial opacity
  element.style.display = "block";
  var timer = setInterval(function() {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 0);
}

export { init };
