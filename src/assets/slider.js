// import photos
import Tree1 from '../static/images/tree-1.jpg';
import Tree2 from '../static/images/tree-2.jpg';
import Tree3 from '../static/images/tree-3.jpg';
import Tree4 from '../static/images/tree-4.jpg';
import Tree5 from '../static/images/tree-5.jpg';

// for testing
const picsToUse = [Tree3, Tree4, Tree5, Tree2, Tree1];

// cache dom
const picContainer = document.querySelector('.inside-frame');
const markerContainer = document.querySelector('.markers');
const backButton = document.querySelector('.backwards');
const forwardButton = document.querySelector('.forwards');

// init module
let currentIndex = 0;
let timeoutID;

// public methods
function slidePic(index) {
  picContainer.style.transform = `translateX(-${index}00%`;
}

function renderMarkers(index) {
  [...markerContainer.children].forEach((marker) => {
    if (index === Number(marker.getAttribute('data-index'))) {
      marker.classList.add('active');
    } else {
      marker.classList.remove('active');
    }
  });
}

function renderSlider() {
  renderMarkers(currentIndex);
  slidePic(currentIndex);
}

function moveToPic(e) {
  if (currentIndex !== Number(e.target.getAttribute('data-index'))) {
    currentIndex = Number(e.target.getAttribute('data-index'));
    renderSlider();

    resetTimer();
  }
}

function moveBack() {
  if (currentIndex !== 0) {
    currentIndex -= 1;
    renderSlider();

    resetTimer();
  }
}

function moveForwards() {
  if (currentIndex < picsToUse.length - 1) {
    currentIndex += 1;
    renderSlider();

    resetTimer();
  }
}

// private methods
function getPic(path, index) {
  const newPic = document.createElement('div');
  newPic.classList.add('pic');
  newPic.setAttribute('data-index', index);
  newPic.style.backgroundImage = `url(${path})`;

  return newPic;
}

function getMarker(index) {
  const newMarker = document.createElement('div');
  newMarker.classList.add('marker');
  newMarker.setAttribute('data-index', index);

  if (index === 0) {
    newMarker.classList.add('active');
  }

  newMarker.addEventListener('click', moveToPic);

  return newMarker;
}

function addElements(path, index) {
  picContainer.appendChild(getPic(path, index));
  markerContainer.appendChild(getMarker(index));
}

// timer
function startTimer() {
  timeoutID = setTimeout(moveForwards, 5 * 1000);
}

function resetTimer() {
  clearTimeout(timeoutID);
  startTimer();
}

// add event listeners
backButton.addEventListener('click', moveBack);
forwardButton.addEventListener('click', moveForwards);

// IIFE
const buildSlider = (() => {
  picsToUse.forEach(addElements);
  startTimer();
})();

// export
export default buildSlider;
