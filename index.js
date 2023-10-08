let divPositionX = window.innerWidth / 2;
let divPositionY = window.innerHeight / 2;

let xChange = 0;
let yChange = 0;

document.addEventListener("click", function (e) {
  contextDiv.classList.add("hide");
});

const topDiv = document.getElementById("top");
const borderDiv = document.getElementById("border");

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowDown") {
    yChange++;
  } else if (e.code === "ArrowUp") {
    yChange--;
  } else if (e.code === "ArrowLeft") {
    xChange--;
  } else if (e.code === "ArrowRight") {
    xChange++;
  }
});

const WIND_THRESHOLD = 1;

setInterval(() => {
  if (divPositionY < 98 || divPositionY > window.innerHeight - 78) { // 50 + 20 + 8= 78
    yChange *= -1;
  }
  if (divPositionX < 28 || divPositionX > window.innerWidth - 78) { // 50 + 20 + 8= 78
    xChange *= -1;
  }

  // Sürtünme kaynaklı hız azalması
  if (yChange) yChange = yChange - yChange * 0.01;
  if (xChange) xChange = xChange - xChange * 0.01;

  // Durmaya yakın durdur
  if (Math.abs(xChange) < 0.1) xChange = 0;
  if (Math.abs(yChange) < 0.1) yChange = 0;

  divPositionX += xChange;
  divPositionY += yChange;

  topDiv.style.top = divPositionY + "px";
  topDiv.style.left = divPositionX + "px";

  // Rüzgar efekti kontrolü
  if (Math.abs(xChange) > WIND_THRESHOLD || Math.abs(yChange) > WIND_THRESHOLD) {
    topDiv.classList.add("windEffect");

  };

}, 100);




const contextDiv = document.getElementById("context-menu");

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  console.log("event > ", e);
  contextDiv.style.top = e.pageY + "px";
  contextDiv.style.left = e.pageX + "px";
  contextDiv.classList.remove("hide");
});

document.getElementById("stop-ball").addEventListener("click", (e) => {
  e.preventDefault();
  xChange = 0;
  yChange = 0;
});

document.getElementById("reset-position").addEventListener("click", (e) => {
  e.preventDefault();
  divPositionX = window.innerWidth / 2;
  divPositionY = window.innerHeight / 2;
});
