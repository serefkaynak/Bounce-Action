let divPositionX = window.innerWidth / 2;
let divPositionY = window.innerHeight / 2;

let xChange = 0;
let yChange = 0;

//Second Ball Start 
let secondDivPositionX = Math.random() * window.innerWidth;
let secondDivPositionY = Math.random() * window.innerHeight;
let secondXChange = (Math.random() - 0.5) * 100;
let secondYChange = (Math.random() - 0.5) * 100;

let secondTopDiv = document.getElementById("secondTop");
//Second Ball Finish

//Third Ball Start 
let thirdDivPositionX = Math.random() * window.innerWidth;
let thirdDivPositionY = Math.random() * window.innerHeight;
let thirdXChange = (Math.random() - 0.5) * 200;
let thirdYChange = (Math.random() - 0.5) * 200;

let thirdTopDiv = document.getElementById("thirdTop");
//Third Ball Finish 


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

const WIND_THRESHOLD = 30;
const SECOND_BALL_TRESHOLD = 40;
const THIRD_BALL_TRESHOLD = 50;

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

  // Eğer SECOND_BALL_TRESHOLD aşılırsa, ikinci top rastgele hareket eder
  if (Math.abs(xChange) > SECOND_BALL_TRESHOLD || Math.abs(yChange) > SECOND_BALL_TRESHOLD) {
    // İkinci topun sınırları kontrolü
    if (secondDivPositionY < 98 || secondDivPositionY > window.innerHeight - 78) {
        secondYChange *= -1;
    }
    if (secondDivPositionX < 28 || secondDivPositionX > window.innerWidth - 78) {
        secondXChange *= -1;
    
      }

    secondDivPositionX += secondXChange;
    secondDivPositionY += secondYChange;

    secondTopDiv.style.top = secondDivPositionY + "px";
    secondTopDiv.style.left = secondDivPositionX + "px";
}

  // Eğer THIRD_BALL_TRESHOLD aşılırsa, üçüncü top rastgele hareket eder
  if (Math.abs(xChange) > THIRD_BALL_TRESHOLD || Math.abs(yChange) > THIRD_BALL_TRESHOLD) {
    // İkinci topun sınırları kontrolü
    if (thirdDivPositionY < 98 || thirdDivPositionY > window.innerHeight - 78) {
      thirdYChange *= -1;
    }
    if (thirdDivPositionX < 28 || thirdDivPositionX > window.innerWidth - 78) {
      thirdXChange *= -1;
    
      }

      thirdDivPositionX += thirdXChange;
      thirdDivPositionY += thirdYChange;


      thirdTopDiv.style.top = thirdDivPositionY + "px";
      thirdTopDiv.style.left = thirdDivPositionX + "px";
}


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
