let step1 = 700;
let step2 = 1700;
let step3 = 1000;
let step4 = 2100;
let step5 = 2450;
let step6 = 3500;

let m1024 = window.matchMedia("(max-width:1024px)");
let m825 = window.matchMedia("(max-width:825px)");
let m670 = window.matchMedia("(max-width:670px)");

let reviseSteps = () => {
  if (m670.matches) {
    // console.log("670 matched");
    step1 = 700;
    step2 = 1700;
    step3 = 1500;
    step4 = 2500;
    step5 = 0;
    step6 = document.documentElement.scrollHeight;
  } else if (m825.matches) {
    // console.log("825 matched");
    step1 = 388;
    step2 = 1700;
    step3 = 892;
    step4 = 2100;
    step5 = 2450;
    step6 = 3500;
  } else if (m1024.matches) {
    step5 = 1600;
    step6 = 3500;
  } else {
    // console.log("no matched");
    step1 = 700;
    step2 = 1700;
    step3 = 1000;
    step4 = 2100;
    step5 = 2450;
    step6 = 3500;
  }
  document.onscroll = () => {
    animate();
  };
};

reviseSteps();

// smart product suite

// let li1000 = document.querySelectorAll("div.smart-prod-desc.right ul li");
let li1000 = document.querySelector("div.smart-prod-desc.right").children;
// let li2000 = document.querySelectorAll("div.smart-prod-desc.left ul li");
let li2000 = document.querySelector("div.smart-prod-desc.left").children;

let flt = document.querySelector(".feature.left.top");
let frt = document.querySelector(".feature.right.top");
let flb = document.querySelector(".feature.left.bottom");
let frb = document.querySelector(".feature.right.bottom");

let featureArray = [flt, frt, flb, frb];

let mediaList = document.querySelector(".media-holder");
let dotList = document.querySelector(".dot-list");

let animateLi = (li) => {
  li.style.transform = "translate3d(0, 0, 0)";
  li.style.opacity = "1";
};

let showList = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      animateLi(arr[i]);
    }, i * 100);
  }
};

let hideList = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.transform = "translate3d(0, 4rem, 0)";
    arr[i].style.opacity = "0";
  }
};

// driving change

let hideFeature = (feature) => {
  let transformValue = "";
  switch (feature) {
    case flt:
      transformValue = "translate3d(2.5rem,2.5rem,0)";
      break;
    case flb:
      transformValue = "translate3d(2.5rem,-2.5rem,0)";
      break;
    case frt:
      transformValue = "translate3d(-2.5rem,2.5rem,0)";
      break;
    case frb:
      transformValue = "translate3d(-2.5rem,-2.5rem,0)";
      break;
  }
  for (i = 0; i < feature.children.length; i++) {
    feature.children[i].style.transform = transformValue;
    feature.children[i].style.opacity = "0";
  }
};

let showFeature = (feature) => {
  for (let i = 0; i < feature.children.length; i++) {
    feature.children[i].style.transform = "translate3d(0,0,0)";
    feature.children[i].style.opacity = "1";
  }
};

let hideAllFeatures = () => {
  featureArray.forEach((el) => {
    hideFeature(el);
  });
};

let showAllFeatures = () => {
  featureArray.forEach((el) => {
    showFeature(el);
  });
};

let lastHMScroll = 0;

let mediaAnimate = () => {};

// let wheelHandle = (e) => {
//   console.log(e.deltaX, e.deltaY);
// };
// mediaList.addEventListener("wheel", wheelHandle);

// let attachTransitionToChildren = (el) => {
//   for (let i = 0; i < el.children.length; i++) {
//     el.children[i].style.transition = "all 0.8s ease-out";
//   }
// };

let animate = () => {
  console.log("animate called", window.pageYOffset);
  // smart prod 1
  if (window.pageYOffset > step1 && window.pageYOffset < step2) {
    showList(li1000);
  } else {
    hideList(li1000);
  }

  // smart product 2
  if (window.pageYOffset > step3 && window.pageYOffset < step4) {
    showList(li2000);
  } else {
    hideList(li2000);
  }

  if (window.pageYOffset > step5 && window.pageYOffset < step6) {
    showAllFeatures();
  } else {
    hideAllFeatures();
  }
};

window.onscroll = () => {
  animate();
};

window.onresize = () => {
  // console.log("resize checked");
  reviseSteps();
};
