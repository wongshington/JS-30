const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  // returns a promise object
  .then(localMediaStream => {

    console.log(localMediaStream);
    video.src = window.URL.createObjectURL(localMediaStream);
    // converts it to a readable type

    video.play();
  });
}

getVideo();
