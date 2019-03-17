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
  onstart: function(event) {
    var target = event.target;
    fade(target.children[1]);
  },

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function(event) {
    // var textEl = event.target.querySelector("p");
    // textEl &&
    //   (textEl.textContent =
    //     "moved a distance of " +
    //     Math.sqrt(
    //       (Math.pow(event.pageX - event.x0, 2) +
    //         Math.pow(event.pageY - event.y0, 2)) |
    //         0
    //     ).toFixed(2) +
    //     "px");
    var target = event.target;
    target.style.zIndex = "0";
    unfade(target.children[1]);
  }
});

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
  }, 5);
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
  }, 5);
}

export { init };
