
import * as Time from './time.js';



// defining variables
let videoContainer = document.querySelector('.player')
let video = document.querySelector('video')
let controls = document.querySelector('.controls')

let speedControls = document.querySelector('.speed-controls')
let currVolume //which will be used to return the volume to the previous state upon unmuting



// video.removeAttribute('controls');
// controls.style.visibility = 'visible';





// when the video is fully loaded and ready to be played, then we get the time (otherwise 'video.duration' will return NaN)
video.addEventListener('canplay',function(){
    document.querySelector('#current-time').innerText = Time.getTotalTime(Math.round(video.currentTime)) //need to include the 00 for hours if we have hours
    document.querySelector('#video-duration').innerText = Time.getTotalTime(Math.round(video.duration))
})

video.addEventListener('timeupdate',function(){
    document.querySelector('#current-time').innerText = Time.getTotalTime(Math.round(video.currentTime))
    document.querySelector('#progress-bar').value =  video.currentTime * 100 / video.duration
})

document.querySelector('#progress-bar').addEventListener('input',function(){
    console.log(this.value);
    video.currentTime = this.value * video.duration / 100
})





// Playing and pausing the video
document.querySelector('button.play-pause').addEventListener('click',function(){
    console.log(this);
    
    if(this.classList.contains('playing')){
        video.pause()
    } else {
        video.play()
    }
    
    this.classList.toggle('playing')
})


document.querySelector('button.mute').addEventListener('click',function(){
    if(video.classList.contains('muted')){
        video.volume = currVolume
        document.querySelector('#volume-bar').value = currVolume * 100;

    } else {
        currVolume = video.volume

        video.volume = 0;
        document.querySelector('#volume-bar').value = 0;
    }
    video.classList.toggle('muted')
})


//video speed playback listeners
let speeds = [
    {
        identifyer:'050',
        speed:0.5
    },
    {
        identifyer:'075',
        speed:0.75
    },
    {
        identifyer:'100',
        speed:1.0
    },
    {
        identifyer:'150',
        speed:1.5
    },
    {
        identifyer:'200',
        speed:2
    },
]

speeds.forEach(speed=>{
    document.querySelector(`button.speed-${speed.identifyer}`).addEventListener('click',function(){
        video.playbackRate = speed.speed
        speedControls.classList.remove('visible')
    })
})



// Speed toggler
document.querySelector('.speed-toggler').addEventListener('click',function(){
    speedControls.classList.toggle('visible')
})


// fullscreen button
document.querySelector('button.fullscreen').addEventListener('click',function(){
    if(document.fullscreenElement){
        document.exitFullscreen()
        video.classList.remove('fullscreen')
    } else {
        openFullScreen(videoContainer)
        video.classList.add('fullscreen')
    }
})

function openFullScreen(item){
    if (item.requestFullscreen) {
        item.requestFullscreen();
    } else if (item.webkitRequestFullscreen) { /* Safari */
        item.webkitRequestFullscreen();
    } else if (item.msRequestFullscreen) { /* IE11 */
        item.msRequestFullscreen();
    }
}


document.querySelector('#volume-bar').addEventListener('input',function(){
    console.log(this.value);
    changeVolume(video,this.value/100)
})

function changeVolume(video, volume){
    video.volume = volume
}


