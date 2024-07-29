// Declaration & Initialization of Variables
const images = document.querySelectorAll(".images .img-box img");
const popUpImgContainer = document.querySelector("#popUpImgContainer");
const popUpImg = document.querySelector("#popUpImg");
const buttons = document.querySelectorAll(".buttons button");
let loopValue = true;


// Pop Up Image on Clicked
for (let img of images) {
  img.addEventListener("click", (e) => {
    let currentImg = e.currentTarget;
    popUpImgContainer.classList.add("active");
    popUpImg.src = currentImg.src;
  });
}

// Finding Current Image Index
function findCurrentImgIndex(){
  let currentImgIndex = 0;
 
  for (let i = 0; i < images.length; i++) {
    if (images[i].src === popUpImg.src) {
      currentImgIndex = i;

    }
  }
  return currentImgIndex;
}
  

// find Next Img Index
function findNextImgIndex(){
    let lastIndex = images.length - 1;
    let nextImgIndex = 0;
    let currentImgIndex = findCurrentImgIndex();

  if (currentImgIndex < lastIndex) {
      nextImgIndex = currentImgIndex + 1;
  }else{
    if (loopValue) {
      nextImgIndex = 0;
    }
  }
  return nextImgIndex;
}

// find Previous Img Index
function findPreImgIndex(){
    let firstIndex = 0;
    let preImgIndex = 0;
    let currentImgIndex = findCurrentImgIndex();

  if (currentImgIndex > firstIndex) {
      preImgIndex = currentImgIndex - 1;
  }else{
    if (loopValue) {
      preImgIndex = images.length - 1;
    }
  }
  return preImgIndex;
}


// Button Animation
buttons.forEach(button=>{
  button.addEventListener("mousedown",(e)=>{
    button.style.backgroundColor = "black";
  });
  button.addEventListener("mouseup", (e) => {
    button.style.backgroundColor = "crimson";
  });
})


// Left Button
buttons[0].addEventListener("click", () => {
  let preImgIndex = findPreImgIndex();
  popUpImg.src = images[preImgIndex].src;
});
// Right Button
buttons[1].addEventListener("click", () => {
  let nextImgIndex = findNextImgIndex();
  popUpImg.src = images[nextImgIndex].src;
});

// Close Button
buttons[2].addEventListener("click", () => {
  popUpImgContainer.classList.remove("active");
});
