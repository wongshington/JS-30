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
  })
  .catch(err=> {
    console.error('Yikes', err);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    // we return it so we can get the id of the interval if we want to clear it later
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0,0,width, height);
    // allows us to select the pixel data

    pixels = redEffect(pixels);
    // makes the color effect on the pixels

    ctx.putImageData(pixels, 0, 0);
  }, 16);

}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  // plays the camera shutter sound

  const data = canvas.toDataURL('image/jpeg');
  // console.log(data);
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "cool-view");
  // link.textContent = "download Image";

  link.innerHTML = `<img src="${data}" alt="that guy" />`;
  strip.insertBefore(link, strip.firsChild);
}

function redEffect(pixels){
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; //red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
    pixels.data[i + 2] = pixels.data[i + 2] * .5; //blue
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
// when the video starts playing it fires a canplay event
