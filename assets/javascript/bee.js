document.addEventListener("DOMContentLoaded", function(event) {
  var frog = document.querySelector(".bee");
  var container = document.documentElement; // Thay container thành phần chứa con ếch

  function getRandomPosition() {
    var x = Math.floor(Math.random() * (container.offsetWidth - frog.offsetWidth));
    var y = Math.floor(Math.random() * (container.offsetHeight - frog.offsetHeight));
    return [x, y];
  }

  function moveFrog() {
    var newPosition = getRandomPosition();
    var newTop = newPosition[1] + "px";
    var newLeft = newPosition[0] + "px";

    frog.style.top = newTop;
    frog.style.left = newLeft;
  }

  setInterval(moveFrog, 2000); // Thay đổi vị trí con ếch sau mỗi 2 giây
});