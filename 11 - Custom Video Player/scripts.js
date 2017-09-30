const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll(".player__slider")
const progressBar = player.querySelector('.progress__filled')
const progress = player.querySelector('.progress')
const fullScreenButton = player.querySelector('#fullScreenButton')

function togglePlay(){
  if (video.paused){
    video.play()
  }
  else {
    video.pause()
  }
}
function updateButton(){
  if (this.paused) {
    icon = '►'
  }
  else {
    icon = '❚ ❚'
  }
  toggle.textContent = icon;
}

function skip (){
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
  console.log(this.value)
  video[this.name] = this.value
}

function handleProgress(e) {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  console.log(e)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}
function fullScreen(){

  if (player.style.width === "100%"){
    player.style.width = "65%"
  }
  else {
    player.style.width = "100%"
  }
}
video.addEventListener("click", togglePlay)
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
video.addEventListener("timeupdate", handleProgress)

toggle.addEventListener("click", updateButton)
skipButtons.forEach(button => {
  button.addEventListener("click", skip)
})

ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate)
})

let mousedown = false
progressBar.addEventListener("click", handleProgress)
progress.addEventListener("click", scrub)
progress.addEventListener("mousedown", () => {
  if (mousedown){
    scrub();
  }
})
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false)

fullScreenButton.addEventListener("click", fullScreen)
