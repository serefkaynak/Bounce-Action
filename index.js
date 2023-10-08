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

const WIND_THRESHOLD = 40;

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

  // Topun backroundunu değiştirmek
function getRandomDegree() {
  return Math.floor(Math.random() * 361);
}
let randomDeg = getRandomDegree();

// Bu dereceyi kullanarak #top.windeffect background'u ayarla
let topWindEffectElement = document.querySelector("#top.windEffect");
if (topWindEffectElement) {
    topWindEffectElement.style.background = `linear-gradient(${randomDeg}deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 54%, rgba(252,176,69,1) 100%)`;
    
    //body backroundunu da aynı değiştiriyoruz.
    document.body.style.background = `linear-gradient(${randomDeg}deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 54%, rgba(252,176,69,1) 100%)`;

  }

  // Rüzgar efekti kontrolü
  if (Math.abs(xChange) > WIND_THRESHOLD || Math.abs(yChange) > WIND_THRESHOLD) {
    topDiv.classList.add("windEffect");
    

  } else {
    topDiv.classList.remove("windEffect");
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
